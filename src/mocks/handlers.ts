import { rest } from "msw";

const results = [
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
  {
    category: "Geography",
    type: "boolean",
    difficulty: "medium",
    question: "Japan has left-hand side traffic.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question:
      "Which programming language was developed by Sun Microsystems in 1995?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "Solaris OS", "C++"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "hard",
    question:
      "In Disney&#039;s &quot;Toontown Online&quot;, which of these species wasn&#039;t available as a Toon?",
    correct_answer: "Cow",
    incorrect_answers: ["Monkey", "Bear", "Pig"],
  },
  {
    category: "History",
    type: "multiple",
    difficulty: "medium",
    question:
      "Which of these founding fathers of the United States of America later became president?",
    correct_answer: "James Monroe",
    incorrect_answers: ["Alexander Hamilton", "Samuel Adams", "Roger Sherman"],
  },
  {
    category: "History",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which famous military commander marched an army, which included war elephants, over the Alps during the Second Punic War?",
    correct_answer: "Hannibal",
    incorrect_answers: ["Garmanicus", "Alexander the Great", "Tiberius"],
  },
];

export const handlers = [
  rest.get("https://opentdb.com/api.php", (req, res, ctx) => {
    const amount = req.url.searchParams.get("amount");

    return res(
      ctx.status(200),
      ctx.json({
        response_code: 0,
        results: results.slice(
          0,
          typeof amount === "string" ? parseInt(amount, 10) : 5
        ),
      })
    );
  }),
];
