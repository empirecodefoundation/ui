import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface MobileComponentCardProps {
  src: string;
  alt: string;
  title: string;
  component: string;
}

export const MobileComponentCard = ({
  src,
  alt,
  title,
  component,
}: MobileComponentCardProps) => {
  return (
    <Link href="/">
      <Card className="relative bg-zinc-800 border-zinc-800 overflow-hidden rounded-sm">
        <CardContent className="p-0 relative">
          <img src={src} alt={alt} className="w-80 h-[26rem] object-fill" />
        </CardContent>

        <div className="absolute bottom-4 left-3 z-10 flex flex-col justify-center gap-1">
          <div className="text-lg font-bold shadow-md">{title}</div>
        </div>
      </Card>
    </Link>
  );
};
