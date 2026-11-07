
import Link from "next/link"
import Image from "next/image"
import type { ComponentType, SVGProps } from "react"

import logoImg from "@/images/logo.png"

const footerColumns = [
  {
    heading: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/worker-ai" },
      { label: "Companies", href: "/companies" },
      { label: "Salary data", href: "/salary-data" },
    ],
  },
  {
    heading: "Navigations",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Career library", href: "/career-library" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Brand Guideline", href: "/brand-guideline" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
]

type SocialIconProps = SVGProps<SVGSVGElement>

function FacebookIcon(props: SocialIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function LinkedinIcon(props: SocialIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function PayPalMark({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`relative inline-block size-4 ${className ?? ""}`}>
      <span className="absolute left-1 top-0 text-[15px] leading-none font-bold text-white/70">
        P
      </span>
      <span className="absolute left-0 top-0.5 text-[15px] leading-none font-bold text-white">
        P
      </span>
    </span>
  )
}

type SocialIconComponent = ComponentType<{ className?: string }>

const socialLinks: {
  label: string
  href: string
  accent: boolean
  icon: SocialIconComponent
}[] = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    accent: false,
    icon: FacebookIcon,
  },
  {
    label: "PayPal",
    href: "https://paypal.com",
    accent: true,
    icon: PayPalMark,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    accent: false,
    icon: LinkedinIcon,
  },
]

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#100b16]">

      {/* Subtle Purple Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,85,252,0.14),transparent_55%)]"
      />

      {/* Soft Globe Arc Decoration */}
      <svg
        aria-hidden
        viewBox="0 0 400 200"
        className="pointer-events-none absolute -top-44 left-1/2 h-[26rem] w-[52rem] max-w-none -translate-x-1/2 opacity-60"
        fill="none"
      >
        <circle
          cx="200"
          cy="0"
          r="150"
          stroke="white"
          strokeOpacity="0.08"
        />
        <circle
          cx="200"
          cy="0"
          r="190"
          stroke="white"
          strokeOpacity="0.06"
        />
        <circle
          cx="200"
          cy="0"
          r="230"
          stroke="white"
          strokeOpacity="0.045"
        />
      </svg>

      {/* Footer Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-10 pt-24 sm:px-8 sm:pt-28 lg:px-12">

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-[minmax(0,2.2fr)_repeat(3,minmax(0,1fr))] lg:gap-x-10 lg:gap-y-12">

          {/* Brand Section */}
          <div className="col-span-2 flex flex-col sm:col-span-3 lg:col-span-1 lg:row-span-2">

            <Link
              href="/"
              className="inline-block w-fit rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Image
                src={logoImg}
                alt="Hireloop"
                width={116}
                height={40}
                className="h-10 w-auto"
              />
              <span className="sr-only">Hireloop home</span>
            </Link>

            <p className="mt-7 max-w-[19rem] text-base leading-relaxed text-violet-100/55 sm:text-lg">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-3 lg:mt-auto lg:pt-10">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className={
                    social.accent
                      ? "grid size-10 place-items-center rounded-xl bg-[#7d55fc] text-white outline-none transition-all hover:bg-[#8d68ff] hover:shadow-[0_0_20px_rgba(125,85,252,0.3)] focus-visible:ring-3 focus-visible:ring-ring/50"
                      : "grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white outline-none transition-all hover:border-white/25 hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-ring/50"
                  }
                >
                  <social.icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footerColumns.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="lg:pt-1"
            >
              <h2 className="font-heading text-lg font-semibold text-[#a78bfa] sm:text-xl">
                {column.heading}
              </h2>

              <ul className="mt-6 flex flex-col gap-5 sm:mt-8 sm:gap-6">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-violet-100/60 outline-none transition-colors hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50 sm:text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Bottom Copyright Section */}
          <div className="col-span-2 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-violet-100/45 sm:col-span-3 sm:flex-row sm:items-center sm:justify-between lg:col-start-2 lg:col-end-5 lg:self-end lg:border-t-0 lg:pt-0">

            <p>
              Copyright {new Date().getFullYear()} — HireLoop
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Link
                href="/terms"
                className="transition-colors outline-none hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Terms &amp; Policy
              </Link>

              <span aria-hidden="true">-</span>

              <Link
                href="/privacy"
                className="transition-colors outline-none hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Privacy Guideline
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
