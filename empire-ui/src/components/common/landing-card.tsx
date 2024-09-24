import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface LandingCardProps {
  src: string;
  alt: string;
  title: string;
}

export const LandingCard = ({ src, alt, title }: LandingCardProps) => {
  return (
    <Link href="/">
      <Card className="relative bg-zinc-800 border-zinc-800 overflow-hidden rounded-sm">
        <CardContent className="p-0 relative">
          <img src={src} alt={alt} className="w-80 h-[26rem] object-fill" />
        </CardContent>

        <div className="absolute bottom-4 left-3 z-10 flex flex-col justify-center gap-1">
          <div className="text-lg font-bold shadow-md">{title}</div>
          <div className=" bg-white/10 rounded-[3px] flex h-fit w-fit px-2 py-1">
            <div className="flex justify-between items-center space-x-2 text-sm font-semibold text-zinc-200">
              <span className="flex items-center">👍 54</span>
              <span className="flex items-center">❤️ 10</span>
              <span className="flex items-center">👁️ 1000</span>
              <span className="flex items-center">🍪 5</span>
              <span className="flex items-center">🏆 2</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
