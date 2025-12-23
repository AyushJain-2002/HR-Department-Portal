// utils/secureCookie.js
import CryptoJS from "crypto-js";

const secretKey =import.meta.env.VITE_SECRET_KEY
// const secretKey ="hello_my_name_is_NIB";

export const setEncryptedCookie = (key, data, expiryInMinutes = 240) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  const expiryDate = new Date(Date.now() + expiryInMinutes * 60 * 1000);
  document.cookie = `${key}=${encrypted}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict;`;
};

export const getDecryptedCookie = (key) => {
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [k, v] = cookie.split("=");
    acc[k] = v;
    return acc;
  }, {});
  // console.log(cookies,key,"cookies and key")
  if (!cookies[key]) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(cookies[key], secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(decrypted)
    return JSON.parse(decrypted);
  } catch (e) {
    // console.error("Decryption failed:", e);
    return null;
  }
};



// import { getDecryptedCookie } from "../utils/secureCookie";

// const userInfo = getDecryptedCookie("userInfo");

// if (userInfo) {
//   console.log(userInfo.role); // "HR" or "Operation"
// }



//   setEncryptedCookie("userInfo", {
//     id: action.payload.user.id,
//     email: action.payload.user.email,
//     branch_id: action.payload.user.branch_id,
//     login_email: action.payload.user.login_email,
//     personal_email: action.payload.personal_email,
//     role: action.payload.user.role,
//   });