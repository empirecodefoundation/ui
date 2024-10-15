import { DesktopComponentCard } from "./component-card-desktop";

export const DesktopConatainer = () => {
  return (
    <div className="cards w-full mt-[100vh] mb-0 z-[5] hidden sm:block">
      <div className="cards-wrapper relative z-[5] w-full h-full flex flex-col gap-x-[1vh] gap-y-0 items-center justify-start">
        {/* first card */}
        <DesktopComponentCard
          rotateDeg={"4deg"}
          translate={"-32vw"}
          componentGif={"url('/component.gif')"}
          title={"Ai text summarizer button"}
        />
        {/* second image */}
        <DesktopComponentCard
          rotateDeg={"-4deg"}
          translate={"32vw"}
          componentGif={"url('/component.gif')"}
          title={"Ai text summarizer button"}
        />
        {/* third card */}
        <DesktopComponentCard
          rotateDeg={"4deg"}
          translate={"-32vw"}
          componentGif={"url('/component.gif')"}
          title={"Ai text summarizer button"}
        />
        {/* fourth card */}
        <DesktopComponentCard
          rotateDeg={"-4deg"}
          translate={"32vw"}
          componentGif={"url('/component.gif')"}
          title={"Ai text summarizer button"}
        />
      </div>
    </div>
  );
};
