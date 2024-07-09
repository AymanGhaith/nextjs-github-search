import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders the error message", () => {
    const message = "Test error message";
    render(<ErrorMessage message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
