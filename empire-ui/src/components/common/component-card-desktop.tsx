interface DesktopComponentCardProps {
  rotateDeg: string;
  translate: string;
  componentGif: string;
  title: string;
  badge?: string;
  badgeColor?: string;
}

export const DesktopComponentCard: React.FC<DesktopComponentCardProps> = ({
  rotateDeg,
  translate,
  componentGif,
  title,
  badge,
  badgeColor,
}) => {
  return (
    <div
      className="z-[5] relative w-[20.822vh] h-[27.6vw] flex justify-center items-center"
      style={{ transform: `rotate(${rotateDeg}) translate(${translate})` }}
    >
      <div
        className="card-outer absolute overflow-hidden bg-cover bg-center border border-[#f3edd896] rounded-[4px] w-[20.833vw] h-[27.6vw]"
        style={{
          backgroundImage: "url('/card-outer1.webp')",
        }}
      ></div>
      <div className="image-border bg-[#f3edd882] w-[19.7vw] h-[26.7vw] absolute overflow-hidden"></div>
      <div
        className={`absolute bg-cover bg-center overflow-hidden w-[19.5vw] h-[26.5vw]`}
        style={{ backgroundImage: componentGif }}
      >
        <canvas
          className="w-[327px] h-[426px] absolute top-0 left-0 inline-block"
          role="image"
        ></canvas>
      </div>
      
      {badge && (
        <div className={`absolute top-3 right-3 ${badgeColor || 'bg-blue-500'} text-white text-xs font-bold px-2 py-1 rounded-sm z-10`}>
          {badge}
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-10">
        <div className="opacity-[.95] text-[1.2vw] text-[#f3edd8] font-semibold">
          {title}
        </div>
      </div>
    </div>
  );
};
