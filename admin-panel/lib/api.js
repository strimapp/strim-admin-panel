const BASE_URL = "https://key.strim.my.id";

export async function validateLicense(key, adminToken) {
  try {
    const res = await fetch(`${BASE_URL}/validate?key=${key}&admin_token=${encodeURIComponent(adminToken)}`);
    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      return { error: true, message: `Server error ${res.status}` };
    }

    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      return { error: true, message: "Format respons tidak dikenali (bukan JSON)." };
    }
  } catch (e) {
    return { error: true, message: "Gagal menghubungi server: " + e.message };
  }
}

export async function resetLicense(key, adminToken) {
  try {
    const res = await fetch(`${BASE_URL}/reset?key=${key}&admin_token=${encodeURIComponent(adminToken)}`);
    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      return { error: true, message: `Server error ${res.status}` };
    }

    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      return { error: true, message: "Format respons tidak dikenali (bukan JSON)." };
    }
  } catch (e) {
    return { error: true, message: "Gagal menghubungi server: " + e.message };
  }
}
