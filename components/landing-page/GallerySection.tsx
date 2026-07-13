import { ArrowDownRight, MapPin, MoveRight, MoveUpRight } from "lucide-react";
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
      className="group block h-full w-full cursor-pointer rounded-3xl border border-[#A0A0A0] p-1"
    >
      <article className="flex h-full flex-col">
        <div className="shrink-0 overflow-hidden rounded-2xl bg-[#D9D9D9]">
          {image ? (
            <Image
              src={image}
              alt={project.name}
              width={520}
              height={430}
              className="aspect-[1.2/1] w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[1.2/1] items-center justify-center bg-[#F5F0D6]">
              <span className="text-6xl font-bold text-[#E4CC72]/50">
                {project.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="relative mt-3 flex min-h-[124px] flex-1 flex-col rounded-2xl bg-[#CFCFCF] p-4">
          <h3 className="line-clamp-2 pr-12 text-xl font-semibold leading-tight text-[#2B2B2B] sm:text-2xl">
            {project.name}
          </h3>

          <p className="mt-3 flex items-center gap-2 pr-12 text-sm text-[#333]">
            <MapPin size={18} className="shrink-0 text-[#555]" />
            <span className="truncate">{project.address || "Rwanda"}</span>
          </p>

          <span className="absolute right-3 top-3 flex size-10 translate-y-2 items-center justify-center rounded-full bg-[#2D2D2D] text-[#D9C36F] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
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

          <div
            className={`${geistSans.className} text-2xl leading-tight sm:text-[30px] lg:whitespace-nowrap `}
          >
            <h2 className="text-[#353535]">Your Construction</h2>
            <h2 className="text-[#8A8A8A]">Insights Gallery</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[0.95fr_1.25fr]">
          <div className="relative h-90 overflow-hidden rounded-[24px] sm:h-130 sm:rounded-[32px] lg:h-140">
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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
