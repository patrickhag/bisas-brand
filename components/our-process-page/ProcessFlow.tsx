const steps = [
  {
    title: "Initial Inquiry",
    description: "Basic project information and fit assessment.",
    className: "left-[0px] top-[0px] w-[120px]",
    descriptionClassName: "w-[150px]",
  },
  {
    title: "Pre-Construction Advisory",
    description: "Paid feasibility, budgeting, and planning.",
    className: "left-[182px] top-[82px] w-[232px]",
    descriptionClassName: "w-[210px]",
  },
  {
    title: "Contract & Onboarding",
    description: "Defined scope, reporting structure, and engagement terms.",
    className: "left-[504px] top-[0px] w-[154px]",
    descriptionClassName: "w-[200px]",
  },
  {
    title: "Execution & Oversight",
    description: "Construction supervision, cost control, and reporting.",
    className: "left-[742px] top-[82px] w-[176px]",
    descriptionClassName: "w-[230px]",
  },
  {
    title: "Project Close-Out",
    description: "Final inspections and documentation.",
    className: "left-[980px] top-[0px] w-[154px]",
    descriptionClassName: "w-[190px]",
  },
];

const connectorLines = [
  "left-[120px] top-[34px] h-px w-[69px]",
  "left-[189px] top-[34px] h-[82px] w-px",
  "left-[189px] top-[116px] h-px w-[315px]",
  "left-[658px] top-[34px] h-px w-[161px]",
  "left-[819px] top-[34px] h-[82px] w-px",
  "left-[819px] top-[116px] h-px w-[161px]",
  "left-[918px] top-[116px] h-px w-[132px]",
  "left-[1050px] top-[34px] h-[82px] w-px",
];

const connectorDots = [
  "left-[186px] top-[31px]",
  "left-[501px] top-[113px]",
  "left-[816px] top-[31px]",
  "left-[977px] top-[113px]",
];

function StepLabel({
  title,
  description,
  className,
  descriptionClassName,
}: {
  title: string;
  description: string;
  className: string;
  descriptionClassName: string;
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className="relative">
        <div className="absolute -left-3 -top-3 h-full w-full bg-[#737373]" />
        <div className="relative bg-[#2b2b2b] px-4 py-2.5 text-white">
          <h3 className="font-mono text-[22px] font-medium leading-[0.95] tracking-normal">
            {title}
          </h3>
        </div>
      </div>
      <p
        className={`mt-5 font-mono text-[16px] font-semibold leading-[0.96] tracking-normal text-[#2b2b2b] ${descriptionClassName}`}
      >
        {description}
      </p>
    </div>
  );
}

export default function ProcessFlow() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 md:px-10 xl:px-20">
      <div className="mx-auto max-w-[1134px]">
        <div className="hidden xl:block">
          <div className="relative h-[235px] w-[1134px]">
            {connectorLines.map((className) => (
              <div
                key={className}
                className={`absolute bg-[#5f5f5f] ${className}`}
              />
            ))}
            {connectorDots.map((className) => (
              <div
                key={className}
                className={`absolute size-[7px] bg-[#2b2b2b] ${className}`}
              />
            ))}
            {steps.map((step) => (
              <StepLabel key={step.title} {...step} />
            ))}
          </div>
        </div>

        <div className="space-y-8 xl:hidden">
          {steps.map((step, index) => (
            <div key={step.title} className="relative pl-6">
              {index < steps.length - 1 && (
                <div className="absolute left-[7px] top-9 h-[calc(100%+2rem)] w-px bg-[#5f5f5f]" />
              )}
              <div className="absolute left-1 top-8 size-[7px] bg-[#2b2b2b]" />
              <div className="relative max-w-[360px]">
                <div className="absolute -left-3 -top-3 h-full w-full bg-[#737373]" />
                <div className="relative bg-[#2b2b2b] px-5 py-3 text-white">
                  <h3 className="font-mono text-[26px] font-medium leading-[0.98] tracking-normal">
                    {step.title}
                  </h3>
                </div>
              </div>
              <p className="mt-5 max-w-[340px] font-mono text-[18px] font-semibold leading-tight tracking-normal text-[#2b2b2b]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
