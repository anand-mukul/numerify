import Image from 'next/image';
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";

const LOGOS = [
  { src: "/images/carousel/github.svg", alt: "GitHub Logo" },
  { src: "/images/carousel/next.svg", alt: "Next.js Logo" },
  { src: "/images/carousel/typescript.svg", alt: "TypeScript Logo" },
  { src: "/images/carousel/tailwind.svg", alt: "Tailwind CSS Logo" },
  { src: "/images/carousel/nextui.png", alt: "NextUI Logo" },
  { src: "/images/carousel/vercel.svg", alt: "Vercel Logo" },
  { src: "/images/carousel/python.svg", alt: "Python Logo" },
  { src: "/images/carousel/pythonanywhere.png", alt: "PythonAnywhere Logo" },
  { src: "/images/carousel/shadcnui.png", alt: "ShadCn/ui Logo" },
  { src: "/images/carousel/framermotion.png", alt: "Framer Motion Logo" }
];

const LogoCarousel = () => {
  return (
    <>
      <Marquee className="gap-[3rem] [--duration:10s] motion-reduce:overflow-auto" innerClassName="gap-[3rem] [--gap:3rem] motion-reduce:animate-none motion-reduce:first:hidden" fade={true}>
        <div className="flex flex-wrap justify-evenly items-center w-full gap-6">
          {LOGOS.map((logo, index) => (
            <div key={index} className='blur-[1px] hover:blur-none sepia'>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={100}
                loading="lazy"
                className="text-slate-800 p-4"
              />
            </div>
          ))}
        </div>
      </Marquee>

      <Marquee className="gap-[3rem] [--duration:10s] motion-reduce:overflow-auto" innerClassName="gap-[3rem] [--gap:3rem] motion-reduce:animate-none motion-reduce:first:hidden" fade={true} reverse={true}>
        <div className="flex flex-wrap justify-evenly items-center w-full gap-6">
          {LOGOS.map((logo, index) => (
            <div key={index} className='blur-[1px] hover:blur-none sepia'>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={100}
                loading="lazy"
                className="text-slate-800 p-4"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </>
  );
};

export default LogoCarousel;