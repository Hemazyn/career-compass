import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SubjectChecker } from "@/components/check/SubjectChecker";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("SubjectChecker", () => {
  it("includes Civic Education in the O'Level credit options", () => {
    render(<SubjectChecker />);
    const group = screen.getByRole("group", { name: "O'Level credit subjects" });
    expect(within(group).getByRole("button", { name: "Civic Education" })).toBeInTheDocument();
  });

  it("lets the user add a subject that is not in the list", () => {
    render(<SubjectChecker />);
    const input = screen.getByLabelText("Add a subject not listed");
    fireEvent.change(input, { target: { value: "computer studies" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    // The chip appears, is auto-selected, and counts toward the credit total
    const chip = screen.getByRole("button", { name: "Computer Studies" });
    expect(chip).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("1 selected")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("treats an added subject as a real credit for the course check", () => {
    render(<SubjectChecker />);
    const input = screen.getByLabelText("Add a subject not listed");
    fireEvent.change(input, { target: { value: "computer studies" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText(/You qualify for \d+ of \d+ courses/i)).toBeInTheDocument();
  });

  it("selects the listed chip when the user types a known subject name", () => {
    render(<SubjectChecker />);
    const input = screen.getByLabelText("Add a subject not listed");
    fireEvent.change(input, { target: { value: "civic education" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    const group = screen.getByRole("group", { name: "O'Level credit subjects" });
    expect(within(group).getByRole("button", { name: "Civic Education" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByText("1 selected")).toBeInTheDocument();
  });

  it("removes a custom subject with its remove button", () => {
    render(<SubjectChecker />);
    const input = screen.getByLabelText("Add a subject not listed");
    fireEvent.change(input, { target: { value: "computer studies" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    fireEvent.click(screen.getByRole("button", { name: "Remove Computer Studies" }));
    expect(screen.queryByRole("button", { name: "Computer Studies" })).not.toBeInTheDocument();
    expect(screen.getByText("0 selected")).toBeInTheDocument();
  });
});
