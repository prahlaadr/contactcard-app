import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { cards } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// GET a single card
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  const { id } = await params;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const card = await db
      .select()
      .from(cards)
      .where(and(eq(cards.id, id), eq(cards.userId, userId)))
      .limit(1);

    if (card.length === 0) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    return NextResponse.json(card[0]);
  } catch (error) {
    console.error("Failed to fetch card:", error);
    return NextResponse.json({ error: "Failed to fetch card" }, { status: 500 });
  }
}

// PATCH update a card
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  const { id } = await params;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const updatedCard = await db
      .update(cards)
      .set({
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
        updatedAt: new Date(),
      })
      .where(and(eq(cards.id, id), eq(cards.userId, userId)))
      .returning();

    if (updatedCard.length === 0) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    return NextResponse.json(updatedCard[0]);
  } catch (error) {
    console.error("Failed to update card:", error);
    return NextResponse.json({ error: "Failed to update card" }, { status: 500 });
  }
}

// DELETE a card
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  const { id } = await params;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deletedCard = await db
      .delete(cards)
      .where(and(eq(cards.id, id), eq(cards.userId, userId)))
      .returning();

    if (deletedCard.length === 0) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete card:", error);
    return NextResponse.json({ error: "Failed to delete card" }, { status: 500 });
  }
}
