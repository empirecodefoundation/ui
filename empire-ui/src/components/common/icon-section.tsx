import Image from "next/image";

export const IconSection = () => {
  return (
    <div className="flex flex-col items-center my-10">
      <h3 className="text-xl font-semibold text-[#f3edd8]/90 mb-6">Powered by Modern Technologies</h3>
      <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-14">
        <Icon src={"/icons/vercel.png"} title={"Vercel"} alt={"Vercel"} />
        <Icon src={"/icons/next.png"} title={"Next.js"} alt={"Next.js"} />
        <Icon src={"/icons/react.png"} title={"React"} alt={"React"} />
        <Icon src={"/icons/radix.png"} title={"Radix UI"} alt={"Radix UI"} />
        <Icon src={"/icons/framer.png"} title={"Framer Motion"} alt={"Framer Motion"} />
        <Icon src={"/icons/tailwind.png"} title={"Tailwind CSS"} alt={"Tailwind CSS"} />
        <Icon src={"/icons/typescript.png"} title={"TypeScript"} alt={"TypeScript"} />
        <Icon src={"/icons/openai.png"} title={"OpenAI"} alt={"OpenAI"} />
      </div>
      <div className="mt-10 px-6 py-3 bg-[#f3edd81a] border border-[#f3edd830] rounded-md max-w-3xl text-center">
        <p className="text-[#f3edd8] font-medium">Empire UI seamlessly integrates with the most powerful AI tools and frameworks in the industry</p>
      </div>
    </div>
  );
};

interface IconProps {
  src: string;
  title: string;
  alt: string;
}

const Icon: React.FC<IconProps> = ({ src, title, alt }) => {
  return (
    <div className="flex z-[5] flex-col items-center text-center">
      <div className="h-12 w-12 mb-2 relative flex items-center justify-center">
        <Image src={src} width={50} height={50} alt={alt} className="object-contain" />
      </div>
      <span className="text-[#f3edd8] text-sm font-medium">{title}</span>
    </div>
  );
};
