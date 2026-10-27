"use client";

import { useId, useState } from "react";
import { inquiryTypes, office, submitInquiry, type InquiryType } from "@/lib/contact";

type FieldName = "name" | "email" | "phone" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "sent" | "not-connected" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[+()\d\s.-]{7,20}$/;

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  if (!values.name) errors.name = "Please enter your full name.";
  if (!values.email) errors.email = "Please enter your email address.";
  else if (!emailPattern.test(values.email)) errors.email = "Please enter a valid email address, like name@example.com.";
  if (values.phone && !phonePattern.test(values.phone)) errors.phone = "Please enter a valid phone number, or leave it blank.";
  if (!values.message) errors.message = "Please tell us a little about what you are looking for.";
  return errors;
}

const controlClasses =
  "w-full rounded-lg border bg-input px-4 py-3 text-base text-ink placeholder:text-ink-soft/70";

type FieldProps = {
  id: string;
  name: FieldName;
  label: string;
  optional?: boolean;
  error?: string;
  children: (props: { id: string; className: string; "aria-invalid": boolean; "aria-describedby"?: string }) => React.ReactNode;
};

function Field({ id, name, label, optional, error, children }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-ink">
        {label}
        {optional && <span className="text-ink-soft"> (Optional)</span>}
      </label>
      {children({
        id,
        className: `${controlClasses} ${error ? "border-red-700" : "border-brown"}`,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} data-field={name} className="mt-1.5 text-sm text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const id = useId();
  const [inquiry, setInquiry] = useState<InquiryType>(inquiryTypes[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as FieldName[])[0];
    if (firstInvalid) {
      setStatus("idle");
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const result = await submitInquiry({ inquiry, ...values });
      setStatus(result.status);
    } catch {
      setStatus("error");
    }
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <fieldset>
        <legend className="mb-3 text-sm text-ink">Nature of Inquiry</legend>
        <div className="flex flex-wrap gap-3">
          {inquiryTypes.map((type) => {
            const inputId = `${id}-${type.replace(/\W+/g, "-").toLowerCase()}`;
            return (
              <div key={type}>
                {/* Visually hidden radio keeps native keyboard behavior (arrow keys); the label is the pill */}
                <input
                  type="radio"
                  id={inputId}
                  name="inquiry"
                  value={type}
                  checked={inquiry === type}
                  onChange={() => setInquiry(type)}
                  className="peer sr-only"
                />
                <label
                  htmlFor={inputId}
                  className="inline-block cursor-pointer rounded-full border border-brown px-4 py-2 text-sm text-ink transition-colors hover:bg-brown/10 peer-checked:bg-brown peer-checked:text-paper peer-checked:hover:bg-brown peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-taupe-dark"
                >
                  {type}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <Field id={`${id}-name`} name="name" label="Full Name" error={errors.name}>
        {(props) => (
          <input {...props} name="name" type="text" autoComplete="name" required placeholder="Juan Dela Cruz" />
        )}
      </Field>

      <Field id={`${id}-email`} name="email" label="Email Address" error={errors.email}>
        {(props) => (
          <input {...props} name="email" type="email" autoComplete="email" required placeholder="email@example.com" />
        )}
      </Field>

      <Field id={`${id}-phone`} name="phone" label="Phone Number" optional error={errors.phone}>
        {(props) => (
          <input {...props} name="phone" type="tel" autoComplete="tel" placeholder="+63 000-0000-000" />
        )}
      </Field>

      <Field id={`${id}-message`} name="message" label="Message or Property Preference" error={errors.message}>
        {(props) => (
          <textarea
            {...props}
            name="message"
            rows={5}
            required
            placeholder="Share details about desired communities, timeline, acreage specs, or request a complimentary valuation..."
          />
        )}
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-w-40 items-center justify-center rounded-lg bg-brown px-8 py-3 text-base font-medium text-paper transition-colors duration-300 hover:bg-brown-dark active:bg-brown-dark disabled:cursor-wait disabled:bg-taupe-dark"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>

      <div aria-live="polite">
        {status === "not-connected" && (
          <p role="status" className="rounded-lg border border-brown bg-input p-4 text-sm text-ink">
            <strong className="font-medium">Demo only: your message was not sent.</strong> This form is not connected
            to an email service yet. To reach the team now, please call{" "}
            <a href={office.phoneHref} className="underline underline-offset-2">
              {office.phoneDisplay}
            </a>
            .
          </p>
        )}
        {status === "sent" && (
          <p role="status" className="rounded-lg border border-brown bg-input p-4 text-sm text-ink">
            Thank you. Your message was sent, and the team will be in touch soon.
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="rounded-lg border border-red-700 bg-input p-4 text-sm text-red-800">
            Something went wrong and your message was not sent. Please try again, or call{" "}
            <a href={office.phoneHref} className="underline underline-offset-2">
              {office.phoneDisplay}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
