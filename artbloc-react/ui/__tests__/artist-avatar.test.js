import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import ArtistAvatar from "@/ui/artist-avatar";

function renderAvatar(props) {
  return render(
    <NextIntlClientProvider locale="fr" messages={{}}>
      <ArtistAvatar {...props} />
    </NextIntlClientProvider>
  );
}

describe("ArtistAvatar", () => {
  it("renders the name and avatar", () => {
    renderAvatar({ slug: "lvp", name: "Louis-Vincent", avatar: "/a.png" });
    expect(screen.getByText("Louis-Vincent")).toBeInTheDocument();
    expect(screen.getByAltText("Louis-Vincent")).toBeInTheDocument();
  });

  it("links to the artist spotlight", () => {
    const { container } = renderAvatar({ slug: "lvp", name: "Louis-Vincent", avatar: "/a.png" });
    const a = container.querySelector("a");
    expect(a.getAttribute("href")).toContain("/artists/lvp");
  });
});
