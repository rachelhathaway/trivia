import type { Question } from "./types";

type JsonResponse = {
  response_code: number;
  results: Question[];
};

export const fetchQuestions = async (): Promise<Question[]> => {
  const response = await fetch("https://opentdb.com/api.php?amount=10");

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = (await response.json()) as JsonResponse;

  return json.results;
};
