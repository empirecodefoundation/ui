import React, { useState } from "react";
import { AIChatInterface } from "../components/ai/AIChatInterface";
import { AIImageGenerator } from "../components/ai/AIImageGenerator";
import { AICodeAssistant } from "../components/ai/AICodeAssistant";
import { Button } from "../components/base/Button";
import { Card } from "../components/base/Card";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../utils/cn";
import { Message } from "../components/ai/AIChatInterface/types";
import { Settings, Sun, Moon, Save, Load, Image, Code } from "lucide-react";

export const AIDemo: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [savedChats, setSavedChats] = useState<Message[][]>([]);
  const [currentChat, setCurrentChat] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<"chat" | "image" | "code">("chat");

  const handleMessageSent = (message: Message) => {
    console.log("Message sent:", message);
    // Here you can implement additional logic like analytics, logging, etc.
  };

  const handleMessageReceived = (message: Message) => {
    console.log("Message received:", message);
    // Here you can implement additional logic like notifications, etc.
  };

  const handleImageGenerated = (imageUrl: string) => {
    console.log("Image generated:", imageUrl);
  };

  const handleCodeGenerated = (code: string) => {
    console.log("Code generated:", code);
  };

  const saveCurrentChat = () => {
    if (currentChat.length > 0) {
      setSavedChats([...savedChats, currentChat]);
      setCurrentChat([]);
    }
  };

  const loadChat = (chat: Message[]) => {
    setCurrentChat(chat);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">AI Tools Demo</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Tools */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex space-x-2 mb-4">
              <Button
                variant={activeTab === "chat" ? "secondary" : "ghost"}
                onClick={() => setActiveTab("chat")}
                className="flex-1"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat
              </Button>
              <Button
                variant={activeTab === "image" ? "secondary" : "ghost"}
                onClick={() => setActiveTab("image")}
                className="flex-1"
              >
                <Image className="w-5 h-5 mr-2" />
                Image Generator
              </Button>
              <Button
                variant={activeTab === "code" ? "secondary" : "ghost"}
                onClick={() => setActiveTab("code")}
                className="flex-1"
              >
                <Code className="w-5 h-5 mr-2" />
                Code Assistant
              </Button>
            </div>

            {/* Active Tool */}
            {activeTab === "chat" && (
              <AIChatInterface
                initialMessages={currentChat}
                onMessageSent={handleMessageSent}
                onMessageReceived={handleMessageReceived}
                placeholder="Ask me anything..."
                maxMessages={50}
                autoScroll={true}
              />
            )}
            {activeTab === "image" && (
              <AIImageGenerator onImageGenerated={handleImageGenerated} />
            )}
            {activeTab === "code" && (
              <AICodeAssistant onCodeGenerated={handleCodeGenerated} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Settings Panel */}
            {showSettings && (
              <Card className="p-4">
                <h2 className="text-lg font-semibold mb-4">Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Theme
                    </label>
                    <Button
                      variant="outline"
                      onClick={toggleTheme}
                      className="w-full"
                    >
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </Button>
                  </div>
                  {activeTab === "chat" && (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Save Current Chat
                      </label>
                      <Button
                        variant="outline"
                        onClick={saveCurrentChat}
                        className="w-full"
                        disabled={currentChat.length === 0}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Chat
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Saved Chats */}
            {activeTab === "chat" && (
              <Card className="p-4">
                <h2 className="text-lg font-semibold mb-4">Saved Chats</h2>
                <div className="space-y-2">
                  {savedChats.map((chat, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={() => loadChat(chat)}
                      className="w-full justify-start"
                    >
                      <Load className="w-4 h-4 mr-2" />
                      Chat {index + 1} ({chat.length} messages)
                    </Button>
                  ))}
                  {savedChats.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No saved chats yet
                    </p>
                  )}
                </div>
              </Card>
            )}

            {/* Features Card */}
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">Features</h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Real-time chat with AI
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Voice input support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Text-to-speech output
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  AI Image Generation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Code Generation & Explanation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Dark/Light theme
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Chat history saving
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
