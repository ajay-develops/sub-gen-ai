export const FEATUREBASE_APP_ID =
  process.env.NEXT_PUBLIC_FEATUREBASE_APP_ID ?? "";

export const FEATUREBASE_ORG = process.env.NEXT_PUBLIC_FEATUREBASE_ORG ?? "";

export function getFeaturebaseSsoSecret(): string {
  const secret = process.env.FEATUREBASE_SSO_SECRET;

  if (!secret) {
    throw new Error("FEATUREBASE_SSO_SECRET is not configured");
  }

  return secret;
}

export function isFeaturebaseConfigured(): boolean {
  return Boolean(FEATUREBASE_APP_ID && FEATUREBASE_ORG);
}
