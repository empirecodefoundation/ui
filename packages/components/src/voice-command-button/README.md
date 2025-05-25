# VoiceCommandButton

A React component that triggers actions via voice commands using the Web Speech API.

## Installation
- Requires `react`, `typescript`, `tailwindcss`.
- Ensure browser supports Web Speech API (e.g., Chrome).

## Usage
```tsx
import { VoiceCommandButton } from '@empireui/components';

const commands = {
  'start workout': () => alert('Workout started!'),
  'show stats': () => alert('Showing stats!'),
};

function App() {
  return <VoiceCommandButton commands={commands} className="bg-green-500" />;
}