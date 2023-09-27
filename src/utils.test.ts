import { describe, expect, it } from "vitest";
import { fetchQuestions } from "./utils";

const firstTwoQuestions = [
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "medium",
    question:
      "All program codes have to be compiled into an executable file in order to be run. This file can then be executed on any machine.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question:
      "The rights to the &quot;Rayman&quot; series are owned by which company?",
    correct_answer: "Ubisoft",
    incorrect_answers: ["Nintendo", "EA", "Sony"],
  },
];

describe("fetchQuestions", () => {
  describe("error", () => {
    it("should return the error text", async () => {
      await expect(() => fetchQuestions(2)).rejects.toThrowError(
        "something went wrong"
      );
    });
  });

  describe("success", () => {
    it("should return 2 questions", async () => {
      const questions = await fetchQuestions(2);

      expect(questions).toEqual(firstTwoQuestions);
    });

    it("should return 5 questions", async () => {
      const questions = await fetchQuestions(5);

      expect(questions).toEqual([
        ...firstTwoQuestions,
        {
          category: "General Knowledge",
          type: "multiple",
          difficulty: "hard",
          question:
            "Before the 19th Century, the &quot;Living Room&quot; was originally called the...",
          correct_answer: "Parlor",
          incorrect_answers: ["Open Room", "Sitting Room", "Loft"],
        },
        {
          category: "General Knowledge",
          type: "boolean",
          difficulty: "medium",
          question:
            "Sitting for more than three hours a day can cut two years off a person&#039;s life expectancy.",
          correct_answer: "True",
          incorrect_answers: ["False"],
        },
        {
          category: "Entertainment: Television",
          type: "multiple",
          difficulty: "easy",
          question: "In the Star Trek universe, what color is Vulcan blood?",
          correct_answer: "Green",
          incorrect_answers: ["Blue", "Red", "Purple"],
        },
      ]);
    });
  });
});
