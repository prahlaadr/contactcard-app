"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Mail, MessageSquare, Phone, ExternalLink, Trash2 } from "lucide-react";
import type { Card as CardType } from "@/lib/db/schema";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      fetchCards();
    }
  }, [isLoaded, user]);

  const fetchCards = async () => {
    try {
      const response = await fetch("/api/cards");
      if (response.ok) {
        const data = await response.json();
        setCards(data);
      }
    } catch (error) {
      console.error("Failed to fetch cards:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async (id: string) => {
    if (!confirm("Are you sure you want to delete this card?")) return;

    try {
      const response = await fetch(`/api/cards/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCards(cards.filter((card) => card.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">My Contact Cards</h1>
          <Button onClick={() => router.push("/editor")}>
            <Plus className="mr-2 h-4 w-4" />
            New Card
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {cards.length === 0 ? (
          <Card className="p-12 text-center">
            <CardContent>
              <h2 className="mb-2 text-2xl font-bold">No cards yet</h2>
              <p className="mb-6 text-gray-600">
                Create your first contact card to get started
              </p>
              <Button onClick={() => router.push("/editor")}>
                <Plus className="mr-2 h-4 w-4" />
                Create First Card
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <Card key={card.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-1">{card.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {card.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => deleteCard(card.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact methods summary */}
                  <div className="flex gap-2 text-sm text-gray-600">
                    {card.emailEnabled && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        Email
                      </span>
                    )}
                    {card.smsEnabled && (
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        SMS
                      </span>
                    )}
                    {card.whatsappEnabled && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        WhatsApp
                      </span>
                    )}
                  </div>

                  {/* Card URL */}
                  <div className="rounded bg-gray-100 p-2">
                    <p className="truncate text-xs text-gray-600">
                      /card/{card.slug}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      size="sm"
                      onClick={() => router.push(`/card/${card.slug}`)}
                    >
                      <ExternalLink className="mr-2 h-3 w-3" />
                      View
                    </Button>
                    <Button
                      className="flex-1"
                      size="sm"
                      onClick={() => router.push(`/editor?id=${card.id}`)}
                    >
                      Edit
                    </Button>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{card.isActive ? "Active" : "Inactive"}</span>
                    <span>
                      Created {new Date(card.createdAt!).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
