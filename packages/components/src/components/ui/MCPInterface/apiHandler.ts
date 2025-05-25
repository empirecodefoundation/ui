import { NextRequest, NextResponse } from "next/server";

/**
 * This handler serves as a bridge between your frontend and the MCP (Model Context Protocol) server.
 * It receives requests from the MCPInterface component and forwards them to the appropriate MCP service.
 *
 * In a real implementation, you would configure this to connect to your actual MCP server.
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, messages } = body;

    // Handle ping action (just checks if the endpoint is alive)
    if (action === "ping") {
      return NextResponse.json({ status: "ok" });
    }

    // Handle message action (normal chat message)
    if (action === "message" && messages) {
      // In a real implementation, this would connect to your MCP server
      // For demo purposes, we return a mock response

      // Extract the last user message
      const lastUserMessage = messages
        .filter((m: any) => m.role === "user")
        .pop();

      if (!lastUserMessage) {
        return NextResponse.json(
          { error: "No user message found" },
          { status: 400 }
        );
      }

      // Create a simple response based on the user message
      const userMessageText = lastUserMessage.content.toLowerCase();

      // Check if the user is asking for a tool
      if (
        userMessageText.includes("tool") ||
        userMessageText.includes("function")
      ) {
        // Demo of a tool call response
        return NextResponse.json({
          toolCall: {
            name: "searchWeb",
            arguments: {
              query: lastUserMessage.content,
              maxResults: 3,
            },
          },
        });
      }

      // Regular response
      return NextResponse.json({
        content: `I received your message: "${lastUserMessage.content}". This is a demo MCP response. In a real implementation, this would connect to your actual MCP server.`,
      });
    }

    // Handle unknown action
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error in MCP API handler:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
