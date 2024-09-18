"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImageIcon, SettingsIcon } from "lucide-react";

const images = [
  "/placeholder1.jpeg",
  "/placeholder3.jpeg",
  "/placeholder2.jpeg",
  "/placeholder2.jpeg",
  "/placeholder3.jpeg",
];

export default function Component() {
  const [name, setName] = useState("Bring Your Ideas to Life");
  const [instructions, setInstructions] = useState(
    "In the dim, foreboding world of Naturepunk, an intrepid British adventurer stands among the towering mountains, clad in a mountain climber outfit with a Pop Punk aesthetic and a touch of Nordic flair features a rugged, insulated jacket with bold, graffiti-style patches and safety pins, paired with durable, black cargo pants. She wears sturdy, spiked climbing boots with neon laces and a fur-lined hood to combat the cold. Her accessories includes a studded belt, fingerless gloves, and a beanie adorned with Nordic runes, blending practicality with edgy, rebellious style. (In a marker sketch drawing reminiscent of "
  );
  const [model, setModel] = useState("gpt-4.0-mini");
  const [responseFormat, setResponseFormat] = useState("text");
  const [temperature, setTemperature] = useState(1);
  const [topP, setTopP] = useState(1);
  const [message, setMessage] = useState("");
  const [showImages, setShowImages] = useState(true);
  const [imageCount, setImageCount] = useState("1");

  const renderImages = () => {
    const count = parseInt(imageCount);
    if (count === 5) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:row-span-2">
            <img
              src={images[0]}
              alt="Image 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {images.slice(1, 5).map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Image ${index + 2}`}
                className="w-full h-full object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.slice(0, count).map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
        </div>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", {
      name,
      instructions,
      model,
      responseFormat,
      temperature,
      topP,
      message,
    });
    // Here you would typically send this data to your backend or process it further
  };

  return (
    <div className="flex  bg-white text-black">
      <aside className="w-1/3 p-4 border-r border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Image Generator</h2>
            <SettingsIcon className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="border-gray-300 h-32"
            />
          </div>
          {/* HERE  */}
          <div className="space-y-2">
            {showImages && (
              <div className="space-y-2">
                <Label htmlFor="imageCount">Number of Images</Label>
                <Select value={imageCount} onValueChange={setImageCount}>
                  <SelectTrigger id="imageCount" className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger id="model" className="border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4.0-mini">gpt-4.0-mini</SelectItem>
                <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Tools</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileSearchIcon className="w-5 h-5" />
                  <span>File search</span>
                </div>
                <Button variant="outline" size="sm">
                  + Files
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CodeIcon className="w-5 h-5" />
                  <span>Code interpreter</span>
                </div>
                <Button variant="outline" size="sm">
                  + Files
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <SettingsIcon className="w-5 h-5" />
                  <span>Functions</span>
                </div>
                <Button variant="outline" size="sm">
                  + Functions
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Model Configuration</Label>
            <div className="space-y-2">
              <div className="space-y-2">
                <Label htmlFor="response-format">Response format</Label>
                <Select
                  value={responseFormat}
                  onValueChange={setResponseFormat}
                >
                  <SelectTrigger
                    id="response-format"
                    className="border-gray-300"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">text</SelectItem>
                    <SelectItem value="json">json</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </form>
      </aside>
      <main className="flex-1 p-4">
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">IMAGES OUTPUT</h2>
            <div className="flex items-center space-x-4">
              <BellIcon className="w-5 h-5" />
              <FileIcon className="w-5 h-5" />
              <LogInIcon className="w-5 h-5" />
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4">
            {/* {showImages && (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(parseInt(imageCount))].map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-lg shadow-md p-4"
                  >
                    <div
                      className="bg-gray-200 rounded-lg flex items-center justify-center mb-2"
                      style={{ width: "100%", height: "150px" }}
                    >
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium">Image {index + 1}</p>
                    <p className="text-xs text-gray-500">
                      Description goes here
                    </p>
                  </div>
                ))}
              </div>
            )} */}
            <div className="container mx-auto p-4">
              <div className="mb-4">
                <label
                  htmlFor="imageCount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of Images:
                </label>
                <select
                  id="imageCount"
                  value={imageCount}
                  onChange={(e) => setImageCount(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num.toString()}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              {renderImages()}
            </div>
          </div>
          <footer className="flex items-center p-4 border-t border-gray-200">
            <Input
              type="text"
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border-gray-300"
            />
            <Button variant="outline" size="sm" className="ml-2">
              <PaperclipIcon className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="sm" className="ml-2">
              <SendIcon className="w-5 h-5" />
            </Button>
            <Button variant="default" className="ml-2" onClick={handleSubmit}>
              Run
            </Button>
          </footer>
        </div>
      </main>
    </div>
  );
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function FileSearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
      <path d="m9 18-1.5-1.5" />
      <circle cx="5" cy="14" r="3" />
    </svg>
  );
}

function LogInIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}

function PaperclipIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
