import Image from "next/image";

export const IconSection = () => {
  return (
    <div className="-mt-4 pb-6 flex flex-wrap justify-center items-center gap-10 lg:gap-12">
      <Icon src={"/icons/vercel.png"} title={"Vercel"} alt={"Vercel"} />
      <Icon src={"/icons/next.png"} title={"NextJs"} alt={"NextJs"} />
      <Icon src={"/icons/radix.png"} title={"Radix UI"} alt={"Radix UI"} />
      <Icon src={"/icons/framer.png"} title={"Framer"} alt={"Framer"} />
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
    <div className="flex z-[5] items-center gap-3 text-zinc-300 font-bold">
      <Image src={src} width={50} height={50} alt={alt} />
      {title}
    </div>
  );
};
