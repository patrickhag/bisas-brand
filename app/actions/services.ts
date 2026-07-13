"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { services } from "@/db/schema";
import { db } from "@/lib/db";
import type { ServiceItem } from "@/components/inquiries/types";

type ServiceInput = {
  name: string;
  image?: string | null;
  description?: string;
};

function normalizeService(input: ServiceInput) {
  const name = input.name.trim();

  if (!name) {
    throw new Error("Service name is required.");
  }

  return {
    name,
    image: input.image?.trim() || null,
    description: input.description?.trim() || "",
  };
}

function revalidateServicePages() {
  revalidatePath("/");
  revalidatePath("/admin/inquiries");
}

export async function getServices(): Promise<ServiceItem[]> {
  return db.select().from(services).orderBy(desc(services.createdAt)).limit(3);
}

export async function getAllServices(): Promise<ServiceItem[]> {
  return db.select().from(services).orderBy(desc(services.createdAt));
}

export async function createService(input: ServiceInput): Promise<ServiceItem> {
  const [service] = await db
    .insert(services)
    .values(normalizeService(input))
    .returning();

  revalidateServicePages();
  return service;
}

export async function updateService(
  id: string,
  input: ServiceInput,
): Promise<ServiceItem> {
  const [service] = await db
    .update(services)
    .set(normalizeService(input))
    .where(eq(services.id, id))
    .returning();

  if (!service) {
    throw new Error("Service not found.");
  }

  revalidateServicePages();
  return service;
}

export async function deleteService(id: string): Promise<void> {
  const [service] = await db
    .delete(services)
    .where(eq(services.id, id))
    .returning({ id: services.id });

  if (!service) {
    throw new Error("Service not found.");
  }

  revalidateServicePages();
}
