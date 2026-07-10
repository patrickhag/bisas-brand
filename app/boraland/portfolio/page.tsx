import { Suspense } from "react";

import { getPublishedProjects } from "@/app/boraland/portfolio/actions";
import { ProjectHeader } from "@/components/ProjectHeader";
import SeriousProjectsSection from "@/components/SeriousProjectsSection";
import { PortfolioProjectsGrid } from "@/components/projects-page/PortfolioProjectsGrid";
import IntroSection from "@/components/ui/IntroSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Portfolio",
  description:
    "Browse selected Boraland projects delivered through professional supervision, client representation, and disciplined execution.",
  path: "/boraland/portfolio",
});

export default async function PortfolioPage() {
  const projects = await getPublishedProjects();

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
      <Suspense
        fallback={
          <div className="px-6 pb-24 pt-10 md:px-12 xl:px-24">
            <div className="mx-auto h-72 max-w-[1320px] rounded-3xl border border-[#E5E5E5] bg-white/70" />
          </div>
        }
      >
        <PortfolioProjectsGrid projects={projects} />
      </Suspense>
      <SeriousProjectsSection />
    </>
  );
}
