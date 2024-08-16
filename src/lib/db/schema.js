import { sql } from "drizzle-orm";
import { jsonb, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fname: varchar("fname", {length:100}).notNull(),
    lname: varchar("lname", {length:100}).notNull(),
    username: varchar("username", {length:100}).unique().notNull(),
    email: varchar("email", {length:100}).unique().notNull(),
    role: varchar("role", {length:12}).notNull().default("user"),
    blogIds: jsonb("blog_ids").default(sql`'[]'::jsonb`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const blogs = pgTable("blogs", {
    id: serial("id").primaryKey(),
    blogtitle: varchar("blogtitle", {length:100}).notNull(),
    authorname: varchar("authorname", {length:100}).notNull(),
    blogcontent: varchar("blogcontent", {length:600}).notNull(),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});