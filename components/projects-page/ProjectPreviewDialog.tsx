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
      <div className="relative max-h-[calc(100dvh-1.5rem)] w-full overflow-y-auto overscroll-contain rounded-[20px] bg-transparent shadow-[0_30px_90px_rgba(0,0,0,0.38)] sm:max-h-[88vh] sm:rounded-[24px]">
        <button
          type="button"
          onClick={closeDialog}
          className="absolute right-3 top-3 z-30 flex size-11 items-center justify-center rounded-full bg-black/45 text-white shadow-lg backdrop-blur-xl transition-colors hover:bg-black/65 sm:right-5 sm:top-5"
          aria-label="Close preview"
        >
          <X size={22} />
        </button>

        <div className="relative">
          <div className="relative h-[34dvh] min-h-52 w-full overflow-hidden sm:h-[40vh] sm:min-h-[260px] md:h-[52vh] md:min-h-[400px]">
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

        <div className="relative bg-gradient-to-b from-white/70 via-[#D7D7D7]/70 to-[#2C2C2C]/90 px-5 pb-5 pt-4 text-white backdrop-blur-xl sm:px-7 md:px-8 md:pb-6">
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
                    className="rounded-full bg-[#2C2C2C]/45 px-4 py-1.5 font-mono text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {hasMultipleImages && (
              <div className="flex w-full shrink-0 items-center justify-between sm:mt-1 sm:w-auto sm:justify-start sm:gap-3 lg:gap-5">
                <button
                  type="button"
                  onClick={previousImage}
                  disabled={currentImage === 0}
                  className="flex size-10 items-center justify-center rounded-full bg-white/35 text-[#2C2C2C] shadow-sm backdrop-blur-md transition-colors hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Previous project image"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  disabled={currentImage === project.images.length - 1}
                  className="flex size-10 items-center justify-center rounded-full bg-white/35 text-[#2C2C2C] shadow-sm backdrop-blur-md transition-colors hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Next project image"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          <p className="mt-6 line-clamp-5 max-h-[calc(1.625em*5)] max-w-[1040px] overflow-hidden font-mono text-sm leading-relaxed text-white/90 md:text-base">
            {project.description}
          </p>
        </div>
      </div>
    </dialog>
  );
}
