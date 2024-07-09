import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "./SearchForm";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));

describe("SearchForm", () => {
  it("renders the form elements", () => {
    render(<SearchForm />);
    expect(screen.getByLabelText("Users")).toBeInTheDocument();
    expect(screen.getByLabelText("Repositories")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search GitHub")).toBeInTheDocument();
  });

  it("allows typing in the search input", () => {
    render(<SearchForm />);
    const input = screen.getByPlaceholderText("Search GitHub");
    fireEvent.change(input, { target: { value: "test query" } });
    expect(input).toHaveValue("test query");
  });
});
