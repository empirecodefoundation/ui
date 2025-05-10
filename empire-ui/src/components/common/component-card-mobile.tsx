import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface MobileComponentCardProps {
  src: string;
  alt: string;
  title: string;
  component: string;
  badge?: string;
  badgeColor?: string;
}

export const MobileComponentCard = ({
  src,
  alt,
  title,
  component,
  badge,
  badgeColor,
}: MobileComponentCardProps) => {
  return (
    <Link href={`/docs/${component}`}>
      <Card className="relative bg-zinc-800 border-zinc-800 overflow-hidden rounded-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
        <CardContent className="p-0 relative">
          <img src={src} alt={alt} className="w-full h-[26rem] object-cover" />
          
          {badge && (
            <div className={`absolute top-3 right-3 ${badgeColor || 'bg-blue-500'} text-white text-xs font-bold px-2 py-1 rounded-sm z-10`}>
              {badge}
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="text-xl font-bold text-white shadow-md">{title}</div>
            <div className="text-sm text-white/80 mt-1">Click to view documentation</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
