import { describe, expect, it } from "vitest";
import { programmes } from "./content";
import { applyFilters, filterHref, parseFilters } from "./filters";

const slugs = ["data-ai", "software-development"];

describe("parseFilters", () => {
  it("accepts known values", () => {
    expect(parseFilters({ faculty: "data-ai", level: "5" }, slugs)).toEqual({
      faculty: "data-ai",
      level: 5,
      mode: undefined,
    });
  });
  it("drops unknown faculty and invalid level", () => {
    expect(parseFilters({ faculty: "nope", level: "9" }, slugs)).toEqual({
      faculty: undefined,
      level: undefined,
      mode: undefined,
    });
  });
});

describe("applyFilters", () => {
  it("returns everything with no filters", () => {
    expect(applyFilters(programmes, {})).toHaveLength(24);
  });
  it("filters by faculty and level together", () => {
    const r = applyFilters(programmes, { faculty: "software-development", level: 4 });
    expect(r.map((p) => p.name)).toEqual(["Software Development", "Web Development"]);
  });
});

describe("filterHref", () => {
  it("builds and clears query strings", () => {
    expect(filterHref({ faculty: "data-ai" }, { level: 5 })).toBe(
      "/programmes?faculty=data-ai&level=5",
    );
    expect(filterHref({ faculty: "data-ai" }, { faculty: undefined })).toBe("/programmes");
  });
});
