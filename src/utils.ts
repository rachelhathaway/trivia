import type { Question } from "./types";

type JsonResponse = {
  response_code: number;
  results: Question[];
};

export const fetchQuestions = async (
  numQuestions: 2 | 5
): Promise<Question[]> => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${numQuestions}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = (await response.json()) as JsonResponse;

  return json.results;
};
