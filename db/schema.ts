import { pgTable, text, pgEnum } from "drizzle-orm/pg-core";

export const projectStatusEnum = pgEnum("project_status", [
  "published",
  "draft",
]);

export const projects = pgTable("projects", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  images: text("images").array().notNull().default([]),
  category: text("category").notNull(),
  status: projectStatusEnum("status").notNull().default("draft"),
  tags: text("tags").array().notNull().default([]),
  description: text("description").notNull().default(""),
  cost: text("cost").notNull().default(""),
  address: text("address").notNull().default(""),
});

export const services = pgTable("services", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  image: text("image"),
  description: text("description").notNull().default(""),
});
