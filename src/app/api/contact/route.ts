import { sendLead } from "@/lib/send-lead";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limit = rateLimit(`contact:${getClientIp(request)}`, 5, 60_000);
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

  const fullName = String(data.fullName ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (fullName.length < 2 || !email.includes("@") || message.length < 10) {
    return Response.json(
      { ok: false, error: "Please check the required fields." },
      { status: 422 }
    );
  }

  const result = await sendLead("contact", {
    fullName,
    email,
    phone: data.phone,
    inquiryType: data.inquiryType,
    message,
  });

  return Response.json(result, { status: result.ok ? 200 : 500 });
}
