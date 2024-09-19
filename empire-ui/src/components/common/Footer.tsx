import { Button } from "@/components/ui/button";
import { LifeBuoy } from "lucide-react";
import { Icons } from "./icons";
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t z-50 shadow-xl bg-zinc-950 px-6">
      <ScrollArea className="max-w-full overflow-x-auto whitespace-nowrap">
        <div className="mx-auto flex justify-start items-center gap-5 md:gap-7 py-1">
          <div className="text-lg text-zinc-400 whitespace-nowrap font-semibold">
            &copy; EmpireUI {new Date().getFullYear()}
          </div>
          <div className="flex justify-between gap-5 w-full items-center">
            <div className="flex space-x-5 whitespace-nowrap">
              <Button
                variant="link"
                size={"default"}
                className="text-blue-300 hover:text-gray-300 p-0 text-xs"
              >
                Creators
              </Button>
              <Button
                variant="link"
                size={"default"}
                className="text-white hover:text-gray-300 p-0 text-xs"
              >
                Terms of Service
              </Button>
              <Button
                variant="link"
                size={"default"}
                className="text-white hover:text-gray-300 p-0 text-xs"
              >
                Privacy
              </Button>
              <Button
                variant="link"
                size={"default"}
                className="text-white hover:text-gray-300 p-0 text-xs"
              >
                Safety
              </Button>
              <Button
                variant="link"
                size={"default"}
                className="text-white hover:text-gray-300 p-0 text-xs"
              >
                API
              </Button>
              <Button
                variant="link"
                size={"default"}
                className="text-white hover:text-gray-300 p-0 text-xs"
              >
                Wiki
              </Button>
              <Button
                variant="link"
                size={"default"}
                className="text-white hover:text-gray-300 p-0 text-xs"
              >
                Education
              </Button>

              <Button
                variant="link"
                size={"default"}
                className="text-white hover:text-gray-300 p-0 text-xs font-bold"
              >
                <DiscordLogoIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="link"
                size={"default"}
                className="text-white hover:text-gray-300 p-0 text-xs font-bold"
              >
                <GitHubLogoIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="link"
                size={"default"}
                className="text-white hover:text-gray-300 p-0 text-xs font-bold"
              >
                <InstagramLogoIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="link"
                size={"default"}
                className="text-white hover:text-gray-300 p-0 text-xs font-bold"
              >
                <Icons.twitter className="h-4 w-4 fill-current" />
              </Button>
            </div>

            <div className="flex">
              <Button
                variant={"ghost"}
                className="flex rounded-[3px] px-2 h-7 bg-yellow-300/20 items-center gap-1 hover:bg-yellow-300/25"
              >
                <LifeBuoy className="h-4 w-4" />
                <span className="text-xs">Support</span>
              </Button>
            </div>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </footer>
  );
}
