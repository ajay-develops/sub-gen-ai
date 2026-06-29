import { decrypt, encrypt, type EncryptedPayload } from "@/lib/crypto/encryption";
import { REDIS_API_KEY_PREFIX } from "@/lib/constants";
import { redis } from "@/lib/redis/client";

function redisKey(userId: string): string {
  return `${REDIS_API_KEY_PREFIX}${userId}`;
}

export async function saveUserApiKey(
  userId: string,
  apiKey: string,
): Promise<void> {
  const payload = encrypt(apiKey);
  await redis.set(redisKey(userId), payload);
}

export async function getUserApiKey(userId: string): Promise<string | null> {
  const payload = await redis.get<EncryptedPayload>(redisKey(userId));

  if (!payload) {
    return null;
  }

  return decrypt(payload);
}

export async function hasUserApiKey(userId: string): Promise<boolean> {
  const exists = await redis.exists(redisKey(userId));
  return exists === 1;
}

export async function deleteUserApiKey(userId: string): Promise<void> {
  await redis.del(redisKey(userId));
}
