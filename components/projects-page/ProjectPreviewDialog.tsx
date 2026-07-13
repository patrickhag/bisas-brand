"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { geistSans } from "@/lib/utils";

type Project = {
  title: string;
  tags: string[];
  description: string;
  images: string[];
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
}

export function ProjectPreviewDialog({ open, onOpenChange, project }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const hasMultipleImages = project.images.length > 1;
  const activeImageIndex = Math.max(
    0,
    Math.min(currentImage, project.images.length - 1),
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function closeDialog() {
    setCurrentImage(0);
    onOpenChange(false);
  }

  function nextImage() {
    if (currentImage < project.images.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  }

  function previousImage() {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-preview-title"
      className="fixed left-1/2 top-1/2 z-50 m-0 w-[calc(100vw-1.5rem)] max-w-[1280px] -translate-x-1/2 -translate-y-1/2 overflow-visible border-none bg-transparent p-0 text-left shadow-none outline-none backdrop:bg-black/70 backdrop:backdrop-blur-sm sm:w-[90vw]"
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeDialog();
        }
      }}
    >
      <div className="relative max-h-[calc(100dvh-1.5rem)] w-full overflow-y-auto overscroll-contain rounded-[20px] border border-[#D8D8D8] bg-white shadow-2xl sm:max-h-[88vh] sm:rounded-[24px]">
        <button
          type="button"
          onClick={closeDialog}
          className="absolute right-3 top-3 z-30 flex size-11 items-center justify-center rounded-lg bg-[#2C2C2C] text-white transition-colors hover:bg-black sm:right-5 sm:top-5"
          aria-label="Close preview"
        >
          <X size={22} />
        </button>

        <div className="relative p-4 pb-0 sm:p-5 sm:pb-0">
          <div className="relative h-[34dvh] min-h-52 w-full overflow-hidden rounded-sm sm:h-[40vh] sm:min-h-[260px] md:h-[52vh] md:min-h-[400px]">
            {project.images[activeImageIndex] && (
              <Image
                src={project.images[activeImageIndex]}
                alt={project.title}
                fill
                priority
                sizes="90vw"
                className="object-cover"
              />
            )}
          </div>
        </div>

        <div className="relative bg-gradient-to-b from-white via-[#D7D7D7] to-[#2C2C2C] px-5 pb-5 pt-4 text-white sm:px-7 md:px-8 md:pb-6">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:justify-between">
            <div className="min-w-0">
              <h2
                id="project-preview-title"
                className={`font-mono text-3xl font-semibold leading-none text-[#2C2C2C] md:text-4xl lg:text-5xl ${geistSans.className}`}
              >
                {project.title}
              </h2>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {project.tags.map((tag) => (
                  <div
                    key={tag}
                    className="rounded-full border border-black/25 bg-[#2C2C2C]/45 px-4 py-1.5 font-mono text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {hasMultipleImages && (
              <div className="mt-1 flex shrink-0 gap-3">
                <button
                  type="button"
                  onClick={previousImage}
                  disabled={currentImage === 0}
                  className="flex size-10 items-center justify-center rounded-full border border-[#2C2C2C]/50 bg-white/30 text-[#2C2C2C] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Previous project image"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  disabled={currentImage === project.images.length - 1}
                  className="flex size-10 items-center justify-center rounded-full border border-[#2C2C2C]/50 bg-white/30 text-[#2C2C2C] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Next project image"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          <p className="mt-6 max-w-[1040px] font-mono text-sm leading-relaxed text-white/90 md:text-base">
            {project.description}
          </p>
        </div>
      </div>
    </dialog>
  );
}
