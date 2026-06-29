import Image from "next/image";

const steps = [
  {
    title: "Initial Inquiry",
    description: "Basic project information and fit assessment.",
  },
  {
    title: "Pre-Construction Advisory",
    description: "Paid feasibility, budgeting, and planning.",
  },
  {
    title: "Contract & Onboarding",
    description: "Defined scope, reporting structure, and engagement terms.",
  },
  {
    title: "Execution & Oversight",
    description: "Construction supervision, cost control, and reporting.",
  },
  {
    title: "Project Close-Out",
    description: "Final inspections and documentation.",
  },
];

// Fixed pixel constants — must match the rendered box height
const BOX_TOP_EVEN = 0; // px from row top for even steps
const BOX_TOP_ODD = 72; // px from row top for odd steps (stagger offset)
const BOX_HEIGHT = 64; // approximate height of the dark label box
const ROW_HEIGHT = 200; // total height of the desktop row

export default function ProcessFlow() {
  return (
    <div className="min-h-screen flex items-center justify-center p-10 relative overflow-hidden">
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-white/60" />
      <div className="w-full max-w-6xl relative z-10">
        {/* ── Desktop layout ── */}
        <div
          className="hidden md:block relative"
          style={{ height: ROW_HEIGHT }}
        >
          {steps.map((step, index) => {
            const isOdd = index % 2 === 1;
            const colW = 100 / steps.length; // % width per column
            const boxTop = isOdd ? BOX_TOP_ODD : BOX_TOP_EVEN;
            const midY = boxTop + BOX_HEIGHT / 2; // vertical centre of this box

            // Connector from RIGHT edge of this box to LEFT edge of next box
            const hasNext = index < steps.length - 1;
            const nextIsOdd = (index + 1) % 2 === 1;
            const nextBoxTop = nextIsOdd ? BOX_TOP_ODD : BOX_TOP_EVEN;
            const nextMidY = nextBoxTop + BOX_HEIGHT / 2;

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${colW * index}%`,
                  width: `${colW}%`,
                  top: 0,
                  height: ROW_HEIGHT,
                }}
              >
                {/* Label box */}
                <div
                  className="absolute"
                  style={{ top: boxTop, left: 0, right: 32 }}
                >
                  <div className="relative inline-block">
                    {/* Shadow */}
                    <div className="absolute top-1.5 left-1.5 w-full h-full bg-gray-500 rounded-sm" />
                    <div className="relative bg-gray-800 text-white font-mono text-sm font-bold px-4 py-3 leading-tight rounded-sm z-10 w-[148px]">
                      {step.title}
                    </div>
                  </div>
                  {/* Description */}
                  <p className="mt-3 font-mono text-xs text-gray-600 leading-snug w-[148px]">
                    {step.description}
                  </p>
                </div>

                {/* SVG connector to next step */}
                {hasNext && (
                  <svg
                    className="absolute overflow-visible pointer-events-none"
                    style={{
                      left: 148 + 6, // right edge of box (148px wide) + small gap
                      top: 0,
                      width: `calc(${colW}% - 148px - 6px)`,
                      height: ROW_HEIGHT,
                    }}
                    preserveAspectRatio="none"
                  >
                    {/* Horizontal then diagonal then horizontal path */}
                    {(() => {
                      // In SVG local coords:
                      // start: (0, midY)  — right edge of current box
                      // end:   (100%, nextMidY) — left edge of next box
                      // We draw a short horizontal stub, a diagonal, and another short stub
                      const y1 = midY;
                      const y2 = nextMidY;
                      return (
                        <>
                          <line
                            x1="0%"
                            y1={y1}
                            x2="100%"
                            y2={y2}
                            stroke="#6B7280"
                            strokeWidth="1.5"
                          />
                          {/* Arrow dot at the end */}
                          <circle cx="100%" cy={y2} r="3" fill="#4B5563" />
                        </>
                      );
                    })()}
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Mobile layout — vertical ── */}
        <div className="flex flex-col gap-6 md:hidden">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="relative inline-block">
                <div className="absolute top-1.5 left-1.5 w-full h-full bg-gray-500 rounded-sm" />
                <div className="relative bg-gray-800 text-white font-mono text-sm font-bold px-4 py-3 leading-tight rounded-sm z-10">
                  {step.title}
                </div>
              </div>
              <p className="mt-2 font-mono text-xs text-gray-600 leading-snug max-w-[220px]">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="flex flex-col items-center ml-6 mt-3">
                  <div className="w-px h-6 bg-gray-400" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
