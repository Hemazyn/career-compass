import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CareersExplorer } from "@/components/careers/CareersExplorer";
import { CAREERS } from "@/data/careers";

vi.mock("next/link", () => ({
  default: ({ children, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={props.href}>{children}</a>
  ),
}));

describe("CareersExplorer", () => {
  it("renders a link for every career by default", () => {
    render(<CareersExplorer />);
    expect(screen.getAllByRole("link")).toHaveLength(CAREERS.length);
  });

  it("filters careers by search query", () => {
    render(<CareersExplorer />);
    fireEvent.change(screen.getByLabelText("Search careers"), {
      target: { value: "doctor" },
    });
    expect(screen.getByText("Medical Doctor")).toBeInTheDocument();
    expect(screen.queryByText("Lawyer")).not.toBeInTheDocument();
  });

  it("filters careers by stream tab", () => {
    render(<CareersExplorer />);
    fireEvent.click(screen.getByRole("button", { name: "Art" }));
    const expected = CAREERS.filter((c) => c.stream === "art").length;
    expect(screen.getAllByRole("link")).toHaveLength(expected);
  });

  it("shows an empty state when nothing matches", () => {
    render(<CareersExplorer />);
    fireEvent.change(screen.getByLabelText("Search careers"), {
      target: { value: "zzzzz-no-such-career" },
    });
    expect(screen.getByText(/No careers match/)).toBeInTheDocument();
  });
});
