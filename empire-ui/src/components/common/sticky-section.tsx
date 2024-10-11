"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function StickySection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (entry.isIntersecting && !visibleCards.includes(index)) {
            setVisibleCards((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleCards]);

  const cards = [
    { title: "Card 1", content: "Content for card 1" },
    { title: "Card 2", content: "Content for card 2" },
    { title: "Card 3", content: "Content for card 3" },
    { title: "Card 4", content: "Content for card 4" },
  ];

  return (
    <div className="absolute min-h-screen bg-transparent bg-opacity-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div ref={sectionRef} className="relative">
          <div className="sticky top-0 bg-white p-6 rounded-lg shadow-md z-10">
            <h2 className="text-2xl font-bold mb-4">Sticky Section</h2>
            <p className="text-gray-600">
              This text remains in the same location as you scroll. The cards
              will animate in from the bottom as you scroll down the page.
            </p>
          </div>
          <div className="mt-8 space-y-96">
            {cards.map((card, index) => (
              <div
                key={index}
                ref={(el: any) => (cardRefs.current[index] = el)}
                className={`transition-all duration-500 ease-out ${
                  index % 2 === 0 ? "text-left" : "text-right"
                } ${
                  visibleCards.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
                }`}
              >
                <Card
                  className={`w-64 ${index % 2 === 0 ? "ml-0" : "ml-auto"}`}
                >
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.content}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
