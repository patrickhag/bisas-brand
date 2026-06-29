import { ProjectHeader } from "@/components/ProjectHeader";
import SeriousProjectsSection from "@/components/SeriousProjectsSection";
import SelectedProjectsSection from "@/components/projects-page/SelectedProjects";
import IntroSection from "@/components/ui/IntroSection";

export default function ServicesPage() {
  return (
    <>
      <IntroSection
        titlePrefix="Selected "
        titleHighlight="Projects"
        paragraphs={[
          "Below are selected projects delivered through professional supervision, client representation,  and disciplined execution.",
        ]}
        ctaLabel="Request a Consultation"
      />
      <ProjectHeader />
      <SelectedProjectsSection />
      <SeriousProjectsSection />
    </>
  );
}
