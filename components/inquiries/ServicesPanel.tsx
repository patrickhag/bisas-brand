"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";

import {
  createService,
  deleteService,
  updateService,
} from "@/app/actions/services";
import type { ServiceItem } from "@/components/inquiries/types";
import ImageUploader from "@/components/ui/ImageUploader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogPopup,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ServicesPanel({
  initialServices,
}: {
  initialServices: ServiceItem[];
}) {
  const [services, setServices] = useState(initialServices);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  function openNewService() {
    setEditingService(null);
    setIsSheetOpen(true);
  }

  function openEditService(service: ServiceItem) {
    setEditingService(service);
    setIsSheetOpen(true);
  }

  function handleSaved(service: ServiceItem) {
    setServices((current) => {
      const exists = current.some((item) => item.id === service.id);
      return exists
        ? current.map((item) => (item.id === service.id ? service : item))
        : [...current, service];
    });
    setEditingService(null);
    setIsSheetOpen(false);
    setError("");
  }

  async function handleDelete(service: ServiceItem) {
    setDeletingId(service.id);
    setError("");

    try {
      await deleteService(service.id);
      setServices((current) =>
        current.filter((item) => item.id !== service.id),
      );
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete service.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="mb-5 flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="font-mono text-2xl font-bold text-[#2C2C2C]">
            Service Management
          </h2>
          <p className="mt-2 text-sm text-[#7A6F69]">
            Manage the services displayed on the landing page.
          </p>
        </div>

        <Sheet
          open={isSheetOpen}
          onOpenChange={(open) => {
            setIsSheetOpen(open);
            if (!open) setEditingService(null);
          }}
        >
          <SheetTrigger
            onClick={openNewService}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#E4CC72] px-5 py-3 font-mono text-sm font-medium text-[#2C2C2C]"
          >
            <Plus size={16} />
            New Service
          </SheetTrigger>
          <SheetContent>
            <ServiceForm
              key={editingService?.id ?? "new-service"}
              service={editingService}
              onCancel={() => setIsSheetOpen(false)}
              onSaved={handleSaved}
            />
          </SheetContent>
        </Sheet>
      </div>

      {error && (
        <p className="mb-4 rounded-2xl bg-red-50 px-5 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="space-y-4">
        {services.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center text-sm text-[#7A6F69]">
            No services yet. Add the first service to display it on the landing
            page.
          </div>
        ) : (
          services.map((service, index) => (
            <div
              key={service.id}
              className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F5F0D6]">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-xl font-bold text-[#9C7D00]">
                        {service.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="font-mono text-[11px] text-[#7A6F69]">
                      SERVICE {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-semibold text-[#2C2C2C]">
                      {service.name}
                    </h3>
                    <p className="mt-1 max-w-3xl text-sm leading-relaxed text-[#7A6F69]">
                      {service.description || "No description added."}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => openEditService(service)}
                    className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-[#7A6F69] transition-colors hover:bg-gray-50 hover:text-[#2C2C2C]"
                    aria-label={`Edit ${service.name}`}
                  >
                    <Pencil size={15} />
                  </button>

                  <AlertDialog>
                    <AlertDialogTrigger
                      className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-[#7A6F69] transition-colors hover:border-red-100 hover:bg-red-50 hover:text-red-500"
                      aria-label={`Delete ${service.name}`}
                    >
                      <Trash2 size={15} />
                    </AlertDialogTrigger>
                    <AlertDialogPopup>
                      <div className="p-7">
                        <h3 className="font-mono text-lg font-semibold text-[#2C2C2C]">
                          Delete Service
                        </h3>
                        <p className="mt-2 text-sm text-[#6A6A6A]">
                          Delete <strong>{service.name}</strong>? It will also be
                          removed from the landing page.
                        </p>
                        <div className="mt-7 flex justify-end gap-3">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(service)}
                            disabled={deletingId === service.id}
                            className="gap-2 bg-red-500 text-white hover:bg-red-600"
                          >
                            {deletingId === service.id && (
                              <Loader2 size={15} className="animate-spin" />
                            )}
                            Delete
                          </AlertDialogAction>
                        </div>
                      </div>
                    </AlertDialogPopup>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ServiceForm({
  service,
  onCancel,
  onSaved,
}: {
  service: ServiceItem | null;
  onCancel: () => void;
  onSaved: (service: ServiceItem) => void;
}) {
  const [name, setName] = useState(service?.name ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [image, setImage] = useState(service?.image ?? null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Service name is required.");
      return;
    }

    setIsSaving(true);

    try {
      const input = { name, description, image };
      const savedService = service
        ? await updateService(service.id, input)
        : await createService(input);
      onSaved(savedService);
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Failed to save service.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <div className="border-b border-gray-100 px-7 py-6">
        <p className="font-mono text-xs uppercase tracking-wider text-gray-400">
          → {service ? "Edit" : "New Entry"}
        </p>
        <SheetTitle className="mt-1 !text-xl">
          {service ? "Edit Service" : "Add Service"}
        </SheetTitle>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-7 py-8">
        <label className="block space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-gray-500">
            Service Name <span className="text-red-400">*</span>
          </span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Client Representation"
            className="w-full rounded-full border border-gray-200 bg-[#F9F9F9] px-5 py-3 font-mono text-sm outline-none transition-colors focus:border-[#E4CC72]"
          />
        </label>

        <label className="block space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-gray-500">
            Description
          </span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            placeholder="Describe this service..."
            className="w-full resize-none rounded-2xl border border-gray-200 bg-[#F9F9F9] px-5 py-3 font-mono text-sm outline-none transition-colors focus:border-[#E4CC72]"
          />
        </label>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-gray-500">
            Service Image
          </span>
          <ImageUploader
            initialImages={image ? [image] : []}
            maxFiles={1}
            onImagesChange={(images) => setImage(images[0] ?? null)}
          />
        </div>

        {error && (
          <p className="rounded-2xl bg-red-50 px-5 py-3 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3 border-t border-gray-100 px-7 py-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="cursor-pointer rounded-full border border-gray-200 px-6 py-3 font-mono text-sm text-[#6A6A6A] disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-[#E4CC72] px-6 py-3 font-mono text-sm font-medium text-[#2C2C2C] disabled:opacity-50"
        >
          {isSaving && <Loader2 size={16} className="animate-spin" />}
          {service ? "Save Changes" : "Add Service"}
        </button>
      </div>
    </form>
  );
}
