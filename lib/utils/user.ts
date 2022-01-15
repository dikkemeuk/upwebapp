import { secret } from "./api";
import CryptoJS from "crypto-js";

export const encryptUser = (data: { username: string, id: number, rights: number}) => {
    const encoded = CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
    return encoded
}

export const decryptUser = async (data: string) => {
    const decoded = CryptoJS.AES.decrypt(data, secret).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decoded) as { username: string, id: number, rights: number}
}

export const setUser = (data: {id: number, username: string, rights: number}) => {
    localStorage.setItem("user", encryptUser(data));
}

export const compare = (data: string) => {
    const stored = localStorage.getItem("user");
    if(stored === data) {
        return decryptUser(stored);
    } 
    localStorage.setItem("user", data);
    const update = localStorage.getItem("user");
    return decryptUser(update!);
}

export const clearUser = () => {
    return localStorage.removeItem("user");
}

export const getUser = () => {
    const stored = localStorage.getItem("user");
    if(stored) {
        return decryptUser(stored);
    }
    return null;
}

