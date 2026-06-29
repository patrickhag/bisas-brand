import ProcessFlow from "@/components/our-process-page/ProcessFlow";
import { ProjectHeader } from "@/components/ProjectHeader";
import SeriousProjectsSection from "@/components/SeriousProjectsSection";
import IntroSection from "@/components/ui/IntroSection";

export default function ServicesPage() {
  return (
    <>
      <IntroSection
        titlePrefix="Process "
        titleHighlight="Steps"
        paragraphs={[
          "Every project follows the same structured path. You always know what stage you are in, what comes next, and what it will cost. That is not a promise. That is our process.",
        ]}
        ctaLabel="Request for a Service"
      />
      <ProjectHeader />
      <ProcessFlow />
      <SeriousProjectsSection />
    </>
  );
}
