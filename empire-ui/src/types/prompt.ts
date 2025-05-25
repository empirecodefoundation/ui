// Defines the shape of a Prompt object used in the Prompt Editor Component
export interface Prompt {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt?: Date;
  tags?: string[];
}

// Utility function to create a new Prompt with default values
export function createNewPrompt(text: string): Prompt {
  return {
    id: generateUniqueId(),
    text,
    createdAt: new Date(),
    updatedAt: undefined,
    tags: [],
  };
}

// Generates a unique ID (simple example, replace with better logic if needed)
function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 10);
}
