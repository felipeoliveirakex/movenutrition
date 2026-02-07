export type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function nowIso() {
  return new Date().toISOString();
}

export function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function startOfWeekKey(date = new Date()) {
  // Week key: YYYY-Www (ISO-ish, but simplified)
  const temp = new Date(date);
  temp.setHours(0, 0, 0, 0);
  // Monday as start
  const day = (temp.getDay() + 6) % 7;
  temp.setDate(temp.getDate() - day);

  const year = temp.getFullYear();
  const firstJan = new Date(year, 0, 1);
  const daysSince = Math.floor((temp.getTime() - firstJan.getTime()) / 86400000);
  const week = String(Math.floor(daysSince / 7) + 1).padStart(2, "0");
  return `${year}-W${week}`;
}

export function clamp01(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

export function makeUserKey(userId: string, key: string) {
  return `wellness:${userId}:${key}`;
}
