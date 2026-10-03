import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import EventCard from "@/ui/event-card";

function renderCard(props) {
  return render(
    <NextIntlClientProvider locale="fr" messages={{}}>
      <EventCard discoverLabel="Découvrir" ticketsLabel="Billets" {...props} />
    </NextIntlClientProvider>
  );
}

const base = {
  slug: "frontieres-poreuses",
  title: "Frontières Poreuses",
  date: "novembre 2026",
  venue: "Montréal",
  poster: "/p.png",
};

describe("EventCard", () => {
  it("renders title, date, venue and a Découvrir link", () => {
    renderCard({ ...base, status: "upcoming", ticketsUrl: "https://x" });
    expect(screen.getByText("Frontières Poreuses")).toBeInTheDocument();
    expect(screen.getByText("novembre 2026")).toBeInTheDocument();
    expect(screen.getByText("Découvrir")).toBeInTheDocument();
  });

  it("shows Billets for upcoming events with a ticketsUrl", () => {
    renderCard({ ...base, status: "upcoming", ticketsUrl: "https://x" });
    expect(screen.getByText("Billets")).toBeInTheDocument();
  });

  it("hides Billets for past events", () => {
    renderCard({ ...base, status: "past", ticketsUrl: "https://x" });
    expect(screen.queryByText("Billets")).toBeNull();
  });

  it("links the poster and the panel to the event page", () => {
    renderCard({ ...base, status: "past" });
    const toEvent = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.includes("/events/frontieres-poreuses"));
    // poster link (labelled by title) + the stretched Discover link
    expect(toEvent.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("link", { name: "Frontières Poreuses" })).toBeInTheDocument();
  });
});
