const API_BASE = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"
).replace(/\/$/, "");
async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const body = await response.text();
  if (!response.ok) {
    let message = body || `Request failed (${response.status})`;
    try {
      message = JSON.parse(body).message || JSON.parse(body).error || message;
    } catch {}
    throw new Error(message);
  }
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}
export const api = {
  signup: (payload) =>
    request("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  login: (payload) =>
    request("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  createGuest: () =>
    request("/api/v1/auth/guest", { method: "POST", body: JSON.stringify({}) }),
  initJob: (payload) =>
    request("/api/v1/user/jobs/init", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  confirmJob: (payload) =>
    request("/api/v1/user/jobs/confirm", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  uploadSignature: (publicId) =>
    request(
      `/api/v1/user/jobs/upload-signature?publicId=${encodeURIComponent(publicId)}`,
    ),
  downloadUrl: (processId) =>
    request(`/api/v1/user/jobs/download-url/${encodeURIComponent(processId)}`),
  trackGuestOrder: (payload) =>
    request("/api/v1/guest/orders/track-receipt", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
export { API_BASE };
