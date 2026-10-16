# Form Integration Guide

The two forms in this template are **fully wired end-to-end**:

- `src/components/contact/ContactForm.tsx` → `POST /api/contact`
- `src/components/appointment/BookingForm.tsx` → `POST /api/booking`

Both routes share `src/lib/send-lead.ts`.

## How it works

1. The form validates with Zod + react-hook-form.
2. On submit it POSTs JSON to the matching API route.
3. The route validates the payload and calls `sendLead()`.
4. `sendLead()` either:
   - **sends an email via Resend** (if configured), or
   - **logs the submission** to the server console (fallback) and returns success.

The UI then shows a success state, or an inline error message. The submit
button is disabled and shows "Sending…" while in flight.

## Option A — Resend (recommended, zero extra dependencies)

1. Create an account at https://resend.com and verify your domain.
2. Add the env vars (see `.env.example`):

   ```
   RESEND_API_KEY=re_xxxxxxxx
   LEAD_TO_EMAIL=you@yourclinic.com
   LEAD_FROM_EMAIL=notifications@yourdomain.com
   ```

3. Restart the dev server. Submissions now arrive by email.

> `LEAD_FROM_EMAIL` must be on a domain you verified in Resend. For quick
> testing you can use `onboarding@resend.dev` (the default fallback).

## Option B — Any other provider

`sendLead()` lives in `src/lib/send-lead.ts` and is intentionally small.
Swap the `fetch("https://api.resend.com/emails")` block for:

- **Formspree / Web3Forms**: POST the payload to their endpoint.
- **Postmark / SendGrid / Mailgun**: same pattern, different URL + headers.
- **Slack / Discord webhook**: POST `{ content: "..." }` / `{ text: "..." }`.
- **Your own backend / DB**: replace the fetch with your SDK call.

## Option C — Google Sheets / database

Replace the body of `sendLead()` with a call to your database client
(Prisma, Drizzle, Supabase, etc.). The route contract stays the same.

## Payload reference

`POST /api/contact`

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phone": "5551234567",
  "inquiryType": "general",
  "message": "I'd like to know more about veneers."
}
```

`POST /api/booking`

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "phone": "5551234567",
  "service": "cosmetic",
  "date": "2026-05-01",
  "timePref": "morning",
  "notes": "First visit."
}
```

Both return `{ "ok": true }` on success, or `{ "ok": false, "error": "..." }`
with a non-2xx status on failure.

## Security notes

- Server-side validation runs in the route handlers; never trust the client alone.
- User input is HTML-escaped before being placed in the email body.
- Consider adding rate limiting (e.g. Upstash Ratelimit) before going live.
- Add a CAPTCHA (e.g. Cloudflare Turnstile) if you see spam.
