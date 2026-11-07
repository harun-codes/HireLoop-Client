
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { MapPinIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function SearchField({
  icon: Icon,
  label,
  value,
  onChange,
}: {
  icon: React.ElementType
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/[0.04]">
      <Icon className="size-5 shrink-0 text-white/40" />

      <input
        type="text"
        aria-label={label}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/40"
      />
    </label>
  )
}

export function HeroSearch({ className }: { className?: string }) {
  const router = useRouter()

  const [query, setQuery] = React.useState("")
  const [location, setLocation] = React.useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const params = new URLSearchParams()

    if (query.trim()) params.set("q", query.trim())
    if (location.trim()) params.set("location", location.trim())

    router.push(`/jobs${params.size ? `?${params.toString()}` : ""}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col items-stretch gap-1.5 rounded-[10px] border border-white/10 bg-white/[0.06] p-2 pl-4 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:gap-2",
        className
      )}
    >
      {/* Job Search Field */}
      <SearchField
        icon={SearchIcon}
        label="Job title, skill or company"
        value={query}
        onChange={setQuery}
      />

      {/* Location Search Field - no vertical separator */}
      <SearchField
        icon={MapPinIcon}
        label="Location or Remote"
        value={location}
        onChange={setLocation}
      />

      {/* Search Button */}
      <button
        type="submit"
        aria-label="Search jobs"
        className="mt-1 grid size-12 shrink-0 place-items-center rounded-[10px] bg-[#7d55fc] text-white transition-colors hover:bg-[#8d68ff] sm:mt-0"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  )
}
