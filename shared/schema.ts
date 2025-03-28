import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  originalFileName: text("original_file_name").notNull(),
  originalPath: text("original_path").notNull(),
  processedPath: text("processed_path"),
  status: text("status").notNull().default("pending"),
  error: text("error"), // Add an error field to store error messages
  createdAt: text("created_at").notNull(), // Storing ISO string date
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertImageSchema = createInsertSchema(images).pick({
  originalFileName: true,
  originalPath: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertImage = z.infer<typeof insertImageSchema>;
export type Image = typeof images.$inferSelect;
