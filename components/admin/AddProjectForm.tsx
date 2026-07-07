"use client";

import { useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { SheetTitle } from "@/components/ui/sheet";
import ImageUploader from "@/components/ui/ImageUploader";

type Project = {
  id: string;
  name: string;
  backgroundImage: string | null;
  images: string[];
  category: string;
  status: "published" | "draft";
  tags: string[];
  description: string;
  cost: string;
  address: string;
  isFeatured: boolean;
};

type AddProjectFormProps = {
  onSuccess: () => void;
  onClose: () => void;
  editProject?: Project | null;
};

export default function AddProjectForm({
  onSuccess,
  onClose,
  editProject,
}: AddProjectFormProps) {
  const [name, setName] = useState(editProject?.name ?? "");
  const [category, setCategory] = useState(editProject?.category ?? "");
  const [status, setStatus] = useState<"published" | "draft">(
    editProject?.status ?? "draft",
  );
  const [images, setImages] = useState<string[]>(editProject?.images ?? []);
  const [description, setDescription] = useState(editProject?.description ?? "");
  const [cost, setCost] = useState(editProject?.cost ?? "");
  const [address, setAddress] = useState(editProject?.address ?? "");
  const [isFeatured, setIsFeatured] = useState(
    editProject?.isFeatured ?? false,
  );
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(editProject?.tags ?? []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!editProject;

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }
    if (!category.trim()) {
      setError("Category is required.");
      return;
    }

    setIsLoading(true);

    try {
      const url = isEditing
        ? `/api/projects/${editProject.id}`
        : "/api/projects";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          category: category.trim(),
          status,
          images,
          tags,
          description: description.trim(),
          cost: cost.trim(),
          address: address.trim(),
          isFeatured,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save project");
      }

      onSuccess();
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
            {isEditing ? "Edit Project" : "Add Project"}
          </SheetTitle>
        </div>
      </div>

      {/* body */}
      <div className="flex-1 space-y-6 overflow-y-auto px-7 py-8">
        {/* Name */}
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-gray-500">
            Project Name <span className="text-red-400">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Kigali Hills Residence"
            className="w-full rounded-full border border-gray-200 bg-[#F9F9F9] px-5 py-3 font-mono text-sm text-[#2C2C2C] outline-none transition-colors placeholder:text-gray-400 focus:border-[#E4CC72]"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-gray-500">
            Category <span className="text-red-400">*</span>
          </label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Residential, Commercial, Luxury"
            className="w-full rounded-full border border-gray-200 bg-[#F9F9F9] px-5 py-3 font-mono text-sm text-[#2C2C2C] outline-none transition-colors placeholder:text-gray-400 focus:border-[#E4CC72]"
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-gray-500">
            Status
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStatus("draft")}
              className={`rounded-full px-5 py-3 font-mono text-sm transition-all ${
                status === "draft"
                  ? "bg-gray-200 text-[#2C2C2C]"
                  : "bg-[#F9F9F9] text-gray-500 hover:bg-gray-100"
              }`}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => setStatus("published")}
              className={`rounded-full px-5 py-3 font-mono text-sm transition-all ${
                status === "published"
                  ? "bg-[#E4CC72] text-[#2C2C2C]"
                  : "bg-[#F9F9F9] text-gray-500 hover:bg-gray-100"
              }`}
            >
              Published
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-gray-500">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the project..."
            rows={4}
            className="w-full resize-none rounded-2xl border border-gray-200 bg-[#F9F9F9] px-5 py-3 font-mono text-sm text-[#2C2C2C] outline-none transition-colors placeholder:text-gray-400 focus:border-[#E4CC72]"
          />
        </div>

        {/* Cost */}
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-gray-500">
            Cost
          </label>
          <input
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="e.g. $1.2M, RWF 50M"
            className="w-full rounded-full border border-gray-200 bg-[#F9F9F9] px-5 py-3 font-mono text-sm text-[#2C2C2C] outline-none transition-colors placeholder:text-gray-400 focus:border-[#E4CC72]"
          />
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-gray-500">
            Address
          </label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. Kigali, Rwanda"
            className="w-full rounded-full border border-gray-200 bg-[#F9F9F9] px-5 py-3 font-mono text-sm text-[#2C2C2C] outline-none transition-colors placeholder:text-gray-400 focus:border-[#E4CC72]"
          />
        </div>

        {/* Featured */}
        <div className="rounded-2xl border border-gray-200 bg-[#F9F9F9] p-4">
          <label className="flex cursor-pointer items-center justify-between gap-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-gray-500">
                Featured Project
              </span>
              <p className="mt-1 font-mono text-xs text-gray-400">
                Show this project as the large feature on the landing gallery.
              </p>
            </div>
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="size-5 accent-[#E4CC72]"
            />
          </label>
        </div>

        {/* Images Upload */}
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-gray-500">
            Project Images
          </label>
          <ImageUploader
            initialImages={images}
            onImagesChange={(urls) => setImages(urls)}
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-gray-500">
            Tags
          </label>
          <div className="flex items-center gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Type a tag and press Enter"
              className="flex-1 rounded-full border border-gray-200 bg-[#F9F9F9] px-5 py-3 font-mono text-sm text-[#2C2C2C] outline-none transition-colors placeholder:text-gray-400 focus:border-[#E4CC72]"
            />
            <button
              type="button"
              onClick={addTag}
              disabled={!tagInput.trim()}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#E4CC72] text-[#2C2C2C] transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Plus size={16} />
            </button>
          </div>

          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 rounded-full bg-[#F5F0D6] px-3 py-1.5 font-mono text-xs text-[#9C7D00]"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="flex size-4 items-center justify-center rounded-full transition-colors hover:bg-[#E4CC72]"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}
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
          className="flex items-center gap-2 rounded-full bg-[#E4CC72] px-6 py-3 font-mono text-sm font-medium text-[#2C2C2C] transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : isEditing ? (
            "Save Changes"
          ) : (
            "Add Project"
          )}
        </button>
      </div>
    </form>
  );
}
