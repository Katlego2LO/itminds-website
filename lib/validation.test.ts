import { describe, expect, it } from "vitest";
import { credentialsSchema, safeNext } from "./validation";

describe("safeNext", () => {
  it("accepts internal paths", () =>
    expect(safeNext("/dashboard/courses")).toBe("/dashboard/courses"));
  it("rejects external and protocol-relative URLs", () => {
    expect(safeNext("https://evil.example")).toBe("/dashboard");
    expect(safeNext("//evil.example")).toBe("/dashboard");
  });
});

describe("credentialsSchema", () => {
  it("normalises email", () => {
    const r = credentialsSchema.parse({ email: "  A@B.CO ", password: "longenough" });
    expect(r.email).toBe("a@b.co");
  });
  it("rejects short passwords", () => {
    expect(credentialsSchema.safeParse({ email: "a@b.co", password: "short" }).success).toBe(false);
  });
});
