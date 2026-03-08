/**
 * CCAvenue Crypto Helpers — adapted from the official CCAvenue NodeJS_Integration_Kit
 * (AES-128/nonseamless/ccavutil.js) to match exact encryption spec.
 *
 * Key derivation : MD5 of working key, digest as 'binary' (raw bytes)
 * Cipher         : AES-128-CBC
 * IV             : 0x00 0x01 0x02 … 0x0F  (sequential, NOT all-zero)
 * Encoding       : input UTF-8 → cipher hex (encrypt); hex → plain UTF-8 (decrypt)
 */
import { createCipheriv, createDecipheriv, createHash } from "crypto";

// Official IV from ccavutil.js: '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f'
const IV = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);

function deriveMd5Key(workingKey: string): Buffer {
    // Must use MD5 of working key. digest() returns a Buffer (16 bytes), which createCipheriv expects for AES-128.
    const key = createHash("md5").update((workingKey || "").trim()).digest();
    if (key.length !== 16) {
        throw new Error(`Invalid key length: ${key.length}. AES-128-CBC requires 16 bytes.`);
    }
    return key;
}

/** Encrypt plain-text for CCAvenue. Returns hex-encoded ciphertext. */
export function encrypt(plainText: string, workingKey: string): string {
    const key = deriveMd5Key(workingKey);
    const cipher = createCipheriv("aes-128-cbc", key, IV);
    let encoded = cipher.update(plainText, "utf8", "hex");
    encoded += cipher.final("hex");
    return encoded;
}

/** Decrypt CCAvenue hex-encoded ciphertext. Returns plain-text string. */
export function decrypt(encText: string, workingKey: string): string {
    const key = deriveMd5Key(workingKey);
    const decipher = createDecipheriv("aes-128-cbc", key, IV);
    let decoded = decipher.update(encText, "hex", "utf8");
    decoded += decipher.final("utf8");
    return decoded;
}

/** Parse CCAvenue key=value response string into a plain object. */
export function parseResponse(raw: string): Record<string, string> {
    const result: Record<string, string> = {};
    raw.split("&").forEach((pair) => {
        const idx = pair.indexOf("=");
        if (idx !== -1) {
            const key = pair.slice(0, idx).trim();
            const val = pair.slice(idx + 1).replace(/\+/g, " ").trim();
            result[key] = decodeURIComponent(val);
        }
    });
    return result;
}
