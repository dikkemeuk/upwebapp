import { isBrowser } from "./state";

export function getCookie(name: string): string | null {
  if (isBrowser) {
    const nameLenPlus = name.length + 1;
    return (
      document.cookie
        .split(";")
        .map((c) => c.trim())
        .filter((cookie) => {
          return cookie.substring(0, nameLenPlus) === `${name}=`;
        })
        .map((cookie) => {
          return decodeURIComponent(cookie.substring(nameLenPlus));
        })[0] || null
    );
  }
  return null;
}

export function setCookie(name: string, value: string, days: number) {
  if (!isBrowser) return;
  const expires = new Date(Date.now() + days * 86400000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}`;
}

export function deleteCookie(name: string) {
  if (!isBrowser) return;
  setCookie(name, "", -1);
}
