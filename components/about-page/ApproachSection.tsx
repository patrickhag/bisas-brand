import { ArrowDownRight } from "lucide-react";
import Image from "next/image";

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
  const isTall = item.tall;

  return (
    <div
      className={`
        flex
        w-full
        flex-col
        justify-between rounded-[28px]
        border border-[#D8D8D8]
        bg-white
        p-5
        ${isTall ? "min-h-[360px] sm:min-h-[430px] lg:col-span-2 xl:col-span-1 xl:min-h-[470px]" : "min-h-[320px] sm:min-h-[360px] xl:mt-6 xl:min-h-[405px]"}
      `}
    >
      <div className="flex flex-1 items-center justify-center">
        <Image
          src={item.image}
          alt=""
          width={300}
          height={230}
          className={`object-contain ${
            isTall ? "h-[215px] w-full" : "h-[190px] w-full"
          }`}
        />
      </div>

      <div>
        <h3 className="text-2xl font-medium leading-tight text-[#2B2B2B] md:text-[30px] xl:text-[32px]">
          {item.title1}
        </h3>

        <h3 className="text-2xl font-medium leading-tight text-[#E4CC72] md:text-[30px] xl:text-[32px]">
          {item.title2}
        </h3>
      </div>
    </div>
  );
}

export default function ApproachSection() {
  return (
    <section className="px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* heading */}
        <div className="mb-14 flex flex-col items-center justify-center gap-5 text-center sm:flex-row sm:gap-8 lg:mb-20">
          <button className="px-8 py-4 font-medium rounded-full bg-[#D9C36F] text-[#2B2B2B] flex items-center gap-2 text-sm cursor-pointer">
            Valus
            <ArrowDownRight size={15} />
          </button>

          <h2 className="font-mono text-[34px] text-[#3E3E3E] sm:text-[42px]">
            Our Approach
          </h2>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[1.1fr_0.95fr_0.95fr_1.1fr] xl:items-center xl:gap-4">
          {values.map((item, index) => (
            <ValueCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
