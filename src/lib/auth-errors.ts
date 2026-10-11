type AuthError = { code?: string; message?: string };

export function banglaAuthError(error: AuthError, fallback: string) {
  const code = error.code ?? "";
  if (code.startsWith("USER_ALREADY_EXISTS"))
    return "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে";
  if (code === "INVALID_EMAIL_OR_PASSWORD")
    return "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে";
  if (code === "PASSWORD_TOO_SHORT")
    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
  if (code === "INVALID_EMAIL") return "সঠিক ইমেইল দিন";
  return fallback;
}