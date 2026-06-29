import { ArrowUpRight, MoveRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Luxury Villa Kigali",
    image: "/projects/featured-project-1.png",
    description:
      "Client represented from planning through execution, including contractor coordination, quality control, and progress reporting.",
    tags: ["Kicukiro", "Scope", "Role"],
    large: false,
    reverse: false,
  },
  {
    id: 2,
    title: "Scope Includes",
    image: "/projects/featured-project-2.png",
    description:
      "Client represented from planning through execution, including contractor coordination, quality control, and progress reporting.",
    tags: ["Kicukiro", "Scope", "Role"],
    reverse: true,
    large: false,
  },
  {
    id: 3,
    title: "Private Residence",
    image: "/projects/featured-project-3.png",
    description:
      "Client represented from planning through execution, including contractor coordination, quality control, and progress reporting.",
    tags: ["Kicukiro", "Scope", "Role"],
    reverse: false,
    large: true,
  },
  {
    id: 4,
    title: "Modern Apartment",
    image: "/projects/featured-project-4.png",
    description:
      "Client represented from planning through execution, including contractor coordination, quality control, and progress reporting.",
    tags: ["Kicukiro", "Scope", "Role"],
    reverse: true,
    large: true,
  },
];

type TProject = {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
  reverse: boolean;
  large: boolean;
};

function ProjectCard({ project }: { project: TProject }) {
  return (
    <div
      className={`flex gap-6 ${
        project.reverse ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* image */}
      <div
        className={`overflow-hidden rounded-md ${
          project.large ? "w-[420px] h-[320px]" : "w-[320px] h-[190px]"
        }`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* content */}
      <div className="flex flex-col justify-between max-w-[320px]">
        {/* top */}
        <div>
          <div className="flex items-start justify-between">
            <h3 className="font-mono text-3xl text-[#2C2C2C]">
              {project.title}
            </h3>

            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3A3A3A]">
              <MoveRight size={16} className="text-[#E4CC72]" />
            </button>
          </div>

          {/* tags */}
          <div className="mt-3 flex gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#555] px-3 py-1 text-xs text-[#2C2C2C]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* bottom */}
        <div>
          <p className="mt-6 text-sm leading-relaxed text-[#2C2C2C]">
            {project.description}
          </p>

          <div className="mt-4 h-px bg-[#666]" />
        </div>
      </div>
    </div>
  );
}

export default function SelectedProjectsSection() {
  return (
    <section className="px-6 pt-10 pb-20">
      <div className="mx-auto max-w-7xl">
        {/* PROJECT GRID */}
        <div className="mt-20 grid grid-cols-1 gap-20 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
