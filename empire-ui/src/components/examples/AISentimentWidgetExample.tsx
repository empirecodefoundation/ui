"use client";

import { AISentimentWidget } from "../core/AISentimentWidget";

export function AISentimentWidgetExample() {
  return (
    <div className="p-6 border rounded-lg bg-white">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Sentiment Analysis Demo</h3>
          <AISentimentWidget 
            inputClassName="border-gray-300 focus:ring-blue-500"
            buttonClassName="bg-blue-600 hover:bg-blue-700"
            resultClassName="mt-4"
          />
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium mb-3">Try these examples:</h4>
          <ul className="space-y-3">
            <li className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => navigator.clipboard.writeText("I'm absolutely thrilled with this product!")}>
              "I'm absolutely thrilled with this product!"
            </li>
            <li className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => navigator.clipboard.writeText("The service was disappointing and slow.")}>
              "The service was disappointing and slow."
            </li>
            <li className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => navigator.clipboard.writeText("We will meet on Wednesday at 2pm.")}>
              "We will meet on Wednesday at 2pm."
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}