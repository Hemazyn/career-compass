import { describe, it, expect, beforeEach } from "vitest";
import { useSavedStore } from "@/store/useSavedStore";

describe("useSavedStore", () => {
  beforeEach(() => {
    useSavedStore.getState().clearCompare();
    for (const slug of [...useSavedStore.getState().saved]) {
      useSavedStore.getState().toggleSaved(slug);
    }
  });

  it("toggles careers in and out of saved", () => {
    const store = useSavedStore.getState();
    store.toggleSaved("doctor");
    expect(useSavedStore.getState().saved).toContain("doctor");
    store.toggleSaved("doctor");
    expect(useSavedStore.getState().saved).not.toContain("doctor");
  });

  it("adds careers to the compare list and removes them on a second toggle", () => {
    const store = useSavedStore.getState();
    store.toggleCompare("doctor");
    store.toggleCompare("pharmacist");
    expect(useSavedStore.getState().compare).toEqual(["doctor", "pharmacist"]);
    store.toggleCompare("doctor");
    expect(useSavedStore.getState().compare).toEqual(["pharmacist"]);
  });

  it("caps the compare list at four careers", () => {
    const store = useSavedStore.getState();
    for (const slug of ["a", "b", "c", "d", "e"]) {
      store.toggleCompare(slug);
    }
    expect(useSavedStore.getState().compare).toHaveLength(4);
    expect(useSavedStore.getState().compare).not.toContain("e");
  });

  it("clears the compare list", () => {
    const store = useSavedStore.getState();
    store.toggleCompare("doctor");
    store.clearCompare();
    expect(useSavedStore.getState().compare).toEqual([]);
  });
});
