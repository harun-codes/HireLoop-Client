import Link from "next/link"
import Image from "next/image"
import {
  BriefcaseIcon,
  Building2Icon,
  ScanSearchIcon,
  StarIcon,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { HeroSearch } from "@/components/home/hero-search"
import globeImg from "@/images/globe-hero.png"

const trendingPositions = [
  { label: "Product Designer", href: "/jobs?category=product-design" },
  { label: "AI Engineering", href: "/jobs?category=ai-engineering" },
  { label: "DevOps Engineer", href: "/jobs?category=devops" },
]

const stats = [
  { icon: BriefcaseIcon, value: "50K", label: "Active Jobs", href: "/jobs" },
  {
    icon: Building2Icon,
    value: "12K",
    label: "Companies",
    href: "/companies",
  },
  {
    icon: ScanSearchIcon,
    value: "2M",
    label: "Job Seekers",
    href: "/job-seekers",
  },
  {
    icon: StarIcon,
    value: "97%",
    label: "Satisfaction Rate",
    href: "/testimonials",
  },
]

// Deterministic star positions (percentages of the globe backdrop)
const stars = [
  { top: 10, left: 4, size: 4, delay: 0 },
  { top: 2, left: 11, size: 3, delay: 0.6 },
  { top: 7, left: 19, size: 5, delay: 1.3 },
  { top: 1, left: 30, size: 3, delay: 0.2 },
  { top: 5, left: 42, size: 4, delay: 1.7 },
  { top: 0, left: 55, size: 3, delay: 0.8 },
  { top: 6, left: 66, size: 5, delay: 1.4 },
  { top: 2, left: 77, size: 3, delay: 0.3 },
  { top: 8, left: 88, size: 4, delay: 1.1 },
  { top: 4, left: 96, size: 3, delay: 0.5 },
  { top: 13, left: 9, size: 3, delay: 1.9 },
  { top: 12, left: 50, size: 4, delay: 0.1 },
  { top: 11, left: 93, size: 3, delay: 1.6 },
]

function StatCard({ icon: Icon, value, label, href }: (typeof stats)[number]) {
  return (
    <Link
      href={href}
      className="group from-[#2c202e]/90 to-[#231827]/85 hover:border-white/20 relative flex h-60 flex-col justify-between rounded-xl border border-white/[0.08] bg-gradient-to-b p-6 text-left outline-none backdrop-blur-md transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 sm:h-56 lg:h-[16.5vw]"
    >
      <Icon className="text-white/70 size-7 shrink-0" strokeWidth={1.75} />
      <div>
        <div className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {value}
        </div>
        <div className="mt-2 text-sm text-white/55 lg:text-lg">{label}</div>
      </div>
    </Link>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1b1320] pb-10 lg:pb-0">
      <div className="relative z-20 mx-auto flex max-w-6xl flex-col items-center px-4 pt-20 text-center sm:pt-24">
        {/* Announcement badge */}
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 backdrop-blur">
          <BriefcaseIcon className="size-5 text-orange-500" />
          <span className="text-2xl font-bold text-white">50,000+</span>
          <Separator orientation="vertical" className="h-6 bg-white/15" />
          <span className="font-mono text-sm tracking-[0.18em] text-violet-100/60 uppercase">
            New jobs this month
          </span>
        </div>

        <h1 className="mt-10 max-w-4xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-balance text-violet-100/55">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <HeroSearch className="mt-14 w-full max-w-3xl" />

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <span className="text-base text-violet-100/55">
            Trending Position
          </span>
          {trendingPositions.map((position) => (
            <Link
              key={position.href}
              href={position.href}
              className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/90 transition-colors outline-none hover:bg-white/[0.1] focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {position.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Globe backdrop */}
      <div className="relative mt-4 h-auto overflow-hidden lg:h-[82vw]">
        {/* Violet atmosphere glow above the arc */}
        <div
          aria-hidden
          className="absolute left-1/2 h-[45%] w-[110vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(129,96,252,0.4),rgba(129,96,252,0.12),transparent)] blur-2xl top-[30%] lg:h-[30vw] lg:top-[-10vw] lg:w-[75vw]"
        />
        <div
          aria-hidden
          className="absolute left-1/2 h-[16vw] w-[44vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,102,255,0.45),transparent)] blur-xl top-[2vw] hidden lg:block"
        />

        {/* Twinkling stars */}
        <div aria-hidden className="absolute inset-0">
          {stars.map((star, index) => (
            <span
              key={index}
              className="absolute animate-pulse rounded-full bg-white/70"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>

        <Image
          src={globeImg}
          alt=""
          priority
          fetchPriority="high"
          width={1440}
          height={1342}
          sizes="(min-width: 1024px) 105vw, 170vw"
          className="absolute left-1/2 max-w-none -translate-x-1/2 [mask-image:linear-gradient(to_bottom,transparent,black_17%)] top-[45vw] w-[150vw] h-auto sm:top-[38vw] sm:w-[140vw] lg:top-[-15.5vw] lg:w-[105vw]"
        />

        {/* Caption over the planet face */}
        <p className="absolute top-[55%] left-1/2 z-20 w-full max-w-[40rem] -translate-x-1/2 px-4 text-2xl font-medium text-balance text-white/90 sm:text-3xl lg:top-[24vw] lg:text-4xl lg:leading-snug">
          Assisting over 15,000 job seekers find their dream positions.
        </p>

        {/* Stats */}
        <div className="relative z-20 mx-auto w-full px-4 pt-[26rem] sm:pt-[28rem] lg:absolute lg:inset-x-0 lg:top-[34vw] lg:z-20 lg:px-6 lg:pt-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>

      {/* Vertical panel stripes overlay (above globe, below content) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[repeating-linear-gradient(90deg,rgba(8,2,12,0.5)_0,rgba(8,2,12,0.5)_6.1vw,transparent_6.1vw,transparent_12.6vw)]"
      />
    </section>
  )
}
