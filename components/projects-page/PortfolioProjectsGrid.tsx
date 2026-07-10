"use client";

import { MoveUpRight, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { PortfolioProject } from "@/app/boraland/portfolio/types";
import { ProjectPreviewDialog } from "@/components/projects-page/ProjectPreviewDialog";

const PROJECTS_PER_PAGE = 4;

const getProjectImage = (project: PortfolioProject) =>
  project.images[0] ?? null;

export function PortfolioProjectsGrid({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const projectIdFromUrl = searchParams.get("project");
  const hasAutoOpenedProject = useRef(false);

  const shouldShowControls = projects.length > PROJECTS_PER_PAGE;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProjects = useMemo(() => {
    if (!normalizedQuery) return projects;

    return projects.filter((project) => {
      const searchableText = [
        project.name,
        project.category,
        project.description,
        project.address,
        project.cost,
        ...project.tags,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [normalizedQuery, projects]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE),
  );
  const pageProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE,
  );

  function handleSearch(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  function openProject(project: PortfolioProject) {
    setSelectedProject(project);
    setDialogOpen(true);
  }

  useEffect(() => {
    if (
      !projectIdFromUrl ||
      projects.length === 0 ||
      hasAutoOpenedProject.current
    ) {
      return;
    }

    const project = projects.find((item) => item.id === projectIdFromUrl);
    if (!project) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setSelectedProject(project);
      setDialogOpen(true);
      hasAutoOpenedProject.current = true;
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [projectIdFromUrl, projects]);

  return (
    <>
      <section className="bg-white px-6 pb-24 pt-10 md:px-12 xl:px-24">
        <div className="mx-auto max-w-[1320px]">
          {shouldShowControls && (
            <div className="mb-14 flex flex-col gap-5 border-y border-[#D8D8D8] py-6 md:flex-row md:items-center md:justify-between">
              <label className="flex w-full items-center gap-3 rounded-full border border-[#D8D8D8] px-5 py-3 md:max-w-md">
                <Search size={18} className="shrink-0 text-[#6A6A6A]" />
                <input
                  value={searchQuery}
                  onChange={(event) => handleSearch(event.target.value)}
                  placeholder="Search projects"
                  className="w-full bg-transparent font-mono text-sm text-[#2C2C2C] outline-none placeholder:text-[#9A9A9A]"
                />
              </label>

              <p className="font-mono text-sm text-[#6A6A6A]">
                Showing {pageProjects.length} of {filteredProjects.length}{" "}
                projects
              </p>
            </div>
          )}

          {projects.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-mono text-lg text-[#6A6A6A]">
                No projects published yet.
              </p>
              <p className="mt-2 font-mono text-sm text-[#999]">
                Check back soon for our latest work.
              </p>
            </div>
          ) : pageProjects.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-mono text-lg text-[#6A6A6A]">
                No projects match your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-14 gap-y-16 lg:grid-cols-2">
              {pageProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onSelect={() => openProject(project)}
                />
              ))}
            </div>
          )}

          {shouldShowControls && totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-3">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`size-11 rounded-full border font-mono text-sm transition ${
                      isActive
                        ? "border-[#2C2C2C] bg-[#2C2C2C] text-[#D9C36F]"
                        : "border-[#D8D8D8] text-[#4D4D4D] hover:border-[#2C2C2C]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

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

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: PortfolioProject;
  index: number;
  onSelect: () => void;
}) {
  const image = getProjectImage(project);
  const isReversed = index % 2 === 1;
  const isLarge = index >= 2;
  const address = project.address || "Rwanda";
  const tags = [project.category, project.cost, ...project.tags].filter(
    Boolean,
  );

  return (
    <article
      onClick={onSelect}
      className={`group grid cursor-pointer overflow-hidden border-b border-[#CFCFCF] bg-white md:grid-cols-2 ${
        isLarge ? "min-h-[440px]" : "min-h-[200px]"
      }`}
    >
      <div
        className={`relative bg-[#F5F0D6] ${
          isLarge ? "min-h-[360px]" : "min-h-[190px]"
        } ${isReversed ? "md:order-2" : ""}`}
      >
        {image ? (
          <Image
            src={image}
            alt={project.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-mono text-7xl font-bold text-[#E4CC72]/40">
              {project.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div
        className={`flex min-h-full flex-col p-4 md:p-5 ${
          isReversed ? "items-end text-right md:order-1" : ""
        }`}
      >
        <div
          className={`flex w-full items-start gap-4 ${
            isReversed ? "justify-end" : "justify-between"
          }`}
        >
          {isReversed && <ProjectArrow />}

          <div>
            <h3
              className={`font-mono font-semibold leading-none text-[#2C2C2C] ${
                isLarge ? "text-3xl" : "text-xl"
              }`}
            >
              {project.name}
            </h3>

            <div
              className={`mt-3 flex flex-wrap gap-2 ${
                isReversed ? "justify-end" : ""
              }`}
            >
              <span
                className={`line-clamp-2 max-w-44 rounded-full border border-[#D8D8D8] bg-white px-3 py-1 font-mono leading-tight text-[#5A5A5A] ${
                  isLarge ? "text-xs" : "text-[11px]"
                }`}
              >
                {address}
              </span>

              {tags.slice(0, 2).map((tag, tagIndex) => (
                <span
                  key={`${tag}-${tagIndex}`}
                  className={`line-clamp-1 rounded-full border border-[#D8D8D8] bg-white px-3 py-1 font-mono text-[#5A5A5A] ${
                    isLarge ? "text-xs" : "text-[11px]"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {!isReversed && <ProjectArrow />}
        </div>

        <p
          dir="ltr"
          className={`mt-auto line-clamp-5 font-mono leading-tight text-[#6A6A6A] ${
            isLarge ? "max-w-[280px] text-base" : "max-w-75 text-xs"
          } ${
            isReversed
              ? "text-right"
              : "text-left"
          }`}
        >
          {project.description ||
            "Client represented from planning through execution, including contractor coordination, quality control, and progress reporting."}
        </p>
      </div>
    </article>
  );
}

function ProjectArrow() {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#2C2C2C] text-[#D9C36F] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
      <MoveUpRight size={16} />
    </span>
  );
}
