import { auth, currentUser } from "@clerk/nextjs/server";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { getFeaturebaseSsoSecret } from "@/lib/featurebase/config";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.primaryEmailAddress?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "User email is required for Featurebase SSO" },
        { status: 400 },
      );
    }

    const name =
      user.fullName ??
      [user.firstName, user.lastName].filter(Boolean).join(" ") ??
      email;

    const token = jwt.sign(
      {
        id: userId,
        email,
        name,
      },
      getFeaturebaseSsoSecret(),
      { algorithm: "HS256" },
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Featurebase SSO error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
