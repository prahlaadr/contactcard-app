import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { cards } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default async function PublicCardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const card = await db.select().from(cards).where(eq(cards.slug, slug)).limit(1);

  if (card.length === 0 || !card[0].isActive) {
    notFound();
  }

  const cardData = card[0];

  const handleEmailClick = () => {
    if (cardData.email) {
      window.location.href = `mailto:${cardData.email}`;
    }
  };

  const handleSmsClick = () => {
    if (cardData.smsNumber) {
      window.location.href = `sms:${cardData.smsNumber}`;
    }
  };

  const handleWhatsAppClick = () => {
    if (cardData.whatsappNumber) {
      window.location.href = `https://wa.me/${cardData.whatsappNumber.replace(/[^0-9]/g, "")}`;
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50 p-4"
      style={{ fontFamily: cardData.fontFamily || "system-ui" }}
    >
      <Card
        className="w-full max-w-md"
        style={{
          borderRadius: cardData.borderRadius || "8px",
          borderColor: cardData.primaryColor || "#3b82f6",
          borderWidth: "2px",
        }}
      >
        <CardHeader>
          <CardTitle className="text-2xl">{cardData.title}</CardTitle>
          {cardData.description && <CardDescription>{cardData.description}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-3">
          {cardData.emailEnabled && cardData.email && (
            <a href={`mailto:${cardData.email}`}>
              <Button
                className="w-full gap-2"
                variant="outline"
                style={{
                  borderColor: cardData.primaryColor || "#3b82f6",
                  color: cardData.primaryColor || "#3b82f6",
                }}
              >
                <Mail className="h-4 w-4" />
                Contact via Email
              </Button>
            </a>
          )}

          {cardData.smsEnabled && cardData.smsNumber && (
            <a href={`sms:${cardData.smsNumber}`}>
              <Button
                className="w-full gap-2"
                variant="outline"
                style={{
                  borderColor: cardData.primaryColor || "#3b82f6",
                  color: cardData.primaryColor || "#3b82f6",
                }}
              >
                <MessageSquare className="h-4 w-4" />
                Contact via SMS
              </Button>
            </a>
          )}

          {cardData.whatsappEnabled && cardData.whatsappNumber && (
            <a
              href={`https://wa.me/${cardData.whatsappNumber.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="w-full gap-2"
                variant="outline"
                style={{
                  borderColor: cardData.primaryColor || "#3b82f6",
                  color: cardData.primaryColor || "#3b82f6",
                }}
              >
                <Phone className="h-4 w-4" />
                Contact via WhatsApp
              </Button>
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
