import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ContactCard App - Create Embeddable Contact Cards",
  description: "Create embeddable contact cards with email, SMS, and WhatsApp. Let your website visitors reach you in one click.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
