import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Inbox,
  FileText,
  Send,
  Archive,
  Trash,
  Users,
  ChevronDown,
  Search,
  Clock,
  ArrowLeft,
  ArrowRight,
  MoreVertical,
} from "lucide-react";

export default function ComponentLibrary() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Check out some examples</h1>
        <p className="text-xl text-muted-foreground mb-4">
          Dashboard, cards, authentication. Some examples built using the
          components. Use this as a guide to build your own.
        </p>
        <div className="flex space-x-4">
          <Button>Get Started</Button>
          <Button variant="outline">Components</Button>
        </div>
      </header>

      <Tabs defaultValue="mail" className="mb-8">
        <TabsList>
          <TabsTrigger value="mail">Mail</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="playground">Playground</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary" />
            <span className="font-semibold">Alicia Koch</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="space-y-2">
            <Button variant="secondary" className="w-full justify-start">
              <Inbox className="mr-2 h-4 w-4" />
              Inbox
              <Badge className="ml-auto" variant="secondary">
                128
              </Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Drafts
              <Badge className="ml-auto" variant="secondary">
                9
              </Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Send className="mr-2 h-4 w-4" />
              Sent
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Archive className="mr-2 h-4 w-4" />
              Junk
              <Badge className="ml-auto" variant="secondary">
                23
              </Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Trash className="mr-2 h-4 w-4" />
              Trash
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Social
              <Badge className="ml-auto" variant="secondary">
                972
              </Badge>
            </Button>
          </div>
        </div>
        <div className="col-span-3 border rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Inbox</h2>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Clock className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Input placeholder="Search" />
          </div>
          <ScrollArea className="h-[500px]">
            <div className="p-4 space-y-4">
              <EmailItem
                sender="William Smith"
                subject="Meeting Tomorrow"
                preview="Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd..."
                time="11 months ago"
                tags={["meeting", "work", "important"]}
              />
              <EmailItem
                sender="Alice Johnson"
                subject="Project Update"
                preview="Thank you for the project update. It looks great! I've gone through the details and have a few suggestions for improvement..."
                time="11 months ago"
                tags={["project", "update"]}
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

function EmailItem({ sender, subject, preview, time, tags }) {
  return (
    <div className="border rounded-lg p-4 hover:bg-accent cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{sender}</h3>
        <span className="text-sm text-muted-foreground">{time}</span>
      </div>
      <h4 className="font-medium mb-1">{subject}</h4>
      <p className="text-sm text-muted-foreground mb-2">{preview}</p>
      <div className="flex space-x-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
