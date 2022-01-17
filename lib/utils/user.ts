import { secret } from "./api";
import CryptoJS from "crypto-js";
import { isBrowser } from "./state";
import { deleteCookie, getCookie } from "./cookies";
import { verify } from "jsonwebtoken";

export const encryptUser = (data: {
  username: string;
  id: number;
  rights: number;
}) => {
  const encoded = CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
  return encoded;
};

export const decryptUser = (data: string) => {
  if (!data) return null;

  const decoded = CryptoJS.AES.decrypt(data, secret).toString(
    CryptoJS.enc.Utf8
  );

  return JSON.parse(decoded) as {
    username: string;
    id: number;
    rights: number;
  };
};

export const setUser = (data: {
  id: number;
  username: string;
  rights: number;
}) => {
  try {
    if (isBrowser) {
      localStorage.setItem("user", encryptUser(data));
    }
  } catch {
    // intentionally empty
  }

  return data;
};

export const clearUser = () => {
  if (isBrowser) {
    deleteCookie("auth");
    localStorage.removeItem("user");
  }
};

export const getUser = () => {
  if (!isBrowser) return null;
  let user: { id: number; username: string; rights: number } | null =
    decryptUser(localStorage.getItem("user") || "") || null;
  
  const cookie = getCookie("auth");


  if (user && isValidUser(user, cookie || "")) {
    return user;
  }

  return null;
};

const isValidUser = (
  data: { id: number; username: string; rights: number },
  cookie?: string
) => {
  if (!cookie) return false;
  let isValid;
  verify(cookie, secret, (err, decoded) => {
    if (err) {
      isValid = false;
    }
    if (decoded) {
      const { id, username, rights } = decoded as {
        id: number;
        username: string;
        rights: number;
      };
      if (
        id === data.id &&
        username === data.username &&
        rights === data.rights
      ) {
        isValid = true;
      } else {
        isValid = false;
      }
      
    }
  });

  return isValid;
};
