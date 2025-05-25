"use client";

import AIDoor from "../core/AIDoor";

export const AiDoorExample = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <p className="text-sm text-muted-foreground max-w-xl">
          The AI Door component simulates a secure, animated entry system that
          unlocks when the user correctly answers a personalized question. Wrong
          answers regenerate a new challenge.
        </p>

        <AIDoor
          userName="Shreyash"
          userContext="I am a fullstack web and ai developer.My best project is semmax. I love animals but scared if they are too close. I love cooking and eating food."
        />
      </div>
    </div>
  );
};
