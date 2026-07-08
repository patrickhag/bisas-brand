"use server";

import { projects } from "@/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import type { PortfolioProject } from "./types";

export async function getPublishedProjects(): Promise<PortfolioProject[]> {
  return db
    .select()
    .from(projects)
    .where(eq(projects.status, "published"));
}
