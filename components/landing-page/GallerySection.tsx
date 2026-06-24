import { ArrowUpRight, Heart, MoveRight, MoveUpRight } from "lucide-react";

const projects = [
  {
    title: "Living Apartment in Kigali",
    price: "$45K",
    location: "73 St, Nyarugenge - Kigali",
    image: "/images/project-2.png",
    size: "40 m²",
    type: "Apartment",
  },
  {
    title: "Living Apartment in Kigali",
    price: "$45K",
    location: "73 St, Nyarugenge - Kigali",
    image: "/images/project-1.png",
    size: "40 m²",
    type: "Apartment",
  },
];

type TProject = {
  title: string;
  price: string;
  location: string;
  image: string;
  size: string;
  type: string;
};

function ProjectCard({ project }: { project: TProject }) {
  return (
    <div className="w-[320px] border border-[#A0A0A0] rounded-3xl p-1">
      {/* Image */}
      <div className="rounded-2xl overflow-hidden bg-[#D9D9D9]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-57.5 object-cover"
        />
      </div>

      {/* Content */}
      <div className="mt-3 bg-[#CFCFCF] rounded-2xl p-4">
        <h3 className="text-2xl font-semibold text-[#2B2B2B]">
          {project.title}
        </h3>

        <div className="mt-3 inline-block px-3 py-1 border border-[#555] rounded-full text-sm">
          {project.price}
        </div>

        <p className="mt-3 text-sm text-[#333] flex items-center gap-2">
          📍 {project.location}
        </p>
      </div>

      {/* Bottom CTA */}
      <button className="mt-4 w-full bg-[#D9C36F] rounded-full py-3 px-4 flex justify-between items-center">
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
  return (
    <section className="min-h-screen bg-[#f4f4f4] px-8 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-center items-start gap-10 mb-20">
          <button className="px-8 py-4 rounded-full bg-[#D9C36F] text-[#2B2B2B] text-sm font-medium flex items-center gap-2">
            Experience
            <ArrowUpRight size={15} />
          </button>

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
            <img
              src="/images/featured-house.png"
              alt="Featured Property"
              className="w-full h-full object-cover"
            />

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
              <p className="text-[#4D4D4D] text-lg">Showing 1456 Projects</p>

              <button className="flex items-center gap-3 text-[#4D4D4D]">
                See All
                <MoveRight className="text-[#2F2F2F]" />
              </button>
            </div>

            {/* Cards */}
            <div className="flex flex-col lg:flex-row gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
