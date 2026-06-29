import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

export type EncryptedPayload = {
  iv: string;
  ciphertext: string;
  authTag: string;
};

function getEncryptionKey(): Buffer {
  const key = process.env.SERVER_ENCRYPTION_KEY;

  if (!key) {
    throw new Error("SERVER_ENCRYPTION_KEY is not configured");
  }

  const buffer = Buffer.from(key, "hex");

  if (buffer.length !== 32) {
    throw new Error(
      "SERVER_ENCRYPTION_KEY must be 32 bytes (64 hex characters)",
    );
  }

  return buffer;
}

export function encrypt(plaintext: string): EncryptedPayload {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, getEncryptionKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString("base64"),
    ciphertext: encrypted.toString("base64"),
    authTag: authTag.toString("base64"),
  };
}

export function decrypt(payload: EncryptedPayload): string {
  const decipher = createDecipheriv(
    ALGORITHM,
    getEncryptionKey(),
    Buffer.from(payload.iv, "base64"),
  );

  decipher.setAuthTag(Buffer.from(payload.authTag, "base64"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(payload.ciphertext, "base64")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
