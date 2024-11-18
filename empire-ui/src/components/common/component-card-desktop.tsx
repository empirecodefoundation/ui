interface DesktopComponentCardProps {
  rotateDeg: string;
  translate: string;
  componentGif: string;
  title: string;
}

export const DesktopComponentCard: React.FC<DesktopComponentCardProps> = ({
  rotateDeg,
  translate,
  componentGif,
  title,
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
        className={`absolute bg-cover bg-center bg-[url('/component.gif')] overflow-hidden w-[19.5vw] h-[26.5vw]`}
      >
        <canvas
          className="w-[327px] h-[426px] absolute top-0 left-0 inline-block"
          role="image"
        ></canvas>
      </div>
      <div className="opacity-[.81] text-[.764vw] w-[20rem] absolute inset-y-[-1.597vw] text-[#f3edd8] uppercase">
        <span>{title}</span>
      </div>
    </div>
  );
};
