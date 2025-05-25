import React, { useState } from 'react';

interface VoiceCommandButtonProps {
  commands: { [key: string]: () => void };
  className?: string;
}

const VoiceCommandButton: React.FC<VoiceCommandButtonProps> = ({ commands, className }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    return <div className="text-red-500 text-sm">Speech API not supported. Use Chrome.</div>;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript.toLowerCase();
    setTranscript(text);
    setIsListening(false);
    if (commands[text]) {
      commands[text]();
    } else {
      alert(`Command "${text}" not recognized`);
    }
  };
  recognition.onend = () => setIsListening(false);
  recognition.onerror = (event) => {
    setIsListening(false);
    alert(`Error: ${event.error}`);
  };

  const handleClick = () => {
    if (!isListening) {
      setIsListening(true);
      recognition.start();
    } else {
      recognition.stop();
    }
  };

  return (
    <div className="relative">
      <button
        title="Click to start/stop voice input"
        className={`p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center w-12 h-12 ${isListening ? 'animate-pulse' : ''} ${className}`}
        onClick={handleClick}
      >
        {isListening ? '🎙️' : '🎤'}
      </button>
      {transcript && (
        <div className="mt-2 text-sm text-gray-600">Last command: {transcript}</div>
      )}
    </div>
  );
};

export default VoiceCommandButton;