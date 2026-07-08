"use client";

import {
  ArrowDownRight,
  Heart,
  Loader2,
  MapPin,
  MoveRight,
  MoveUpRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { RedirectButton } from "../RedirectButton";

type TProject = {
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

const getProjectImage = (project: TProject) =>
  project.images[0] || project.backgroundImage;

function ProjectCard({ project }: { project: TProject }) {
  const image = getProjectImage(project);

  return (
    <div className="flex h-107.5 w-[320px] flex-col border border-[#A0A0A0] rounded-3xl p-1">
      {/* Image */}
      <div className="shrink-0 rounded-2xl overflow-hidden bg-[#D9D9D9]">
        {image ? (
          <img
            src={image}
            alt={project.name}
            className="w-full h-57.5 object-cover"
          />
        ) : (
          <div className="flex h-57.5 items-center justify-center bg-[#F5F0D6]">
            <span className="text-6xl font-bold text-[#E4CC72]/50">
              {project.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-3 flex flex-1 flex-col bg-[#CFCFCF] rounded-2xl p-4">
        <h3 className="line-clamp-2 min-h-16 text-2xl font-semibold leading-tight text-[#2B2B2B]">
          {project.name}
        </h3>

        <div className="mt-3 inline-block w-fit max-w-full truncate px-3 py-1 border border-[#555] rounded-full text-sm">
          {project.cost || project.category}
        </div>

        <p className="mt-auto flex items-center gap-2 pt-3 text-sm text-[#333]">
          <MapPin size={18} className="shrink-0 text-[#555]" />
          <span className="truncate">{project.address || "Rwanda"}</span>
        </p>
      </div>

      {/* Bottom CTA */}
      <button className="mt-4 w-full shrink-0 bg-[#D9C36F] rounded-full py-3 px-4 flex justify-between items-center">
        <span className="w-10 h-10 rounded-full border border-[#444] flex items-center justify-center">
          <Heart size={15} />
        </span>
        <span className="w-10 h-10 rounded-full bg-[#2D2D2D] text-[#D9C36F] flex items-center justify-center">
          <MoveUpRight size={15} />
        </span>
      </button>
    </div>
  );
}

export default function GallerySection() {
  const [projects, setProjects] = useState<TProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects/published");
        if (res.ok) {
          const data = await res.json();
          setProjects(data.projects);
        }
      } catch {
        // Keep the gallery quiet if projects cannot load.
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const featuredProject = useMemo(
    () => projects.find((project) => project.isFeatured) ?? projects[0],
    [projects],
  );
  const cardProjects = useMemo(() => {
    if (!featuredProject) return [];

    const nextProject = projects.find(
      (project) => project.id !== featuredProject.id,
    );

    return nextProject ? [featuredProject, nextProject] : [featuredProject];
  }, [featuredProject, projects]);
  const featuredImage = featuredProject
    ? getProjectImage(featuredProject)
    : null;

  return (
    <section className="min-h-screen bg-[#f4f4f4] px-8 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-center items-start gap-10 mb-20">
          <RedirectButton text="Experience" IconType={ArrowDownRight} />

          <div>
            <h2 className="font-mono text-[52px] leading-none text-[#353535]">
              Your Construction
            </h2>
            <h2 className="font-mono text-[52px] leading-none text-[#353535]">
              Insights Gallery
            </h2>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-10">
          {/* Left large feature */}
          <div className="relative rounded-[32px] overflow-hidden h-140">
            {isLoading ? (
              <div className="flex h-full items-center justify-center bg-[#D9D9D9]">
                <div className="flex items-center gap-3 text-[#4D4D4D]">
                  <Loader2 size={22} className="animate-spin" />
                  <span className="text-sm">Loading projects...</span>
                </div>
              </div>
            ) : featuredProject && featuredImage ? (
              <img
                src={featuredImage}
                alt={featuredProject.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-[#D9D9D9]">
                <p className="text-[#4D4D4D]">No published projects yet.</p>
              </div>
            )}

            {/* Decorative dots */}
            <span className="absolute top-24 left-32 w-4 h-4 bg-[#D9C36F] rounded-full" />
            <span className="absolute top-44 right-28 w-4 h-4 bg-[#D9C36F] rounded-full" />
            <span className="absolute top-64 left-20 w-4 h-4 bg-[#D9C36F] rounded-full" />
            <span className="absolute bottom-40 left-1/2 w-4 h-4 bg-[#D9C36F] rounded-full" />
            <span className="absolute bottom-64 right-20 w-4 h-4 bg-[#D9C36F] rounded-full" />
          </div>

          {/* Right section */}
          <div>
            {/* Top line */}
            <div className="flex justify-between items-center mb-8 border-t border-b border-[#6A6A6A] py-10">
              <p className="text-[#4D4D4D] text-lg">
                Showing {cardProjects.length} Projects
              </p>

              <Link
                href="/boraland/portfolio"
                className="group flex items-center gap-3 text-[#4D4D4D]"
              >
                See All
                <MoveRight className="text-[#2F2F2F] group-hover:animate-service-icon-shot group-focus-visible:animate-service-icon-shot" />
              </Link>
            </div>

            {/* Cards */}
            {isLoading ? (
              <div className="flex items-center gap-3 py-12 text-[#4D4D4D]">
                <Loader2 size={20} className="animate-spin" />
                <span className="text-sm">Loading projects...</span>
              </div>
            ) : cardProjects.length > 0 ? (
              <div className="flex flex-col lg:flex-row gap-6">
                {cardProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <p className="py-12 text-[#6A6A6A]">
                Add more published projects to show cards here.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
