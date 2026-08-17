import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CareersExplorer, CAREERS_PER_PAGE } from "@/components/careers/CareersExplorer";
import { CAREERS } from "@/data/careers";

vi.mock("next/link", () => ({
  default: ({ children, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={props.href}>{children}</a>
  ),
}));

describe("CareersExplorer", () => {
  it("renders only the first page of careers by default", () => {
    render(<CareersExplorer />);
    expect(screen.getAllByRole("link")).toHaveLength(
      Math.min(CAREERS_PER_PAGE, CAREERS.length)
    );
    expect(screen.getByText(/Page 1 of/i)).toBeInTheDocument();
    // The top-ranked career leads the first page
    expect(screen.getByText("Aeronautical Engineer")).toBeInTheDocument();
  });

  it("paginates to later careers via the next button", () => {
    render(<CareersExplorer />);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(screen.getByText(/Page 2 of/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(CAREERS_PER_PAGE);
  });

  it("filters careers by search query", () => {
    render(<CareersExplorer />);
    fireEvent.change(screen.getByLabelText("Search careers"), {
      target: { value: "doctor" },
    });
    expect(screen.getByText("Medical Doctor")).toBeInTheDocument();
    expect(screen.queryByText("Lawyer")).not.toBeInTheDocument();
  });

  it("filters careers by stream tab and resets to page 1", () => {
    render(<CareersExplorer />);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    fireEvent.click(screen.getByRole("button", { name: "Art" }));
    const expected = Math.min(
      CAREERS_PER_PAGE,
      CAREERS.filter((c) => c.stream === "art").length
    );
    expect(screen.getAllByRole("link")).toHaveLength(expected);
    expect(screen.getByText(/Page 1 of/i)).toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", () => {
    render(<CareersExplorer />);
    fireEvent.change(screen.getByLabelText("Search careers"), {
      target: { value: "zzzzz-no-such-career" },
    });
    expect(screen.getByText(/No careers match/)).toBeInTheDocument();
  });
});
