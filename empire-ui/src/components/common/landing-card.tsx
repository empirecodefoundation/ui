import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Link2 } from "lucide-react";

export default function LandingCard() {
  const images = [
    {
      id: 1,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-miyAC6qHgw4FK6yjF1bHEmekDpY1QU.png",
      alt: "Foggy house on a lake",
      author: "njorthbjorn",
      likes: 905,
      comments: 327,
      views: 93,
      tips: 48,
      awards: 22,
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-zinc-700 text-white py-2 px-6 text-xs font-bold">
      <div className="container mx-auto flex justify-between items-center">
        <div>© Civitai 2024</div>
        <div className="flex space-x-4">
          <Button
            variant="link"
            size="sm"
            className="text-white hover:text-gray-300 p-0 text-xs font-bold"
          >
            Creators
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-white hover:text-gray-300 p-0 text-xs font-bold"
          >
            Terms of Service
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-white hover:text-gray-300 p-0 text-xs font-bold"
          >
            Privacy
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-white hover:text-gray-300 p-0 text-xs font-bold"
          >
            Safety
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-white hover:text-gray-300 p-0 text-xs font-bold"
          >
            Newsroom
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-white hover:text-gray-300 p-0 text-xs font-bold"
          >
            API
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-white hover:text-gray-300 p-0 text-xs font-bold"
          >
            Status
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-white hover:text-gray-300 p-0 text-xs font-bold"
          >
            Wiki
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-white hover:text-gray-300 p-0 text-xs font-bold"
          >
            Education
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-white hover:text-gray-300 p-0 text-xs font-bold"
          >
            Residency
          </Button>
        </div>
        <div className="flex space-x-2">
          {["X", "Instagram", "YouTube", "Twitch", "Reddit", "GitHub"].map(
            (icon) => (
              <Button
                key={icon}
                size="icon"
                variant="ghost"
                className="w-6 h-6 p-0"
              >
                <span className="text-xs">{icon[0]}</span>
              </Button>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
