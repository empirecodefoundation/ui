import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { MoreHorizontal, Link2 } from "lucide-react";
import image from "next/image";
import Link from "next/link";

export default function LandingCard2() {
  return (
    // <Card className="w-80  bg-black overflow-hidden !p-0 border-black ">
    //   <h1 className="absolute text-black  bottom-3 left-3">Component Title</h1>
    //   <CardContent className="!p-0">
    //     <div className="aspect-video w-full overflow-hidden rounded-3xl !p-0">
    //       <img
    //         src="/pc1.gif"
    //         alt="Animated space GIF"
    //         className="w-80 !h-80 object-cover"
    //       />
    //     </div>
    //     <h1 className="relative top-0">Elmlemd</h1>
    //   </CardContent>
    // </Card>
    <Link href="/">
      <Card className="bg-zinc-800 border-zinc-800 overflow-hidden rounded-sm">
        <CardContent className="p-0 relative">
          <img
            src="/pc1.gif"
            alt="Animated space GIF"
            className="w-full h-80 object-cover"
          />
        </CardContent>
        <CardFooter className="flex max-h-16 flex-col pt-2">
          <div className="flex justify-between items-center w-full ml-7 mb-1">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold text-white">Author</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 pb-2 text-base text-zinc-200">
            <span className="flex items-center">👍 54</span>
            <span className="flex items-center">❤️ 10</span>
            <span className="flex items-center">👁️ 1000</span>
            <span className="flex items-center">🍪 5</span>
            <span className="flex items-center">🏆 2</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
