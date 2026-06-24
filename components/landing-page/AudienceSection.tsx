import { ArrowUpRight } from "lucide-react";

const audiences = [
  {
    title: "Diaspora Property Owners",
    image: "/images/person-1.png",
  },
  {
    title: "Executives And Professionals",
    image: "/images/person-2.png",
  },
  {
    title: "Real Estate Investors",
    image: "/images/person-3.png",
  },
  {
    title: "Serious Clients With Defined Budgets",
    image: "/images/person-4.png",
  },
];

type TAudience = {
  title: string;
  image: string;
};

function AudienceCard({ item }: { item: TAudience }) {
  return (
    <div className="relative group w-70 h-82.5 rounded-2xl overflow-hidden bg-linear-to-b from-[#4a4a4a] to-[#1a1a1a]">
      {/* image */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* subtle dark overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      {/* content */}
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-[#E6CF7A] text-[20px] leading-tight font-medium">
          {item.title}
        </h3>

        <div className="mt-4 w-full h-0.5 bg-white/80 rounded-full" />
      </div>
    </div>
  );
}

export default function AudienceSection() {
  return (
    <section className="relative min-h-screen bg-[#2B2B2B] overflow-hidden px-8 py-20">
      {/* ===== WATERMARK IMAGE PLACEHOLDER ===== */}
      {/* Replace this with your actual watermark image */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-[0.05]">
        {/* Example if using image */}
        <img src="/images/audience-watermark.png" className="w-175" />
      </div>

      {/* content wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* top section */}
        <div className="flex flex-col items-center">
          {/* badge */}
          <button className="px-8 py-4 rounded-full bg-[#D9C36F] text-[#2B2B2B] flex items-center gap-2 text-sm">
            Expertise
            <ArrowUpRight size={15} />
          </button>

          {/* heading */}
          <div className="mt-8 text-center">
            <h2 className="font-mono text-[54px] leading-none text-white">
              Who Do We
            </h2>

            <h2 className="font-mono text-[54px] leading-none text-[#9B9B9B]">
              Work With?
            </h2>
          </div>
        </div>

        {/* cards */}
        <div className="mt-20 flex flex-wrap justify-center gap-8">
          {audiences.map((item, index) => (
            <AudienceCard key={index} item={item} />
          ))}
        </div>

        {/* bottom text */}
        <div className="mt-20 flex flex-col items-center">
          <h3 className="font-mono text-center text-[56px] text-[#BDBDBD]">
            Serious Projects Begin With Clarity.
          </h3>

          <button className="mt-10 px-10 py-5 rounded-2xl bg-[#D9C36F] text-[#2B2B2B] flex items-center gap-4 text-lg">
            Book a Private Strategy Call
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
