
import Link from "next/link"
import Image from "next/image"

import logoImg from "@/images/logo.png"

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative isolate flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-[#100b16] px-4 py-12 sm:py-16">

      {/* Subtle Purple Ambient Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,85,252,0.14),transparent_55%)]"
      />

      {/* Bottom Purple Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[25rem] w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-violet-600/[0.08] blur-[120px]"
      />

      {/* Logo */}
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

      {/* Authentication Content */}
      <div className="relative z-20 mt-8 w-full max-w-xl">
        {children}
      </div>
    </div>
  )
}
