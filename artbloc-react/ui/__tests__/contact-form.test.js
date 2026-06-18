import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import ContactForm from "@/ui/contact-form";

const messages = {
  contact: {
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    message: "Message",
    submit: "Envoyer",
    submitting: "Envoi…",
    success: "Merci, votre message a été envoyé.",
    error: "Une erreur est survenue.",
    notConfigured: "Le formulaire n'est pas encore configuré.",
  },
};

function renderForm() {
  return render(
    <NextIntlClientProvider locale="fr" messages={messages}>
      <ContactForm />
    </NextIntlClientProvider>
  );
}

describe("ContactForm", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_ENDPOINT", "https://example.test/submit");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("renders the fields and the submit button", () => {
    renderForm();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("Envoyer")).toBeInTheDocument();
  });

  it("posts to the endpoint and shows success", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true });
    renderForm();
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "a@b.co" } });
    fireEvent.submit(screen.getByTestId("contact-form"));
    await waitFor(() => expect(screen.getByText("Merci, votre message a été envoyé.")).toBeInTheDocument());
    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.test/submit",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("shows the error state when the response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    renderForm();
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "a@b.co" } });
    fireEvent.submit(screen.getByTestId("contact-form"));
    await waitFor(() => expect(screen.getByText("Une erreur est survenue.")).toBeInTheDocument());
  });

  it("shows a notice when the endpoint is not configured", () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_ENDPOINT", "");
    renderForm();
    expect(screen.getByText("Le formulaire n'est pas encore configuré.")).toBeInTheDocument();
  });
});
