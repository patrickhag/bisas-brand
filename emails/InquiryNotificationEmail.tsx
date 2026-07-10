import type { CSSProperties } from "react";

export type InquiryNotificationEmailProps = {
  email: string;
  inquiryType: "Consultation Request" | "Contact Message";
  message: string;
  consultationType?: string;
  submittedAt: string;
};

const main = {
  backgroundColor: "#f6f6f6",
  color: "#2b2b2b",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
} satisfies CSSProperties;

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e5e5",
  margin: "32px auto",
  maxWidth: "620px",
  padding: "32px",
} satisfies CSSProperties;

const label = {
  color: "#777777",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.08em",
  margin: "0 0 6px",
  textTransform: "uppercase",
} satisfies CSSProperties;

const value = {
  color: "#2b2b2b",
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "0",
} satisfies CSSProperties;

export function InquiryNotificationEmail({
  consultationType,
  email,
  inquiryType,
  message,
  submittedAt,
}: InquiryNotificationEmailProps) {
  return (
    <html>
      <body style={main}>
        <div
          style={{
            display: "none",
            maxHeight: 0,
            overflow: "hidden",
          }}
        >
          New {inquiryType.toLowerCase()} from {email}
        </div>
        <main style={container}>
          <p
            style={{
              color: "#d0af43",
              fontSize: "14px",
              fontWeight: "700",
              margin: "0 0 10px",
              textTransform: "uppercase",
            }}
          >
            Boraland
          </p>
          <h1
            style={{
              color: "#2b2b2b",
              fontSize: "28px",
              lineHeight: "1.2",
              margin: "0",
            }}
          >
            New {inquiryType}
          </h1>

          <hr style={{ borderColor: "#e5e5e5", margin: "28px 0" }} />

          <section style={{ marginBottom: "22px" }}>
            <p style={label}>From</p>
            <p style={value}>{email}</p>
          </section>

          {consultationType ? (
            <section style={{ marginBottom: "22px" }}>
              <p style={label}>Consultation Type</p>
              <p style={value}>{consultationType}</p>
            </section>
          ) : null}

          <section style={{ marginBottom: "22px" }}>
            <p style={label}>Message</p>
            <p style={{ ...value, whiteSpace: "pre-line" }}>{message}</p>
          </section>

          <section>
            <p style={label}>Submitted</p>
            <p style={value}>{submittedAt}</p>
          </section>
        </main>
      </body>
    </html>
  );
}
