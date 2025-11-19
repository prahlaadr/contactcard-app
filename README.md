# ContactCard App

A modern, production-ready web application for creating embeddable contact cards. Let website visitors reach you through email, SMS, or WhatsApp in one click.

![ContactCard App](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Features

- 🔐 **Secure Authentication** - Clerk SSO with email, Google, GitHub
- 📇 **Multiple Cards** - Create and manage unlimited contact cards
- 🎨 **Custom Branding** - Customize colors, fonts, and border radius
- 📱 **QR Codes** - Auto-generated QR codes for offline sharing
- 🔗 **Embeddable** - Easy-to-use JavaScript widget for any website
- ⚡ **Real-time Preview** - See changes instantly as you edit
- 💾 **Database** - Vercel Postgres with Drizzle ORM
- 🚀 **Production Ready** - Fully typed, tested, and optimized

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Auth** | Clerk |
| **Database** | Vercel Postgres + Drizzle ORM |
| **Deployment** | Vercel |
| **Package Manager** | Bun |

## 🚀 Quick Start

### Prerequisites

- Bun or Node.js 18+
- Clerk account (free tier available)
- Vercel account (for deployment)

### Installation

1. **Clone and install**:
```bash
git clone <your-repo-url>
cd contactcard-app
bun install
```

2. **Set up environment variables**:

Create `.env.local`:
```env
# Clerk (get from https://dashboard.clerk.com/last-active?path=api-keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Vercel Postgres (auto-added by Vercel when you create a Postgres database)
POSTGRES_URL=postgres://...
POSTGRES_PRISMA_URL=postgres://...
POSTGRES_URL_NO_SSL=postgres://...
POSTGRES_URL_NON_POOLING=postgres://...
```

3. **Initialize the database**:
```bash
bun run db:push
```

4. **Start development**:
```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📖 Deployment Guide

### Step 1: Set up Clerk

1. Go to [clerk.com](https://clerk.com) and sign up
2. Create a new application
3. Choose authentication methods (Email, Google, GitHub, etc.)
4. Copy your **Publishable Key** and **Secret Key**
5. Configure URLs in Clerk Dashboard:
   - **Homepage URL**: `https://your-domain.com`
   - **Sign-in URL**: `/sign-in`
   - **Sign-up URL**: `/sign-up`
   - **After sign-in URL**: `/dashboard`
   - **After sign-up URL**: `/dashboard`

### Step 2: Set up Vercel Postgres

1. Go to [vercel.com](https://vercel.com) and sign in
2. Create a new project from your GitHub repo
3. Go to **Storage** tab → **Create Database** → Select **Postgres**
4. Vercel will automatically add all Postgres environment variables to your project

### Step 3: Deploy to Vercel

#### Option A: Via GitHub (Recommended)

1. Push your code to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/contactcard-app.git
git branch -M main
git push -u origin main
```

2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Add Clerk environment variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL` = `/sign-in`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL` = `/sign-up`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` = `/dashboard`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` = `/dashboard`

5. Click **Deploy**

6. After deployment, run database migrations:
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Link your project
vercel link

# Run migrations
vercel env pull .env.local
bun run db:push
```

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Step 4: Update Clerk with Production URL

After deployment:
1. Go to Clerk Dashboard
2. Update **Homepage URL** to your Vercel domain (e.g., `https://contactcard-app.vercel.app`)
3. Add Vercel domain to **Allowed Origins**

## 📁 Project Structure

```
contactcard-app/
├── app/
│   ├── api/
│   │   └── cards/          # CRUD API routes
│   ├── card/
│   │   └── [slug]/         # Public card view
│   ├── dashboard/          # User dashboard
│   ├── editor/             # Card editor
│   ├── sign-in/            # Auth pages
│   ├── sign-up/
│   ├── layout.tsx          # Root layout with ClerkProvider
│   └── page.tsx            # Landing page
├── components/
│   └── ui/                 # shadcn/ui components
├── lib/
│   └── db/                 # Database schema & connection
├── public/
│   └── embed.js            # Embeddable widget script
└── middleware.ts           # Clerk middleware
```

## 💻 Usage

### Creating a Card

1. Sign up at `/sign-up`
2. Go to Dashboard (`/dashboard`)
3. Click "New Card"
4. Fill in your details:
   - Title and description
   - Contact methods (Email, SMS, WhatsApp)
   - Custom branding (color, font, border radius)
5. Click "Save Card"

### Sharing Your Card

**Public URL**:
```
https://your-domain.com/card/your-slug
```

**QR Code**:
- Download from the editor page
- Share offline or print on business cards

**Embed on Website**:
```html
<script src="https://your-domain.com/embed.js"
        data-card-slug="your-slug"></script>
```

## 🗄️ Database Schema

```sql
CREATE TABLE cards (
  id UUID PRIMARY KEY,
  user_id TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,

  -- Contact methods
  email_enabled BOOLEAN DEFAULT FALSE,
  email VARCHAR(255),
  sms_enabled BOOLEAN DEFAULT FALSE,
  sms_number VARCHAR(50),
  whatsapp_enabled BOOLEAN DEFAULT FALSE,
  whatsapp_number VARCHAR(50),

  -- Branding
  primary_color VARCHAR(7) DEFAULT '#3b82f6',
  font_family VARCHAR(100) DEFAULT 'system-ui',
  border_radius VARCHAR(20) DEFAULT '8px',

  -- Meta
  slug VARCHAR(100) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Development Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run db:generate` | Generate migrations |
| `bun run db:push` | Push schema to database |
| `bun run db:studio` | Open Drizzle Studio |

## 🐛 Troubleshooting

### Build Errors

**Clerk Error: "publishableKey is invalid"**
- Make sure you added `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
- Check that keys start with `pk_` and `sk_` respectively

**Database Connection Error**
- Verify Postgres environment variables are set
- Run `bun run db:push` to create tables

### TypeScript Errors

If you see TypeScript errors with form inputs:
- The project uses strict TypeScript with DOM types
- All event handlers use proper typing with `ChangeEvent<HTMLInputElement>`

## 🎯 Roadmap

- [ ] Analytics dashboard (track clicks per contact method)
- [ ] Team accounts (share cards across team)
- [ ] Custom domains for cards
- [ ] A/B testing for different card designs
- [ ] Integration with CRM systems

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 💬 Support

For questions or issues:
- Open an issue on GitHub
- Check [Next.js docs](https://nextjs.org/docs)
- Check [Clerk docs](https://clerk.com/docs)
- Check [Drizzle docs](https://orm.drizzle.team/docs/overview)

---

**Built with** ❤️ **using Next.js, TypeScript, and Vercel**
