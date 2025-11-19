"use client";

import { useState, type ChangeEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Mail, MessageSquare, Phone, ArrowRight, Sparkles, Share2, MessageCircle } from "lucide-react";

export default function Home() {
  const [title, setTitle] = useState("Contact me 👋");
  const [description, setDescription] = useState("I'm John, and I sell art online. Feel free to contact me directly");
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [email, setEmail] = useState("example@email.com");
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [sms, setSms] = useState("5551234567");
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [whatsapp, setWhatsapp] = useState("5559876543");

  const handleInputChange = (setter: (value: string) => void) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.currentTarget.value);
    };
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">
            ContactCard
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight">
          Let people contact you <span className="text-blue-600">easily</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Create embeddable contact cards that let website visitors reach you directly through
          email, SMS, or WhatsApp in 1-click.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/sign-up">
            <Button size="lg" className="gap-2">
              Create your card <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline">
              Log in
            </Button>
          </Link>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Try it here</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Editor */}
            <Card>
              <CardHeader>
                <CardTitle>What you see</CardTitle>
                <CardDescription>Customize your contact card</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Card Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={handleInputChange(setTitle)}
                    placeholder="Enter a title for your card"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Card Description</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={handleInputChange(setDescription)}
                    placeholder="Enter a description for your card"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-toggle" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Switch
                      id="email-toggle"
                      checked={emailEnabled}
                      onCheckedChange={setEmailEnabled}
                    />
                  </div>
                  {emailEnabled && (
                    <Input
                      value={email}
                      onChange={handleInputChange(setEmail)}
                      placeholder="Your email address"
                    />
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-toggle" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      SMS
                    </Label>
                    <Switch
                      id="sms-toggle"
                      checked={smsEnabled}
                      onCheckedChange={setSmsEnabled}
                    />
                  </div>
                  {smsEnabled && (
                    <Input
                      value={sms}
                      onChange={handleInputChange(setSms)}
                      placeholder="Your phone number"
                    />
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="whatsapp-toggle" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      WhatsApp
                    </Label>
                    <Switch
                      id="whatsapp-toggle"
                      checked={whatsappEnabled}
                      onCheckedChange={setWhatsappEnabled}
                    />
                  </div>
                  {whatsappEnabled && (
                    <Input
                      value={whatsapp}
                      onChange={handleInputChange(setWhatsapp)}
                      placeholder="Your WhatsApp number"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>What your visitors see</CardTitle>
                <CardDescription>Live preview of your contact card</CardDescription>
              </CardHeader>
              <CardContent>
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription className="text-base">{description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {emailEnabled && (
                      <Button className="w-full gap-2" variant="outline">
                        <Mail className="h-4 w-4" />
                        Contact via Email
                      </Button>
                    )}
                    {smsEnabled && (
                      <Button className="w-full gap-2" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                        Contact via SMS
                      </Button>
                    )}
                    {whatsappEnabled && (
                      <Button className="w-full gap-2" variant="outline">
                        <Phone className="h-4 w-4" />
                        Contact via WhatsApp
                      </Button>
                    )}
                  </CardContent>
                </Card>
                <Button className="mt-4 w-full">Save my card</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">How it works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Sparkles className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Set your contact info</h3>
              <p className="text-gray-600">Add your email, SMS or WhatsApp</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Share2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Embed your card</h3>
              <p className="text-gray-600">Choose where people will find your contact card</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Chat with leads</h3>
              <p className="text-gray-600">Instantly receive messages from your visitors</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to connect with your audience?</h2>
          <p className="mb-8 text-lg opacity-90">Create your first contact card in seconds, for free.</p>
          <Link href="/sign-up">
            <Button size="lg" variant="secondary" className="gap-2">
              Create your card <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2025 ContactCard App. Built with Next.js and Vercel.</p>
        </div>
      </footer>
    </div>
  );
}
