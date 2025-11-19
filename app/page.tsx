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
      setter((e.currentTarget as HTMLInputElement).value);
    };
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold">
            ContactCard Creator
          </Link>
          <Link href="/sign-in">
            <Button variant="ghost" className="gap-2">
              <Mail className="h-4 w-4" />
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight">
          Let people contact you easily
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600">
          Create embeddable contact cards that let website visitors reach you directly through
          email, SMS, or WhatsApp in 1-click.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/editor">
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
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold">Try it here</h2>
          <div className="grid gap-0 overflow-hidden rounded-lg shadow-lg md:grid-cols-2">
            {/* Editor - Dark Side */}
            <div className="bg-slate-800 p-8">
              <h3 className="mb-6 text-xl font-bold text-white">What you see</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Card Title</label>
                  <Input
                    id="title"
                    value={title}
                    onChange={handleInputChange(setTitle)}
                    placeholder="Enter a title for your card"
                    className="border-slate-700 bg-slate-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Card Description</label>
                  <Input
                    id="description"
                    value={description}
                    onChange={handleInputChange(setDescription)}
                    placeholder="Enter a description for your card"
                    className="border-slate-700 bg-slate-700 text-white placeholder:text-gray-500"
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

            {/* Preview - Light Side */}
            <div className="bg-gray-50 p-8">
              <h3 className="mb-6 text-xl font-bold">What your visitors see</h3>
              <div className="flex flex-col gap-6">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-6">
                    <h3 className="mb-2 text-xl font-bold">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                  </div>
                  <div className="space-y-2">
                    {emailEnabled && (
                      <Button className="w-full gap-2 bg-white text-gray-900 hover:bg-gray-100" variant="outline">
                        <Mail className="h-4 w-4" />
                        Contact via Email
                      </Button>
                    )}
                    {smsEnabled && (
                      <Button className="w-full gap-2 bg-white text-gray-900 hover:bg-gray-100" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                        Contact via SMS
                      </Button>
                    )}
                    {whatsappEnabled && (
                      <Button className="w-full gap-2 bg-white text-gray-900 hover:bg-gray-100" variant="outline">
                        <Phone className="h-4 w-4" />
                        Contact via WhatsApp
                      </Button>
                    )}
                  </div>
                </div>
                <Button className="w-full">Save my card</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">How it works</h2>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Set your contact info</h3>
              <p className="text-sm text-gray-600">Add your email, SMS or WhatsApp</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                <Share2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Embed your card</h3>
              <p className="text-sm text-gray-600">Choose where people will find your contact card</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Chat with leads</h3>
              <p className="text-sm text-gray-600">Instantly receive messages from your visitors, and chat with them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-3 text-3xl font-bold">Ready to connect with your audience?</h2>
          <p className="mb-8 text-base text-gray-600">Create your first contact card in seconds, for free.</p>
          <Link href="/editor">
            <Button size="lg" className="gap-2">
              Create your card <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
