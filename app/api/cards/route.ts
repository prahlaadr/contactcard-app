import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { cards } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET all cards for the current user
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userCards = await db.select().from(cards).where(eq(cards.userId, userId));
    return NextResponse.json(userCards);
  } catch (error) {
    console.error("Failed to fetch cards:", error);
    return NextResponse.json({ error: "Failed to fetch cards" }, { status: 500 });
  }
}

// POST create a new card
export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const newCard = await db
      .insert(cards)
      .values({
        userId,
        title: body.title,
        description: body.description,
        slug: body.slug,
        emailEnabled: body.emailEnabled,
        email: body.email,
        smsEnabled: body.smsEnabled,
        smsNumber: body.smsNumber,
        whatsappEnabled: body.whatsappEnabled,
        whatsappNumber: body.whatsappNumber,
        primaryColor: body.primaryColor,
        fontFamily: body.fontFamily,
        borderRadius: body.borderRadius,
        isActive: true,
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(newCard[0]);
  } catch (error) {
    console.error("Failed to create card:", error);
    return NextResponse.json({ error: "Failed to create card" }, { status: 500 });
  }
}
