import {
  MoveRight,
  FileCheck,
  FilePenLine,
  BadgeDollarSign,
  LucideIcon,
} from "lucide-react";

const cards = [
  {
    number: "01",
    title: "Land",
    highlight: "Ownership",
    icon: FileCheck,
  },
  {
    number: "02",
    title: "Clear",
    highlight: "Budget",
    icon: FilePenLine,
  },
  {
    number: "03",
    title: "Decent",
    highlight: "Design",
    icon: BadgeDollarSign,
  },
];

type TItem = {
  number: string;
  title: string;
  highlight: string;
  icon: LucideIcon;
};

function RequirementCard({ item }: { item: TItem }) {
  const Icon = item.icon;

  return (
    <div className="flex h-[270px] w-full max-w-[275px] flex-col justify-between rounded-[24px] bg-white p-6 sm:h-[300px]">
      {/* top number */}
      <span className="text-[34px] font-light text-[#2B2B2B]">
        {item.number}
      </span>

      {/* center icon */}
      <div className="flex justify-center">
        <Icon size={56} strokeWidth={1.6} className="text-[#E4CC72]" />
      </div>

      {/* bottom title */}
      <div className="text-center text-2xl leading-none sm:text-[28px]">
        <span className="font-medium text-[#2B2B2B]">{item.title}</span>{" "}
        <span className="font-medium text-[#E4CC72]">{item.highlight}</span>
      </div>
    </div>
  );
}

export default function ThirdServiceSection() {
  return (
    <section
      id="design-build"
      className="scroll-mt-24 bg-[#F4F4F4] px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="flex flex-col items-center">
          {/* badge */}
          <div className="mb-8 flex items-center gap-2 rounded-full bg-[#3A3A3A] px-6 py-3 text-sm font-medium text-white">
            <MoveRight size={15} />
            <span>3rd Service</span>
          </div>

          {/* heading */}
          <div className="text-center">
            <h2 className="font-mono text-[36px] leading-none md:text-[56px]">
              <span className="text-[#2C2C2C]">Design &</span>{" "}
              <span className="text-[#E4CC72]">Build</span>
            </h2>

            {/* description */}
            <p className="mx-auto mt-6 max-w-3xl text-[16px] leading-relaxed text-[#2C2C2C]">
              We take on a select number of full-build projects each year. Every
              one requires a clear scope, a real budget, and a client who is
              serious about delivering. If that is you, let us talk.
            </p>
          </div>
        </div>

        {/* cards */}
        <div className="mt-14 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {cards.map((item) => (
            <RequirementCard key={item.number} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
