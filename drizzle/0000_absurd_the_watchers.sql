CREATE TYPE "public"."project_status" AS ENUM('published', 'draft');--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"background_image" text,
	"category" text NOT NULL,
	"status" "project_status" DEFAULT 'draft' NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL
);
