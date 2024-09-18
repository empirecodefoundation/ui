import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Link2, ArrowRight } from "lucide-react";
import { LifeBuoy } from "lucide-react";
import { Icons } from "../site/icons";
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";

export default function Footer() {
  const images = [
    {
      id: 1,
      src: "/pc1.gif",
      alt: "Foggy house on a lake",
      author: "njorthbjorn",
      likes: 905,
      comments: 327,
      views: 93,
      tips: 48,
      awards: 22,
      size: "large",
    },
    {
      id: 2,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-miyAC6qHgw4FK6yjF1bHEmekDpY1QU.png",
      alt: "Pikachu with a soda",
      author: "HaiSenHI",
      likes: 598,
      comments: 225,
      views: 150,
      tips: 36,
      awards: 179,
      size: "medium",
    },
    {
      id: 3,
      src: "/pc2.gif",

      alt: "Ship in a stormy sea",
      author: "Crimson Intellect",
      likes: 221,
      comments: 90,
      views: 4,
      tips: 3,
      awards: 158,
      size: "small",
    },
    {
      id: 4,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-miyAC6qHgw4FK6yjF1bHEmekDpY1QU.png",
      alt: "Fantasy landscape",
      author: "DreamWeaver",
      likes: 1024,
      comments: 156,
      views: 789,
      tips: 42,
      awards: 31,
      size: "wide",
    },
    {
      id: 4,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-miyAC6qHgw4FK6yjF1bHEmekDpY1QU.png",
      alt: "Fantasy landscape",
      author: "DreamWeaver",
      likes: 1024,
      comments: 156,
      views: 789,
      tips: 42,
      awards: 31,
      size: "wide",
    },
    // {
    //   id: 5,
    //   src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-miyAC6qHgw4FK6yjF1bHEmekDpY1QU.png",
    //   alt: "Futuristic cityscape",
    //   author: "NeonDreamer",
    //   likes: 876,
    //   comments: 234,
    //   views: 567,
    //   tips: 89,
    //   awards: 45,
    //   size: "tall",
    // },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-zinc-800 text-white py-2 px-6 text-xs font-bold">
      <div className="container mx-auto flex justify-start items-center gap-10">
        <div className=" text-nowrap text-md">© Empire UI 2024</div>
        <div className="flex justify-between w-full items-center">
          <div className="flex space-x-4 text-sm">
            <Button
              variant="link"
              size="sm"
              className="text-purple-500 hover:text-gray-300 p-0 text-xs font-semibold"
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
            <Button
              variant="link"
              size="sm"
              className="text-white hover:text-gray-300 p-0 text-xs font-bold"
            >
              <DiscordLogoIcon />
            </Button>
            <Button
              variant="link"
              size="sm"
              className="text-white hover:text-gray-300 p-0 text-xs font-bold"
            >
              <GitHubLogoIcon />
            </Button>
            <Button
              variant="link"
              size="sm"
              className="text-white hover:text-gray-300 p-0 text-xs font-bold"
            >
              <InstagramLogoIcon />
            </Button>
            <Button
              variant="link"
              size="sm"
              className="text-white hover:text-gray-300 p-0 text-xs font-bold"
            >
              <Icons.twitter className="h-3 w-3 fill-current" />
            </Button>
          </div>
          <div className="flex ">
            <Button
              variant="outline"
              className="flex justify-between items-center gap-2"
            >
              <LifeBuoy className=" h-5 w-5" />
              <span className="text-xs">Support</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
