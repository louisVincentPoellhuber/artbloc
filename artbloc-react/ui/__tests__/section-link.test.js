import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import SectionLink from "@/ui/section-link";

describe("SectionLink", () => {
  it("renders the label and links to the href", () => {
    const { container } = render(
      <NextIntlClientProvider locale="fr" messages={{}}>
        <SectionLink href="/events" label="Voir tous nos événements" />
      </NextIntlClientProvider>
    );
    expect(screen.getByText(/Voir tous nos événements/)).toBeInTheDocument();
    expect(container.querySelector("a").getAttribute("href")).toContain("/events");
  });
});
