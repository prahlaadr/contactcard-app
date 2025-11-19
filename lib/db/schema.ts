import { pgTable, text, timestamp, boolean, uuid, varchar } from "drizzle-orm/pg-core";

export const cards = pgTable("cards", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(), // Clerk user ID

  // Card content
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),

  // Contact methods
  emailEnabled: boolean("email_enabled").default(false),
  email: varchar("email", { length: 255 }),

  smsEnabled: boolean("sms_enabled").default(false),
  smsNumber: varchar("sms_number", { length: 50 }),

  whatsappEnabled: boolean("whatsapp_enabled").default(false),
  whatsappNumber: varchar("whatsapp_number", { length: 50 }),

  // Custom branding
  primaryColor: varchar("primary_color", { length: 7 }).default("#3b82f6"), // Default blue
  fontFamily: varchar("font_family", { length: 100 }).default("system-ui"),
  borderRadius: varchar("border_radius", { length: 20 }).default("8px"),

  // Metadata
  slug: varchar("slug", { length: 100 }).notNull().unique(), // For public URLs
  isActive: boolean("is_active").default(true),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Card = typeof cards.$inferSelect;
export type NewCard = typeof cards.$inferInsert;
