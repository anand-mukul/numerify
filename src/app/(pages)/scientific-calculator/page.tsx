import Link from "next/link";
import Image from "next/image";

export default function ComingSoon() {

  return (
    <div>
      <Image
        src="/images/xera.svg"
        alt="Numerify"
        className="absolute h-96 -top-20 -right-16 lg:right-5 lg:top-10 animate-blob"
        width={150}
        height={150}
      />
      <Image
        src="/images/shapes.svg"
        alt="hero"
        className="absolute w-full left-24 bottom-24 animate-blob2"
        width={150}
        height={150}
      />
      <div className="relative z-10 py-6 space-y-16 lg:space-y-32 text-gray-900 min-h-screen">
        <div className="text-center space-y-10">
          <div className="p-1 text-xl sm:text-3xl md:text-4xl lg:text-5xl space-y-4 font-extrabold text-center">
            <h3 className="leading-tight bg-gradient-to-b from-neutral-50 via-orange-200 to-orange-400 bg-clip-text text-transparent">
              Coming Soon
            </h3>
          </div>
          <h1 className="text-7xl lg:text-9xl font-extrabold">We’r blowing up</h1>
          <p className="text-xl lg:text-2xl tracking-wide mx-10 lg:max-w-xl lg:mx-auto">
            We`re under construction. Check back for an update soon. Stay in
            touch!
          </p>
        </div>
        <div className="flex items-center justify-center">
          <h2 className="h-16 text-2xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 bg-clip-text text-transparent">
            <Link
              href={'https://numerify.online'}>
              Numerify.online
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}