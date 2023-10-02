import { render, screen } from "@testing-library/react";
import { RatioHeader } from "./RatioHeader";

describe("RatioHeader", () => {
  it("should render the singular text with one answered question", () => {
    render(<RatioHeader numCorrectAnswers={1} numTotalAnswers={1} />);

    expect(
      screen.getByText("1 / 1 question answered correctly")
    ).toBeInTheDocument();
  });

  it("should render the plural text with more than one answered question", () => {
    render(<RatioHeader numCorrectAnswers={2} numTotalAnswers={3} />);

    expect(
      screen.getByText("2 / 3 questions answered correctly")
    ).toBeInTheDocument();
  });
});
