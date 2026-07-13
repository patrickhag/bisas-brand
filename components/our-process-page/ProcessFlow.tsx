const steps = [
  {
    title: "Initial Inquiry",
    description: "Basic project information and fit assessment.",
    position: "left-0 top-0",
    width: "w-[clamp(145px,10vw,165px)]",
    descriptionClassName: "",
  },
  {
    title: "Pre-Construction Advisory",
    description: "Paid feasibility, budgeting, and planning.",
    position: "left-[16%] top-[92px]",
    width: "w-[clamp(220px,17vw,285px)]",
    descriptionClassName: "",
  },
  {
    title: "Contract & Onboarding",
    description: "Defined scope, reporting structure, and engagement terms.",
    position: "left-[44%] top-0",
    width: "w-[clamp(185px,12vw,205px)]",
    descriptionClassName: "pl-5",
  },
  {
    title: "Execution & Oversight",
    description: "Construction supervision, cost control, and reporting.",
    position: "left-[65%] top-[92px]",
    width: "w-[clamp(195px,13vw,220px)]",
    descriptionClassName: "",
  },
  {
    title: "Project Close-Out",
    description: "Final inspections and documentation.",
    position: "right-0 top-0",
    width: "w-[clamp(165px,11vw,190px)]",
    descriptionClassName: "pl-5",
  },
] as const;

function StepCard({
  title,
  description,
  width,
  descriptionClassName,
}: Pick<
  (typeof steps)[number],
  "title" | "description" | "width" | "descriptionClassName"
>) {
  return (
    <div className={width}>
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -left-3 -top-3 h-full w-full bg-[#777]"
        />
        <div className="relative bg-[#2c2c2c] px-4 py-2.5 text-white">
          <h3 className="text-[clamp(18px,1.35vw,24px)] font-medium leading-[0.98]">
            {title}
          </h3>
        </div>
      </div>
      <p
        className={`mt-4 max-w-[250px] text-[clamp(14px,0.95vw,17px)] font-medium leading-[1.08] text-[#2c2c2c] ${descriptionClassName}`}
      >
        {description}
      </p>
    </div>
  );
}

function DesktopProcessFlow() {
  return (
    <ol
      aria-label="Our five-step project process"
      className="relative h-[245px] w-full"
    >
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[190px] w-full overflow-visible"
        preserveAspectRatio="none"
        viewBox="0 0 1000 190"
      >
        <path
          d="M 94 32 H 180 V 124 H 440 V 32 H 675 V 124 H 885 V 32 H 1000"
          fill="none"
          stroke="#626262"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        {[
          [180, 32],
          [440, 124],
          [675, 32],
          [885, 124],
        ].map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            x={x - 2.5}
            y={y - 2.5}
            width="5"
            height="5"
            fill="#2c2c2c"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {steps.map((step, index) => (
        <li
          key={step.title}
          aria-label={`Step ${index + 1}: ${step.title}`}
          className={`absolute z-10 ${step.position}`}
        >
          <StepCard {...step} />
        </li>
      ))}
    </ol>
  );
}

function MobileProcessFlow() {
  return (
    <ol
      aria-label="Our five-step project process"
      className="mx-auto max-w-2xl"
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="relative grid grid-cols-[12px_minmax(0,1fr)] gap-4 pb-11 last:pb-0"
        >
          {index < steps.length - 1 && (
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[3px] top-3 w-px bg-[#777]"
            />
          )}

          <div
            aria-hidden="true"
            className="relative z-10 mt-3 size-[7px] bg-[#2c2c2c]"
          />

          <div className="min-w-0 pt-1">
            <div className="relative max-w-lg">
              <div className="absolute -left-2 -top-2 h-full w-full bg-[#777]" />
              <div className="relative bg-[#2c2c2c] px-4 py-3 text-white sm:px-5">
                <h3 className="text-[22px] font-medium leading-none sm:text-[26px]">
                  {step.title}
                </h3>
              </div>
            </div>
            <p
              className={`mt-4 max-w-md text-base font-medium leading-snug text-[#2c2c2c] sm:text-lg ${step.descriptionClassName}`}
            >
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function ProcessFlow() {
  return (
    <section className="overflow-hidden bg-white px-5 py-14 sm:px-8 lg:px-12 min-[1200px]:px-16 min-[1200px]:py-16">
      <div className="mx-auto max-w-375">
        <div className="hidden min-[1200px]:block">
          <DesktopProcessFlow />
        </div>
        <div className="min-[1200px]:hidden">
          <MobileProcessFlow />
        </div>
      </div>
    </section>
  );
}
