import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function LandingCard2() {
  return (
    <Link href="/">
      <Card className="relative bg-zinc-800 border-zinc-800 overflow-hidden rounded-sm">
        <CardContent className="p-0 relative">
          <img
            src="/one.gif"
            alt="Animated space GIF"
            className="w-80 h-[26rem] object-fill"
          />
        </CardContent>
        <div className="absolute bottom-2 left-1 bg-white/20 rounded-md flex h-fit w-fit px-2 py-0.5">
          <div className="flex justify-between items-center space-x-2 text-sm font-semibold text-zinc-200">
            <span className="flex items-center">👍54</span>
            <span className="flex items-center">❤️10</span>
            <span className="flex items-center">👁️1000</span>
            <span className="flex items-center">🍪5</span>
            <span className="flex items-center">🏆2</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
