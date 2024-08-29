import { AIGrammarCheckButton } from "@/components/buttons/AIGrammarCheckButton";
import { AISummarizerButton } from "@/components/buttons/AISummarizerButton";

export default function Component() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">AI Summarizer Demo</h1>
        <p className="mb-4">
          Select some text on this page and click the summarize button to see it
          in action!
        </p>
        <p className="mb-4">
          Some expected behaviors for the switch component can be identified as
          follows, 1. Responds to Tab key presses by focusing on the switch. 2.
          Once focused, pressing enter would toggle the state of the switch. 3.
          In the presence of a screen reader it should announce its current
          state to the user.
        </p>
        <div className="flex space-x-6 p-10">
          <AISummarizerButton />
          <AIGrammarCheckButton />
        </div>
      </main>
    </div>
  );
}
