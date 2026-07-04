"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

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
  const [currentImage, setCurrentImage] = useState(0);

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[96vw] max-w-[1500px] border-none bg-transparent p-0 shadow-none">
        <div className="relative w-full overflow-hidden rounded-[32px] bg-[#2C2C2C]">
          <div className="relative h-[85vh] min-h-[700px] w-full">
            <Image
              src={project.images[currentImage]}
              alt={project.title}
              fill
              className="object-cover"
            />

            {/* overlay */}
            <div className="absolute inset-x-0 bottom-0 h-[280px] bg-gradient-to-t from-[#2C2C2C] via-[#2C2C2C]/70 to-transparent backdrop-blur-md" />

            {/* content */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-10">
              <h2 className="font-mono text-5xl font-semibold text-white">
                {project.title}
              </h2>

              <div className="mt-4 flex gap-3">
                {project.tags.map((tag) => (
                  <div
                    key={tag}
                    className="rounded-full border border-white/30 px-4 py-1 text-sm text-white"
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <div className="absolute right-10 top-8 flex gap-3">
                <button
                  onClick={previousImage}
                  disabled={currentImage === 0}
                  className="rounded-full border border-white/40 bg-black/20 p-3 text-white disabled:opacity-30"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={nextImage}
                  disabled={currentImage === project.images.length - 1}
                  className="rounded-full border border-white/40 bg-black/20 p-3 text-white disabled:opacity-30"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <p className="mt-8 max-w-4xl text-base leading-relaxed text-gray-200">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
