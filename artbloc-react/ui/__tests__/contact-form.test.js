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

function fillRequired() {
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "a@b.co" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Bonjour" } });
}

describe("ContactForm", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_KEY", "test-access-key");
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

  it("posts to Web3Forms with the access key and shows success", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    renderForm();
    fillRequired();
    fireEvent.submit(screen.getByTestId("contact-form"));
    await waitFor(() =>
      expect(screen.getByText("Merci, votre message a été envoyé.")).toBeInTheDocument()
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.web3forms.com/submit",
      expect.objectContaining({ method: "POST" })
    );
    const body = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(body.access_key).toBe("test-access-key");
    expect(body.email).toBe("a@b.co");
  });

  it("shows the error state when the service reports failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: false }) });
    renderForm();
    fillRequired();
    fireEvent.submit(screen.getByTestId("contact-form"));
    await waitFor(() => expect(screen.getByText("Une erreur est survenue.")).toBeInTheDocument());
  });

  it("shows the error state when the request throws", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("network"));
    renderForm();
    fillRequired();
    fireEvent.submit(screen.getByTestId("contact-form"));
    await waitFor(() => expect(screen.getByText("Une erreur est survenue.")).toBeInTheDocument());
  });

  it("silently drops a submission when the honeypot is filled (no network call)", async () => {
    global.fetch = vi.fn();
    renderForm();
    fillRequired();
    fireEvent.click(screen.getByRole("checkbox", { hidden: true }));
    fireEvent.submit(screen.getByTestId("contact-form"));
    await waitFor(() =>
      expect(screen.getByText("Merci, votre message a été envoyé.")).toBeInTheDocument()
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("shows a notice when the access key is not configured", () => {
    vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_KEY", "");
    renderForm();
    expect(screen.getByText("Le formulaire n'est pas encore configuré.")).toBeInTheDocument();
  });
});
