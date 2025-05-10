import { MobileComponentCard } from "./component-card-mobile";

export const MobileConntainer = () => {
  return (
    <div className="flex flex-col my-4 justify-center items-center px-4 pb-12 sm:hidden">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-[#f3edd8] mb-2">Featured Components</h2>
        <p className="text-lg text-[#f3edd8]/80 px-4">Explore our collection of AI-powered components</p>
      </div>
      
      <div className="grid grid-cols-1 z-[5] gap-8">
        <MobileComponentCard
          src={"/ai-chatbox.gif"}
          alt={"AI Chatbox component"}
          title="AI Chatbox"
          component="ai-chatbox"
          badge="Popular"
          badgeColor="bg-orange-500"
        />
        
        <MobileComponentCard
          src={"/aurora-background.gif"}
          alt={"Aurora Background component"}
          title="Aurora Background"
          component="aurora-background"
          badge="Featured"
          badgeColor="bg-purple-500"
        />
        
        <MobileComponentCard
          src={"/paraphraser.gif"}
          alt={"AI Paraphraser Button component"}
          title="AI Paraphraser Button"
          component="ai-paraphraser-button"
          badge="New"
          badgeColor="bg-blue-500"
        />
        
        <MobileComponentCard
          src={"/dataset-card.gif"}
          alt={"Dataset Overview Card component"}
          title="Dataset Overview Card"
          component="dataset-overview-card"
          badge="Analytics"
          badgeColor="bg-green-500"
        />
      </div>
      
      <div className="cta-section flex flex-col sm:flex-row items-center justify-center mt-12 space-y-4 sm:space-y-0 sm:space-x-4">
        <a href="/docs" className="bg-[#fd8a46] hover:bg-[#fd7a2e] text-black font-bold py-3 px-8 w-full text-center sm:w-auto rounded-sm transition-colors text-lg">
          Browse All Components
        </a>
        <a href="https://github.com/empirecodefoundation/ui" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-[#f3edd8] text-[#f3edd8] font-bold py-3 px-8 w-full text-center sm:w-auto rounded-sm hover:bg-[#f3edd81a] transition-colors text-lg">
          View on GitHub
        </a>
      </div>
    </div>
  );
};
