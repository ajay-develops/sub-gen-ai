import { auth } from "@clerk/nextjs/server";
import {
  deleteUserApiKey,
  hasUserApiKey,
  saveUserApiKey,
} from "@/lib/keys/user-api-key";
import { apiKeyBodySchema } from "@/lib/validation/api-key";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const hasKey = await hasUserApiKey(userId);
    return Response.json({ hasKey });
  } catch (error) {
    console.error("Failed to check API key status:", error);
    return Response.json(
      { error: "Unable to check API key status" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = apiKeyBodySchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid API key" },
        { status: 400 },
      );
    }

    await saveUserApiKey(userId, parsed.data.apiKey);
    return Response.json({ hasKey: true });
  } catch (error) {
    console.error("Failed to save API key:", error);
    return Response.json({ error: "Unable to save API key" }, { status: 500 });
  }
}

export async function DELETE() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await deleteUserApiKey(userId);
    return Response.json({ hasKey: false });
  } catch (error) {
    console.error("Failed to delete API key:", error);
    return Response.json({ error: "Unable to remove API key" }, { status: 500 });
  }
}
