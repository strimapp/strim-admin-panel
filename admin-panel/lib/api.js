const BASE_URL = "https://key.strim.my.id";

export async function validateLicense(key, adminToken) {
  try {
    const res = await fetch(`${BASE_URL}/validate?key=${key}&admin_token=${encodeURIComponent(adminToken)}`);
    return await res.json();
  } catch (e) {
    return { error: true, message: "Gagal menghubungi server" };
  }
}

export async function resetLicense(key, adminToken) {
  try {
    const res = await fetch(`${BASE_URL}/reset?key=${key}&admin_token=${encodeURIComponent(adminToken)}`);
    return await res.json();
  } catch (e) {
    return { error: true, message: "Gagal menghubungi server" };
  }
}
