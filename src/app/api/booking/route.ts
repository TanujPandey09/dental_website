import { sendLead } from "@/lib/send-lead";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limit = rateLimit(`booking:${getClientIp(request)}`, 5, 60_000);
  if (!limit.ok) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 60) } }
    );
  }

  let data: Record<string, unknown>;

  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const firstName = String(data.firstName ?? "").trim();
  const lastName = String(data.lastName ?? "").trim();
  const email = String(data.email ?? "").trim();
  const service = String(data.service ?? "").trim();

  if (firstName.length < 2 || lastName.length < 2 || !email.includes("@") || !service) {
    return Response.json(
      { ok: false, error: "Please check the required fields." },
      { status: 422 }
    );
  }

  const result = await sendLead("booking", {
    firstName,
    lastName,
    email,
    phone: data.phone,
    service,
    date: data.date,
    timePref: data.timePref,
    notes: data.notes,
  });

  return Response.json(result, { status: result.ok ? 200 : 500 });
}
