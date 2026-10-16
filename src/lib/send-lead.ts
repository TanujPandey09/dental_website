type LeadType = "contact" | "booking";

interface LeadResult {
  ok: boolean;
  error?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: unknown): string {
  return `<tr><td style="padding:6px 12px;font-weight:600;">${escapeHtml(
    label
  )}</td><td style="padding:6px 12px;">${escapeHtml(String(value ?? "—"))}</td></tr>`;
}

/**
 * Sends a lead notification email.
 *
 * Works out of the box in "log mode" (no env vars) by logging to the server.
 * Set RESEND_API_KEY, LEAD_TO_EMAIL and LEAD_FROM_EMAIL to send real emails
 * through Resend (https://resend.com) — no SDK required.
 */
export async function sendLead(
  type: LeadType,
  data: Record<string, unknown>
): Promise<LeadResult> {
  const subject =
    type === "booking" ? "New appointment request" : "New contact message";

  const html = `<h2>${escapeHtml(subject)}</h2><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">${Object.entries(
    data
  )
    .map(([key, value]) => row(key, value))
    .join("")}</table>`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.log(`[lead:${type}]`, JSON.stringify(data));
    console.warn(
      "[lead] RESEND_API_KEY / LEAD_TO_EMAIL not set — lead was logged only. See FORM-INTEGRATION.md."
    );
    return { ok: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject, html }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[lead] Resend error:", res.status, body);
      return { ok: false, error: "Email provider rejected the request." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[lead] send failed:", err);
    return { ok: false, error: "Failed to send. Please try again." };
  }
}
