CREATE TABLE "contact_messages" (
  "id" text PRIMARY KEY NOT NULL,
  "email" text NOT NULL,
  "message" text DEFAULT '' NOT NULL,
  "status" text DEFAULT 'new' NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);
