import Image from "next/image";
import Link from "next/link";
import React from "react";
export const AppLogo = () => (
  <Link
  href={"/"}
  >
  <Image
  src={'/logo.svg'}
  alt="Numerify"
  height={32}
  width={32}
  className="flex justify-center items-center"
  />
  </Link>
);
