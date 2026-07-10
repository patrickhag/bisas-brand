import {
  ArrowDownRight,
  Heart,
  MapPin,
  MoveRight,
  MoveUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getPublishedProjects } from "@/app/boraland/portfolio/actions";
import type { PortfolioProject } from "@/app/boraland/portfolio/types";
import { RedirectButton } from "../RedirectButton";
import { geistSans } from "@/lib/utils";

const getProjectImage = (project: PortfolioProject) =>
  project.images[0] ?? null;

function ProjectCard({ project }: { project: PortfolioProject }) {
  const image = getProjectImage(project);

  return (
    <Link
      href={`/boraland/portfolio?project=${project.id}`}
      aria-label={`View ${project.name} in portfolio`}
      className="group block w-full max-w-[320px] cursor-pointer rounded-3xl border border-[#A0A0A0] p-1"
    >
      <article className="flex flex-col">
        <div className="shrink-0 overflow-hidden rounded-2xl bg-[#D9D9D9]">
          {image ? (
            <Image
              src={image}
              alt={project.name}
              width={320}
              height={230}
              className="aspect-[320/230] w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[320/230] items-center justify-center bg-[#F5F0D6]">
              <span className="text-6xl font-bold text-[#E4CC72]/50">
                {project.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-1 flex-col rounded-2xl bg-[#CFCFCF] p-4">
          <h3 className="line-clamp-2 min-h-14 text-xl font-semibold leading-tight text-[#2B2B2B] sm:text-2xl">
            {project.name}
          </h3>

          <div className="mt-3 inline-block w-fit max-w-full truncate rounded-full border border-[#555] px-3 py-1 text-sm">
            {project.cost || project.category}
          </div>

          <p className="mt-auto flex items-center gap-2 pt-3 text-sm text-[#333]">
            <MapPin size={18} className="shrink-0 text-[#555]" />
            <span className="truncate">{project.address || "Rwanda"}</span>
          </p>
        </div>

        <div className="mt-4 flex w-full shrink-0 items-center justify-between rounded-full bg-[#D9C36F] px-4 py-3">
          <span className="flex size-10 items-center justify-center rounded-full border border-[#444]">
            <Heart size={15} />
          </span>
          <span className="flex size-10 items-center justify-center rounded-full bg-[#2D2D2D] text-[#D9C36F] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
            <MoveUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </article>
    </Link>
  );
}

export default async function GallerySection() {
  const projects = await getPublishedProjects();

  const featuredProject =
    projects.find((project) => project.isFeatured) ?? projects[0] ?? null;
  const nextProject = featuredProject
    ? projects.find((project) => project.id !== featuredProject.id)
    : null;
  const cardProjects: PortfolioProject[] = featuredProject
    ? nextProject
      ? [featuredProject, nextProject]
      : [featuredProject]
    : [];
  const featuredImage = featuredProject
    ? getProjectImage(featuredProject)
    : null;

  return (
    <section className="min-h-screen bg-[#f4f4f4] px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col items-center justify-center gap-6 text-center md:flex-row md:items-start md:gap-10 md:text-left lg:mb-20">
          <RedirectButton text="Experience" IconType={ArrowDownRight} />

          <div className={geistSans.className}>
            <h2 className="font-mono text-[36px] leading-none text-[#353535] sm:text-[52px]">
              Your Construction
            </h2>
            <h2 className="font-mono text-[36px] leading-none text-[#353535] sm:text-[52px]">
              Insights Gallery
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1.3fr_1fr]">
          <div className="relative h-[360px] overflow-hidden rounded-[24px] sm:h-[520px] sm:rounded-[32px] lg:h-140">
            {featuredProject && featuredImage ? (
              <Image
                src={featuredImage}
                alt={featuredProject.name}
                fill
                priority
                sizes="(min-width: 1280px) 55vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-[#D9D9D9]">
                <p className="text-[#4D4D4D]">No published projects yet.</p>
              </div>
            )}

            <span className="absolute left-[18%] top-[18%] size-3 rounded-full bg-[#D9C36F] sm:size-4" />
            <span className="absolute right-[18%] top-[32%] size-3 rounded-full bg-[#D9C36F] sm:size-4" />
            <span className="absolute left-[12%] top-[48%] size-3 rounded-full bg-[#D9C36F] sm:size-4" />
            <span className="absolute bottom-[28%] left-1/2 size-3 rounded-full bg-[#D9C36F] sm:size-4" />
            <span className="absolute bottom-[45%] right-[12%] size-3 rounded-full bg-[#D9C36F] sm:size-4" />
          </div>

          <div>
            <div className="mb-8 flex items-center justify-between gap-4 border-y border-[#6A6A6A] py-6 sm:py-10">
              <p className="text-base text-[#4D4D4D] sm:text-lg">
                Showing {cardProjects.length} Projects
              </p>

              <Link
                href="/boraland/portfolio"
                className="group inline-flex items-center gap-3 text-[#4D4D4D]"
              >
                <span className="relative inline-flex items-center">
                  See All
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#2F2F2F] transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
                </span>
                <MoveRight className="text-[#2F2F2F] transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
              </Link>
            </div>

            {cardProjects.length > 0 ? (
              <div className="flex flex-col items-center gap-6 lg:flex-row xl:items-start">
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
