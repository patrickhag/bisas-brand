"use client";

import { useState, useEffect } from "react";
import { MoveRight, Loader2 } from "lucide-react";
import { ProjectHeader } from "@/components/ProjectHeader";
import SeriousProjectsSection from "@/components/SeriousProjectsSection";
import IntroSection from "@/components/ui/IntroSection";
import { ProjectPreviewDialog } from "@/components/projects-page/ProjectPreviewDialog";

// ─── Types ──────────────────────────────────────

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
};

// ─── Component ──────────────────────────────────

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects/published");
        if (res.ok) {
          const data = await res.json();
          setProjects(data.projects);
        }
      } catch {
        // silently fail
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <IntroSection
        titlePrefix="Selected "
        titleHighlight="Projects"
        paragraphs={[
          "Below are selected projects delivered through professional supervision, client representation, and disciplined execution.",
        ]}
        ctaLabel="Request a Consultation"
      />
      <ProjectHeader />

      {/* ─── Dynamic Projects Grid ─────────────── */}
      <section className="bg-white px-8 pb-24 pt-10">
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <div className="flex items-center gap-3 text-[#6A6A6A]">
                <Loader2 size={22} className="animate-spin" />
                <span className="font-mono text-sm">Loading projects...</span>
              </div>
            </div>
          ) : projects.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-mono text-lg text-[#6A6A6A]">
                No projects published yet.
              </p>
              <p className="mt-2 font-mono text-sm text-[#999]">
                Check back soon for our latest work.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onSelect={() => {
                    setSelectedProject(project);
                    setDialogOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <SeriousProjectsSection />

      {/* ─── Project Preview Dialog ──────────── */}
      {selectedProject && (
        <ProjectPreviewDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          project={{
            title: selectedProject.name,
            tags: selectedProject.tags,
            description: selectedProject.description,
            images: selectedProject.images,
          }}
        />
      )}
    </>
  );
}

// ─── Project Card ───────────────────────────────

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
}) {
  return (
    <div
      className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={onSelect}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-[#F5F0D6]">
        {project.images.length > 0 ? (
          <img
            src={project.images[0] ?? null}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : project.backgroundImage ? (
          <img
            src={project.backgroundImage}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-mono text-6xl font-bold text-[#E4CC72]/40">
              {project.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Category badge */}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-xs font-medium text-[#2C2C2C] backdrop-blur-sm">
          {project.category}
        </span>

        {/* Image count indicator */}
        {project.images.length > 1 && (
          <span className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white backdrop-blur-sm">
            +{project.images.length - 1} more
          </span>
        )}

        {/* Index number (only show if no additional images) */}
        {project.images.length <= 1 && (
          <span className="absolute bottom-4 right-4 font-mono text-2xl font-bold text-white/60 drop-shadow-lg">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="font-mono text-2xl font-semibold text-[#2C2C2C] transition-colors group-hover:text-[#E4CC72]">
            {project.name}
          </h3>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gray-200 bg-[#F9F9F9] px-3 py-1 font-mono text-xs text-[#6A6A6A]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom row */}
        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="font-mono text-xs uppercase tracking-wider text-gray-400">
            View Project
          </span>
          <div className="flex size-10 items-center justify-center rounded-full bg-[#F5F0D6] text-[#8B7355] transition-all duration-300 group-hover:bg-[#E4CC72] group-hover:text-[#2C2C2C]">
            <MoveRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
