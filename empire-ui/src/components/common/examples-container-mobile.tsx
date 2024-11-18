import { MobileComponentCard } from "./component-card-mobile";

export const MobileConntainer = () => {
  return (
    <div className="flex my-4 justify-center items-center px-4 pb-12 sm:hidden">
      <div className="grid grid-cols-1 z-[5] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-start items-center gap-4">
        <MobileComponentCard
          src={"./component.gif"}
          alt={""}
          title="AI Text Summarizer Button"
          component="ai-summarizer-button"
        />
        <MobileComponentCard
          src={"./component.gif"}
          alt={""}
          title="AI Text Summarizer Button"
          component="ai-summarizer-button"
        />
        <MobileComponentCard
          src={"./component.gif"}
          alt={""}
          title="AI Text Summarizer Button"
          component="ai-summarizer-button"
        />
        <MobileComponentCard
          src={"./component.gif"}
          alt={""}
          title="AI Text Summarizer Button"
          component="ai-summarizer-button"
        />
      </div>
    </div>
  );
};
