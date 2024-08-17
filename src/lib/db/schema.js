import { sql } from "drizzle-orm";
import { jsonb, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fname: varchar("fname", {length:100}).notNull(),
    lname: varchar("lname", {length:100}).notNull(),
    username: varchar("username", {length:100}).unique().notNull(),
    email: varchar("email", {length:100}).unique().notNull(),
    password: varchar("password", {length:100}).notNull(),
    role: varchar("role", {length:12}).notNull().default("user"),
    blogIds: jsonb("blog_ids").default(sql`'[]'::jsonb`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const blogs = pgTable("blogs", {
    id: serial("id").primaryKey(),
    title: varchar("title", {length:100}).notNull(),
    author: varchar("author", {length:100}).notNull(),
    content: varchar("content", {length:600}).notNull(),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});