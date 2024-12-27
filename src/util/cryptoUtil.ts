import * as CryptoJS from "crypto-js";

export const computeMd5Hash = (input: string): string  => {
  // Calculate MD5 hash
  const hash = CryptoJS.MD5(input);
  // Convert hash to a WordArray
  const hashWords = hash.words;
  // Convert WordArray to Uint8Array
  const byteArray = new Uint8Array(hashWords.length * 4);

  for (let i = 0; i < hashWords.length; i++) {
    // Each word is 32 bits (4 bytes)
    byteArray[i * 4] = (hashWords[i] >> 24) & 0xff; // 1st byte
    byteArray[i * 4 + 1] = (hashWords[i] >> 16) & 0xff; // 2nd byte
    byteArray[i * 4 + 2] = (hashWords[i] >> 8) & 0xff; // 3rd byte
    byteArray[i * 4 + 3] = hashWords[i] & 0xff; // 4th byte
  }

  return btoa(String.fromCharCode(...byteArray));
};