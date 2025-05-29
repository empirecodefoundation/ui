// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Code, Settings, Terminal, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MCPInterfaceProps {
  className?: string;
  isOpen?: boolean;
  tools?: MCPTool[];
  endpoint?: string;
  title?: string;
  initialContext?: string;
}

interface MCPTool {
  name: string;
  description: string;
  icon?: React.ReactNode;
}

interface MCPMessage {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  toolCall?: {
    name: string;
    arguments: Record<string, any>;
  };
  toolResult?: string;
}

export const MCPInterface: React.FC<MCPInterfaceProps> = ({
  className,
  isOpen = true,
  tools = [],
  endpoint = "/api/mcp",
  title = "Model Context Protocol Interface",
  initialContext = "You are a helpful assistant that can use tools to perform tasks."
}) => {
  const [messages, setMessages] = useState<MCPMessage[]>([
    { id: "system-1", role: "system", content: initialContext }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "error">("disconnected");

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Check connection on mount
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "ping",
        }),
      });

      if (response.ok) {
        setConnectionStatus("connected");
      } else {
        setConnectionStatus("error");
      }
    } catch (error) {
      console.error("Error connecting to MCP endpoint:", error);
      setConnectionStatus("error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: MCPMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "message",
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Get the response as a stream
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      let receivedResponse = "";
      
      // Process the stream chunks
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Convert the chunk to text
        const chunk = new TextDecoder().decode(value);
        receivedResponse += chunk;
        
        try {
          // Try to parse the accumulated response
          const parsedResponse = JSON.parse(receivedResponse);
          
          // Handle tool calls in the response
          if (parsedResponse.toolCall) {
            const toolCallMessage: MCPMessage = {
              id: `tool-call-${Date.now()}`,
              role: "assistant",
              content: `Calling tool: ${parsedResponse.toolCall.name}`,
              toolCall: parsedResponse.toolCall,
            };
            
            setMessages((prev) => [...prev, toolCallMessage]);
            
            // Simulate tool execution (in a real app, you would actually execute the tool)
            const toolResultMessage: MCPMessage = {
              id: `tool-result-${Date.now()}`,
              role: "tool",
              content: `Result from ${parsedResponse.toolCall.name}`,
              toolResult: JSON.stringify(parsedResponse.toolCall.arguments, null, 2),
            };
            
            setMessages((prev) => [...prev, toolResultMessage]);
          } else if (parsedResponse.content) {
            // Regular assistant message
            const assistantMessage: MCPMessage = {
              id: `assistant-${Date.now()}`,
              role: "assistant",
              content: parsedResponse.content,
            };
            
            setMessages((prev) => [...prev, assistantMessage]);
          }
        } catch (e) {
          // If we can't parse the response yet, continue reading
          continue;
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "system",
          content: `Error: ${error instanceof Error ? error.message : "Failed to send message"}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Render message content with code highlighting for tool calls
  const renderMessageContent = (message: MCPMessage) => {
    if (message.toolCall) {
      return (
        <div className="text-sm">
          <div className="text-blue-500 font-semibold mb-1">
            Tool Call: {message.toolCall.name}
          </div>
          <pre className="bg-gray-800 p-2 rounded-md overflow-x-auto text-gray-300">
            {JSON.stringify(message.toolCall.arguments, null, 2)}
          </pre>
        </div>
      );
    } else if (message.toolResult) {
      return (
        <div className="text-sm">
          <div className="text-green-500 font-semibold mb-1">Tool Result:</div>
          <pre className="bg-gray-800 p-2 rounded-md overflow-x-auto text-gray-300">
            {message.toolResult}
          </pre>
        </div>
      );
    } else {
      return <p className="text-sm">{message.content}</p>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={cn("w-full max-w-2xl", className)}
        >
          <Card className="border border-gray-200 shadow-xl">
            <CardHeader className="bg-black text-white p-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot size={24} className="text-white" />
                <CardTitle className="text-lg">{title}</CardTitle>
              </div>
              <Badge 
                variant={connectionStatus === "connected" ? "success" : "destructive"}
                className={connectionStatus === "connected" ? "bg-green-500" : "bg-red-500"}
              >
                {connectionStatus === "connected" ? "Connected" : "Disconnected"}
              </Badge>
            </CardHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <Bot size={16} />
                  <span>Chat</span>
                </TabsTrigger>
                <TabsTrigger value="tools" className="flex items-center gap-2">
                  <Code size={16} />
                  <span>Tools</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings size={16} />
                  <span>Settings</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="p-0">
                <CardContent className="p-0">
                  <ScrollArea className="h-96 w-full p-4">
                    <div className="flex flex-col space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex",
                            message.role === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "flex items-start gap-2 max-w-[80%]",
                              message.role === "user" ? "flex-row-reverse" : "flex-row"
                            )}
                          >
                            {message.role !== "user" && (
                              <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center">
                                {message.role === "assistant" ? (
                                  <Bot size={16} className="text-white" />
                                ) : message.role === "tool" ? (
                                  <Terminal size={16} className="text-white" />
                                ) : (
                                  <Settings size={16} className="text-white" />
                                )}
                              </div>
                            )}
                            
                            <div
                              className={cn(
                                "p-3 rounded-lg",
                                message.role === "user"
                                  ? "bg-black text-white"
                                  : message.role === "system"
                                  ? "bg-gray-500 text-white"
                                  : message.role === "tool"
                                  ? "bg-blue-100 border border-blue-200 text-blue-900"
                                  : "bg-gray-100 border border-gray-200 text-gray-900"
                              )}
                            >
                              {renderMessageContent(message)}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>
                
                <CardFooter className="p-4 border-t">
                  <form onSubmit={handleSubmit} className="flex w-full gap-2">
                    <Input
                      placeholder={isLoading ? "Please wait..." : "Send a message..."}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isLoading}
                      className="flex-grow"
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      disabled={isLoading || !input.trim()}
                    >
                      <Send size={16} />
                    </Button>
                  </form>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="tools">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Available Tools</h3>
                  
                  {tools.length === 0 ? (
                    <p className="text-gray-500 text-sm">No tools configured</p>
                  ) : (
                    <div className="grid gap-3">
                      {tools.map((tool, index) => (
                        <div key={index} className="p-3 border rounded-lg flex items-start gap-3">
                          <div className="bg-gray-100 p-2 rounded-md">
                            {tool.icon || <Code size={18} />}
                          </div>
                          <div>
                            <h4 className="font-medium">{tool.name}</h4>
                            <p className="text-sm text-gray-500">{tool.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </TabsContent>
              
              <TabsContent value="settings">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">MCP Endpoint</label>
                      <Input 
                        value={endpoint} 
                        disabled 
                        className="font-mono text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium block mb-1">System Context</label>
                      <ScrollArea className="h-32 w-full border rounded-md p-2">
                        <p className="text-sm text-gray-700">{initialContext}</p>
                      </ScrollArea>
                    </div>
                    
                    <div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={checkConnection}
                        className="mb-2"
                      >
                        Check Connection
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          connectionStatus === "connected" ? "bg-green-500" : "bg-red-500"
                        )} />
                        <span className="text-sm">
                          {connectionStatus === "connected" 
                            ? "Connected to MCP endpoint" 
                            : "Failed to connect to MCP endpoint"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 