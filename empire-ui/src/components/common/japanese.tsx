"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Glow, GlowCapture } from "@codaworks/react-glow";

const japaneseCharacters =
  "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

export default function JapaneseCharacter() {
  const [characters, setCharacters] = useState("");

  useEffect(() => {
    // Generate a long string of random Japanese characters
    const randomChars = Array.from(
      { length: 100 },
      () =>
        japaneseCharacters[
          Math.floor(Math.random() * japaneseCharacters.length)
        ]
    ).join(" ");
    setCharacters(randomChars);
  }, []);

  return (
    <GlowCapture className=" overflow-hidden">
      <Glow color="purple">
        <div className="overflow-hidden bg-black text-white flex items-center glow:bg-purple-600">
          <motion.div
            className="text-4xl whitespace-nowrap"
            animate={{
              x: [0, -1000],
              transition: {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              },
            }}
          >
            {characters.repeat(10)}
          </motion.div>
        </div>
      </Glow>
    </GlowCapture>
  );
}
