const processSteps = [
  {
    title: "Initial Inquiry",
    description: "Basic project information and fit assessment.",
    position: "top",
    width: "w-[180px]",
  },
  {
    title: "Pre-Construction Advisory",
    description: "Paid feasibility, budgeting, and planning.",
    position: "bottom",
    width: "w-[340px]",
  },
  {
    title: "Contract & Onboarding",
    description: "Defined scope, reporting structure, and engagement terms.",
    position: "top",
    width: "w-[230px]",
  },
  {
    title: "Execution & Oversight",
    description: "Construction supervision, cost control, and reporting.",
    position: "bottom",
    width: "w-[260px]",
  },
  {
    title: "Project Close-Out",
    description: "Final inspections and documentation.",
    position: "top",
    width: "w-[220px]",
  },
];

function ProcessCard({
  title,
  description,
  width,
}: {
  title: string;
  description: string;
  width: string;
}) {
  return (
    <div className="relative">
      {/* shadow layer */}
      <div className={`absolute -top-3 -left-3 h-full ${width} bg-[#7A7A7A]`} />

      {/* main card */}
      <div className={`relative z-10 ${width} bg-[#2C2C2C] px-6 py-4`}>
        <h3 className="font-mono text-[22px] leading-tight text-white">
          {title}
        </h3>
      </div>

      {/* description */}
      <p className="mt-6 max-w-[280px] font-mono text-[18px] leading-tight text-[#2C2C2C]">
        {description}
      </p>
    </div>
  );
}

export default function ProcessTimelineSection() {
  return (
    <section className="bg-[#F7F7F7] px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* section heading */}
        <div className="mb-20 text-center">
          <h2 className="font-mono text-[42px] text-[#2C2C2C]">
            Part of the <span className="text-[#E4CC72]">Process</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#2C2C2C]">
            A transparent step-by-step workflow showing how we guide projects
            from initial conversation to successful delivery.
          </p>
        </div>

        {/* desktop timeline */}
        <div className="hidden lg:block relative min-h-[500px]">
          {/* connector lines */}
          <div className="absolute left-[210px] top-[70px] h-[2px] w-[180px] bg-[#2C2C2C]" />
          <div className="absolute left-[390px] top-[70px] h-[125px] w-[2px] bg-[#2C2C2C]" />

          <div className="absolute left-[730px] top-[195px] h-[2px] w-[160px] bg-[#2C2C2C]" />
          <div className="absolute left-[890px] top-[70px] h-[125px] w-[2px] bg-[#2C2C2C]" />

          <div className="absolute left-[1120px] top-[70px] h-[2px] w-[180px] bg-[#2C2C2C]" />
          <div className="absolute left-[1300px] top-[70px] h-[125px] w-[2px] bg-[#2C2C2C]" />

          {/* step 1 */}
          <div className="absolute left-0 top-0">
            <ProcessCard {...processSteps[0]} />
          </div>

          {/* step 2 */}
          <div className="absolute left-[270px] top-[125px]">
            <ProcessCard {...processSteps[1]} />
          </div>

          {/* step 3 */}
          <div className="absolute left-[730px] top-0">
            <ProcessCard {...processSteps[2]} />
          </div>

          {/* step 4 */}
          <div className="absolute left-[1080px] top-[125px]">
            <ProcessCard {...processSteps[3]} />
          </div>

          {/* step 5 */}
          <div className="absolute right-0 top-0">
            <ProcessCard {...processSteps[4]} />
          </div>
        </div>

        {/* mobile/tablet */}
        <div className="space-y-10 lg:hidden">
          {processSteps.map((step, index) => (
            <div key={index} className="relative">
              <ProcessCard {...step} />

              {index !== processSteps.length - 1 && (
                <div className="ml-4 mt-6 h-10 w-[2px] bg-[#2C2C2C]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
