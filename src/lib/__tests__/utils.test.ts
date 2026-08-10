import { describe, it, expect } from "vitest";
import { cn, formatNaira } from "@/lib/utils";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("filters falsy values", () => {
    expect(cn("a", false, undefined, null, 0)).toBe("a");
  });

  it("merges conflicting tailwind classes (last wins)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-red-500", "text-blue-600")).toBe("text-blue-600");
  });
});

describe("formatNaira", () => {
  it("formats whole numbers in NGN", () => {
    expect(formatNaira(250000)).toBe("₦250,000");
  });

  it("formats small amounts", () => {
    expect(formatNaira(0)).toBe("₦0");
  });

  it("rounds to no decimals", () => {
    expect(formatNaira(1234.5)).not.toContain(".");
  });
});
