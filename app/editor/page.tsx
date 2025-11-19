"use client";

import { useState, type ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Mail, MessageSquare, Phone, ArrowLeft, Download, Copy, Check } from "lucide-react";
import QRCode from "qrcode";

export default function EditorPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // Card state
  const [title, setTitle] = useState("Contact me 👋");
  const [description, setDescription] = useState("Feel free to reach out!");
  const [slug, setSlug] = useState("");

  // Contact methods
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [email, setEmail] = useState("");
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [smsNumber, setSmsNumber] = useState("");
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  // Branding
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [fontFamily, setFontFamily] = useState("system-ui");
  const [borderRadius, setBorderRadius] = useState("8px");

  const handleInputChange = (setter: (value: string) => void) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setter((e.currentTarget as HTMLInputElement).value);
    };
  };

  // Generate QR code
  useEffect(() => {
    if (slug) {
      const cardUrl = `${window.location.origin}/card/${slug}`;
      QRCode.toDataURL(cardUrl, { width: 300, margin: 2 })
        .then(setQrCodeUrl)
        .catch(console.error);
    }
  }, [slug]);

  // Auto-generate slug from user email
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress && !slug) {
      const emailUsername = user.primaryEmailAddress.emailAddress.split("@")[0];
      setSlug(emailUsername + "-" + Math.random().toString(36).substring(7));
      setEmail(user.primaryEmailAddress.emailAddress);
    }
  }, [user, slug]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          title,
          description,
          slug,
          emailEnabled,
          email,
          smsEnabled,
          smsNumber,
          whatsappEnabled,
          whatsappNumber,
          primaryColor,
          fontFamily,
          borderRadius,
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save card:", error);
    } finally {
      setSaving(false);
    }
  };

  const copyEmbedCode = () => {
    const embedCode = `<script src="${window.location.origin}/embed.js" data-card-slug="${slug}"></script>`;
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.download = `${slug}-qr-code.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  if (!isLoaded) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button onClick={handleSave} disabled={saving || !slug}>
            {saving ? "Saving..." : saved ? "Saved!" : "Save Card"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Create Contact Card</h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Editor */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Details</CardTitle>
                <CardDescription>Customize your contact card information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Card Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={handleInputChange(setTitle)}
                    placeholder="Enter a title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={handleInputChange(setDescription)}
                    placeholder="Brief description"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Custom URL Slug</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={handleInputChange(setSlug)}
                    placeholder="your-unique-slug"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Your card URL: /card/{slug || "your-slug"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                      type="email"
                      value={email}
                      onChange={handleInputChange(setEmail)}
                      placeholder="your@email.com"
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
                      type="tel"
                      value={smsNumber}
                      onChange={handleInputChange(setSmsNumber)}
                      placeholder="+1 (555) 123-4567"
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
                      type="tel"
                      value={whatsappNumber}
                      onChange={handleInputChange(setWhatsappNumber)}
                      placeholder="+1 (555) 123-4567"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Branding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="color"
                      type="color"
                      value={primaryColor}
                      onChange={handleInputChange(setPrimaryColor)}
                      className="w-20"
                    />
                    <Input
                      value={primaryColor}
                      onChange={handleInputChange(setPrimaryColor)}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="font">Font Family</Label>
                  <select
                    id="font"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="system-ui">System UI</option>
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Courier New">Courier New</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="radius">Border Radius</Label>
                  <select
                    id="radius"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="0px">None</option>
                    <option value="4px">Small</option>
                    <option value="8px">Medium</option>
                    <option value="16px">Large</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Export */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your card will look to visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="rounded-lg border-2 p-6"
                  style={{
                    fontFamily,
                    borderRadius,
                    borderColor: primaryColor,
                  }}
                >
                  <h3 className="mb-2 text-2xl font-bold">{title}</h3>
                  <p className="mb-4 text-gray-600">{description}</p>
                  <div className="space-y-2">
                    {emailEnabled && email && (
                      <Button
                        className="w-full gap-2"
                        variant="outline"
                        style={{ borderColor: primaryColor, color: primaryColor }}
                      >
                        <Mail className="h-4 w-4" />
                        Contact via Email
                      </Button>
                    )}
                    {smsEnabled && smsNumber && (
                      <Button
                        className="w-full gap-2"
                        variant="outline"
                        style={{ borderColor: primaryColor, color: primaryColor }}
                      >
                        <MessageSquare className="h-4 w-4" />
                        Contact via SMS
                      </Button>
                    )}
                    {whatsappEnabled && whatsappNumber && (
                      <Button
                        className="w-full gap-2"
                        variant="outline"
                        style={{ borderColor: primaryColor, color: primaryColor }}
                      >
                        <Phone className="h-4 w-4" />
                        Contact via WhatsApp
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {slug && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>QR Code</CardTitle>
                    <CardDescription>Share your card offline</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {qrCodeUrl && (
                      <div className="flex flex-col items-center gap-4">
                        <img src={qrCodeUrl} alt="QR Code" className="rounded-lg border" />
                        <Button onClick={downloadQR} className="w-full gap-2">
                          <Download className="h-4 w-4" />
                          Download QR Code
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Embed Code</CardTitle>
                    <CardDescription>Add this to your website</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <code className="block rounded bg-gray-100 p-4 text-sm">
                      {`<script src="${typeof window !== "undefined" ? window.location.origin : ""}/embed.js" data-card-slug="${slug}"></script>`}
                    </code>
                    <Button onClick={copyEmbedCode} className="w-full gap-2" variant="outline">
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy Code
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
