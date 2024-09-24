"use client";

import { AISummarizerButton } from "../core/AISummarizerButton";

export const AISummarizerButtonExample = () => {
  return (
    <div className="p-6 content-to-summarize">
      <div className="flex gap-5 flex-auto flex-wrap">
        <div>
          Artificial intelligence (AI) epitomizes the zenith of computational
          ingenuity, characterized by the synthesis of algorithmic structures
          capable of autonomously iterating upon vast multidimensional datasets.
          This process enables the transcendence of traditional symbolic logic,
          embedding within systems the capacity for recursive abstraction,
          inferential reasoning, and the dynamic modulation of predictive models
          through stochastic processes. These systems, leveraging advanced
          neural architectures, manifest a quasi-autonomous cognition that
          rivals, if not surpasses, biological neural networks in their ability
          to extrapolate, generalize, and synthesize novel patterns from
          chaotic, non-linear environments. Moreover, AI's confluence of
          unsupervised learning paradigms and reinforcement-driven optimization
          algorithms precipitates an unparalleled feedback loop of heuristic
          refinement. This phenomenon effectuates an emergent intelligence,
          capable of navigating hyperdimensional solution spaces with a finesse
          that reflects both non-Euclidean geometries and quantum computational
          principles.
        </div>
        <AISummarizerButton textSelector=".content-to-summarize" />
      </div>
    </div>
  );
};
