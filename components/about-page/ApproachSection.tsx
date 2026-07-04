import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    title1: "Professional Oversight",
    title2: "Over Assumptions",
    image: "/images/value-1.png",
    tall: true,
  },
  {
    title1: "Discipline Over",
    title2: "Improvisation",
    image: "/images/value-2.png",
  },
  {
    title1: "Accountability",
    title2: "Over Excuses",
    image: "/images/value-3.png",
  },
  {
    title1: "Clarity Over",
    title2: "Complexity",
    image: "/images/value-4.png",
    tall: true,
  },
];

type TValue = {
  title1: string;
  title2: string;
  image: string;
  tall?: boolean;
};

function ValueCard({ item }: { item: TValue }) {
  return (
    <div
      className={`
        bg-[#F4F4F4]
        rounded-[28px]
        p-6
        flex
        flex-col
        justify-between
        ${item.tall ? "h-107.5" : "h-92.5"}
        w-65
      `}
    >
      <div className="flex justify-center">
        <img src={item.image} alt="" className="h-42.5 object-contain" />
      </div>

      <div>
        <h3 className="text-[28px] leading-tight font-medium text-[#2B2B2B]">
          {item.title1}
        </h3>

        <h3 className="text-[28px] leading-tight font-medium text-[#E4CC72]">
          {item.title2}
        </h3>
      </div>
    </div>
  );
}

export default function ApproachSection() {
  return (
    <section className="px-8 py-20">
      <div className="mx-auto max-w-7xl">
        {/* heading */}
        <div className="mb-20 flex justify-center items-center gap-8">
          <Button variant="secondary">
            VALUES
            <ArrowUpRight
              size={20}
              className="text-[#8B7355] group-hover:animate-bounce-once"
            />
          </Button>

          <h2 className="font-mono text-[42px] text-[#3E3E3E]">Our Approach</h2>
        </div>

        {/* cards */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {values.map((item, index) => (
            <ValueCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
