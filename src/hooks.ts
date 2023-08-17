import React from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchQuestions } from "./utils";

export const useQuestions = (currentQuestionIndex: number) => {
  const {
    data,
    fetchNextPage: fetchNextQuestions,
    isLoading: isLoadingQuestions,
  } = useInfiniteQuery({
    queryKey: ["questions"],
    queryFn: ({ pageParam }) => {
      const numQuestions = pageParam ? 5 : 1;

      return fetchQuestions(numQuestions);
    },
    getNextPageParam: () => true,
  });

  const questions =
    data?.pages.reduce(
      (allQuestions, page) => [...allQuestions, ...page],
      []
    ) ?? [];

  React.useEffect(() => {
    if (currentQuestionIndex + 1 === questions.length) {
      void fetchNextQuestions();
    }
  }, [currentQuestionIndex, fetchNextQuestions, questions.length]);

  return {
    isLoadingQuestions,
    questions,
  };
};
