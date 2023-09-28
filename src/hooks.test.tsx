import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useQuestions } from "./hooks";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const wrapper = ({ children }: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useQuestions", () => {
  it("should return an object containing 'fetchNextQuestions', 'isLoadingQuestions', and 'questions'", () => {
    const { result } = renderHook(useQuestions, { wrapper });

    expect(Object.keys(result.current)).toEqual([
      "fetchNextQuestions",
      "isLoadingQuestions",
      "questions",
    ]);
  });

  it("should fetch two questions by default", async () => {
    const { result } = renderHook(useQuestions, { wrapper });

    await waitFor(() => expect(result.current.isLoadingQuestions).toBe(false));

    expect(result.current.questions).toHaveLength(2);
  });

  it("should fetch five questions with each subsequent request", async () => {
    const { result } = renderHook(useQuestions, { wrapper });

    await waitFor(() => expect(result.current.isLoadingQuestions).toBe(false));

    await result.current.fetchNextQuestions();

    await waitFor(() => expect(result.current.isLoadingQuestions).toBe(false));

    expect(result.current.questions).toHaveLength(7);

    await result.current.fetchNextQuestions();

    await waitFor(() => expect(result.current.isLoadingQuestions).toBe(false));

    expect(result.current.questions).toHaveLength(12);
  });
});
