import { getPublishedProjects } from "@/app/boraland/portfolio/actions";
import { ProjectHeader } from "@/components/ProjectHeader";
import SeriousProjectsSection from "@/components/SeriousProjectsSection";
import { PortfolioProjectsGrid } from "@/components/projects-page/PortfolioProjectsGrid";
import IntroSection from "@/components/ui/IntroSection";

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
      <PortfolioProjectsGrid projects={projects} />
      <SeriousProjectsSection />
    </>
  );
}
