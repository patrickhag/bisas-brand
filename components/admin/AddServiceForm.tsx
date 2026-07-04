"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { SheetTitle } from "@/components/ui/sheet";
import ImageUploader from "@/components/ui/ImageUploader";

// ─── Types ──────────────────────────────────────

type Service = {
  id: string;
  name: string;
  image: string | null;
  description: string;
};

type AddServiceFormProps = {
  onSuccess: (data: { name: string; image: string | null; description: string }) => void;
  onClose: () => void;
  editService?: Service | null;
};

// ─── Component ──────────────────────────────────

export default function AddServiceForm({
  onSuccess,
  onClose,
  editService,
}: AddServiceFormProps) {
  const [name, setName] = useState(editService?.name ?? "");
  const [images, setImages] = useState<string[]>(
    editService?.image ? [editService.image] : [],
  );
  const [description, setDescription] = useState(
    editService?.description ?? "",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!editService;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Service name is required.");
      return;
    }
    if (!description.trim()) {
      setError("Description is required.");
      return;
    }

    setIsLoading(true);

    try {
      const url = isEditing
        ? `/api/services/${editService.id}`
        : "/api/services";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          image: images[0] ?? null,
          description: description.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save service");
      }

      const data = await res.json();

      onSuccess({
        name: data.service.name,
        image: data.service.image,
        description: data.service.description,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      {/* header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-7 py-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-gray-400">
            → {isEditing ? "Edit" : "New Entry"}
          </p>
          <SheetTitle className="!text-xl">
            {isEditing ? "Edit Service" : "Add Service"}
          </SheetTitle>
        </div>
      </div>

      {/* body */}
      <div className="flex-1 space-y-6 overflow-y-auto px-7 py-8">
        {/* Name */}
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-gray-500">
            Service Name <span className="text-red-400">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Architectural Design, Interior Planning"
            className="w-full rounded-full border border-gray-200 bg-[#F9F9F9] px-5 py-3 font-mono text-sm text-[#2C2C2C] outline-none transition-colors placeholder:text-gray-400 focus:border-[#E4CC72]"
          />
        </div>

        {/* Image */}
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-gray-500">
            Service Image
          </label>
          <ImageUploader
            initialImages={images}
            onImagesChange={(urls) => setImages(urls)}
            maxFiles={1}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-gray-500">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the service..."
            rows={5}
            className="w-full resize-none rounded-2xl border border-gray-200 bg-[#F9F9F9] px-5 py-3 font-mono text-sm text-[#2C2C2C] outline-none transition-colors placeholder:text-gray-400 focus:border-[#E4CC72]"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="rounded-full bg-red-50 px-5 py-3 font-mono text-sm text-red-500">
            {error}
          </p>
        )}
      </div>

      {/* footer */}
      <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-7 py-5">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="cursor-pointer rounded-full border border-gray-200 px-6 py-3 font-mono text-sm text-[#6A6A6A] transition-colors hover:bg-gray-50 disabled:opacity-40"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-[#E4CC72] px-6 py-3 font-mono text-sm font-medium text-[#2C2C2C] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : isEditing ? (
            "Save Changes"
          ) : (
            "Add Service"
          )}
        </button>
      </div>
    </form>
  );
}
