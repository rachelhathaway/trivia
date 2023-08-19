import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchQuestions } from "./utils";

export const useQuestions = () => {
  const {
    data,
    fetchNextPage: fetchNextQuestions,
    isLoading: isLoadingQuestions,
  } = useInfiniteQuery({
    queryKey: ["questions"],
    queryFn: ({ pageParam }) => {
      const numQuestions = pageParam ? 5 : 2;

      return fetchQuestions(numQuestions);
    },
    getNextPageParam: () => true,
  });

  const questions =
    data?.pages.reduce(
      (allQuestions, page) => [...allQuestions, ...page],
      []
    ) ?? [];

  return {
    fetchNextQuestions,
    isLoadingQuestions,
    questions,
  };
};
