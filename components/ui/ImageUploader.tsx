"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, Upload, X } from "lucide-react";

// ─── Types ──────────────────────────────────────

type PendingFile = {
  id: string;
  file: File;
  previewUrl: string;
};

type ImageUploaderProps = {
  /** Already-uploaded image URLs (for edit mode) */
  initialImages?: string[];
  /** Called whenever the final list of uploaded URLs changes */
  onImagesChange: (urls: string[]) => void;
  /** Max number of files allowed (default: 20) */
  maxFiles?: number;
  /** Max file size in bytes (default: 10MB) */
  maxFileSize?: number;
  /** Accepted content types */
  accept?: string;
};

// ─── Helpers ────────────────────────────────────

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Component ──────────────────────────────────

export default function ImageUploader({
  initialImages = [],
  onImagesChange,
  maxFiles = 20,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  accept = "image/jpeg,image/png,image/webp,image/gif",
}: ImageUploaderProps) {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>(initialImages);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notify parent when uploaded URLs change
  useEffect(() => {
    onImagesChange(uploadedUrls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedUrls]);

  // ── File selection ────────────────────────────

  const totalImages = uploadedUrls.length + pendingFiles.length;

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError("");

    const newFiles: PendingFile[] = [];

    Array.from(files).forEach((file) => {
      if (totalImages + newFiles.length >= maxFiles) {
        setError(`Maximum ${maxFiles} images allowed.`);
        return;
      }
      if (file.size > maxFileSize) {
        setError(
          `"${file.name}" exceeds ${formatFileSize(maxFileSize)} limit.`,
        );
        return;
      }
      newFiles.push({
        id: generateId(),
        file,
        previewUrl: URL.createObjectURL(file),
      });
    });

    if (newFiles.length > 0) {
      setPendingFiles((prev) => [...prev, ...newFiles]);
    }

    // Reset input so re-selecting the same files works
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ── Remove before upload ──────────────────────

  const removePending = (id: string) => {
    setPendingFiles((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  // ── Remove already-uploaded image ─────────────

  const removeUploaded = (url: string) => {
    setUploadedUrls((prev) => prev.filter((u) => u !== url));
  };

  // ── Upload all pending via server FormData ────

  const handleUploadAll = async () => {
    if (pendingFiles.length === 0) return;

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      pendingFiles.forEach((pf) => {
        formData.append("files", pf.file);
      });

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await res.json();
      const urls: string[] = data.urls;

      setUploadedUrls((prev) => [...prev, ...urls]);

      // Clean up local previews
      pendingFiles.forEach((pf) => URL.revokeObjectURL(pf.previewUrl));
      setPendingFiles([]);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Upload failed: ${err.message}`
          : "Failed to upload images.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  // ── Render ────────────────────────────────────

  return (
    <div className="space-y-3">
      {/* Drop zone / file picker */}
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-[#F9F9F9] px-6 py-8 transition-colors hover:border-[#E4CC72] hover:bg-[#F5F0D6]/30 ${
          isUploading ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <Upload size={20} className="text-[#6A6A6A]" />
        <span className="font-mono text-sm text-[#6A6A6A]">
          {isUploading
            ? "Uploading..."
            : "Click to select images from your computer"}
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple
        onChange={handleFilesSelected}
        className="hidden"
        disabled={isUploading}
      />

      {/* Pending files previews (local, not yet uploaded) */}
      {pendingFiles.length > 0 && (
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-gray-400">
            Selected ({pendingFiles.length})
          </p>
          <div className="grid grid-cols-3 gap-3">
            {pendingFiles.map((pf) => (
              <div
                key={pf.id}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-[#F5F0D6]"
              >
                <img
                  src={pf.previewUrl}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePending(pf.id)}
                  disabled={isUploading}
                  className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500 disabled:opacity-0"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Already-uploaded images */}
      {uploadedUrls.length > 0 && (
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-gray-400">
            Uploaded ({uploadedUrls.length})
          </p>
          <div className="grid grid-cols-3 gap-3">
            {uploadedUrls.map((url) => (
              <div
                key={url}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-[#F5F0D6]"
              >
                <img
                  src={url}
                  alt="Uploaded"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeUploaded(url)}
                  disabled={isUploading}
                  className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500 disabled:opacity-0"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload button */}
      {pendingFiles.length > 0 && (
        <button
          type="button"
          onClick={handleUploadAll}
          disabled={isUploading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E4CC72] px-6 py-3 font-mono text-sm font-medium text-[#2C2C2C] transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          {isUploading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Uploading {pendingFiles.length} image
              {pendingFiles.length > 1 ? "s" : ""}...
            </>
          ) : (
            <>
              <Upload size={16} />
              Upload {pendingFiles.length} image
              {pendingFiles.length > 1 ? "s" : ""}
            </>
          )}
        </button>
      )}

      {/* Error */}
      {error && (
        <p className="rounded-full bg-red-50 px-5 py-3 font-mono text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
