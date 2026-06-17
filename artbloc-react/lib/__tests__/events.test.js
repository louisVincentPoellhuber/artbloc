import { describe, it, expect } from "vitest";
import { eventStatus } from "@/lib/events";

describe("eventStatus", () => {
  const now = new Date("2026-06-16T12:00:00Z");

  it("is upcoming when the date is in the future", () => {
    expect(eventStatus({ date: "2026-11-01" }, now)).toBe("upcoming");
  });

  it("is past when the date is in the past", () => {
    expect(eventStatus({ date: "2025-11-15" }, now)).toBe("past");
  });

  it("treats an event dated today as upcoming", () => {
    expect(eventStatus({ date: "2026-06-16" }, now)).toBe("upcoming");
  });
});
