import Link from "next/link"
import Image from "next/image"

import logoImg from "@/images/logo.png"

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#1b1320] px-4 py-16">
      {/* Backdrop: vertical panel stripes + violet glow, consistent with the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(8,2,12,0.5)_0,rgba(8,2,12,0.5)_6.1vw,transparent_6.1vw,transparent_12.6vw)]"
      />
      <div
        aria-hidden
        className="absolute top-[-16rem] left-1/2 h-[32rem] w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[120px]"
      />

      <Link
        href="/"
        className="relative z-20 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Image
          src={logoImg}
          alt="Hireloop"
          width={88}
          height={30}
          priority
          className="h-7 w-auto"
        />
        <span className="sr-only">Hireloop home</span>
      </Link>

      <div className="relative z-20 mt-8 w-full max-w-sm">{children}</div>
    </div>
  )
}
