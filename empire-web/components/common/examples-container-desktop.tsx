import { DesktopComponentCard } from "./component-card-desktop";

export const DesktopConatainer = () => {
  return (
    <div className="cards w-full mt-[100vh] mb-0 z-[5] hidden sm:block">
      <div className="cards-wrapper relative z-[5] w-full h-full flex flex-col gap-x-[1vh] gap-y-0 items-center justify-start">
        {/* AI Chatbox */}
        <DesktopComponentCard
          rotateDeg={"4deg"}
          translate={"-32vw"}
          componentGif={"url('/ai-chatbox.gif')"}
          title={"AI Chatbox"}
          badge={"Popular"}
          badgeColor={"bg-orange-500"}
        />

        {/* Aurora Background */}
        <DesktopComponentCard
          rotateDeg={"-4deg"}
          translate={"32vw"}
          componentGif={"url('/aurora-background.gif')"}
          title={"Aurora Background"}
          badge={"Featured"}
          badgeColor={"bg-purple-500"}
        />

        {/* AI Paraphraser Button */}
        <DesktopComponentCard
          rotateDeg={"4deg"}
          translate={"-32vw"}
          componentGif={"url('/paraphraser.gif')"}
          title={"AI Paraphraser Button"}
          badge={"New"}
          badgeColor={"bg-blue-500"}
        />

        {/* Dataset Overview Card */}
        <DesktopComponentCard
          rotateDeg={"-4deg"}
          translate={"32vw"}
          componentGif={"url('/dataset-card.gif')"}
          title={"Dataset Overview Card"}
          badge={"Analytics"}
          badgeColor={"bg-green-500"}
        />
      </div>

      <div className="cta-section flex justify-center my-16">
        <a
          href="/docs"
          className="bg-[#fd8a46] hover:bg-[#fd7a2e] text-black font-bold py-3 px-8 rounded-sm transition-colors text-lg mx-2"
        >
          Browse All Components
        </a>
        <a
          href="https://github.com/empirecodefoundation/ui"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-transparent border-2 border-[#f3edd8] text-[#f3edd8] font-bold py-3 px-8 rounded-sm hover:bg-[#f3edd81a] transition-colors text-lg mx-2"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};
