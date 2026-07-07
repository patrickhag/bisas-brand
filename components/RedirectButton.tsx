import { ArrowUpRight, LucideIcon } from "lucide-react";

type RedirectButtonProps = {
  text: string;
  IconType?: LucideIcon;
};

export const RedirectButton = ({
  text,
  IconType = ArrowUpRight,
}: RedirectButtonProps) => {
  return (
    <button className="group px-8 py-4 font-medium rounded-full bg-[#D9C36F] text-[#2B2B2B] flex items-center gap-2 text-sm cursor-pointer">
      {text}
      <IconType size={15} className="group-hover:animate-bounce-once" />
    </button>
  );
};
