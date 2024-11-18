import { useState } from "react";

export default function TemplatesPage() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div
          className={`text-5xl font-bold mb-4 transition-all duration-500 ${
            hovered ? "text-red-500 scale-105" : "text-gray-800"
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          🚧 Under Construction 🚧
        </div>
        <p className="text-lg text-gray-600">
          We are working hard to make this page awesome for you!
        </p>
        <div className="mt-6">
          <button
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            onClick={() => alert("Thanks for your patience!")}
          >
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}
