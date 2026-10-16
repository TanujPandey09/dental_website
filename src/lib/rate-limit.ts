/**
 * Minimal in-memory rate limiter (no dependencies).
 *
 * Suitable for a single Node/server instance. On serverless platforms each
 * instance has its own memory, so it is best-effort there — for hard guarantees
 * use a shared store (e.g. Upstash Redis) behind the same interface.
 */

const hits = new Map<string, number[]>();

export interface RateLimitResult {
  ok: boolean;
  retryAfter?: number;
}

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (timestamps.length >= limit) {
    const retryAfter = Math.ceil((timestamps[0] + windowMs - now) / 1000);
    hits.set(key, timestamps);
    return { ok: false, retryAfter };
  }

  timestamps.push(now);
  hits.set(key, timestamps);

  // Opportunistic cleanup so the map cannot grow forever.
  if (hits.size > 1000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }

  return { ok: true };
}

/** Best-effort client IP from common proxy headers. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}
