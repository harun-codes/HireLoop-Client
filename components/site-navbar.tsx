
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import logoImg from "@/images/logo.png"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useSession, signOut } from "@/lib/auth-client"

function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={logoImg}
      alt="Hireloop"
      width={88}
      height={30}
      priority
      className={cn("h-7 w-auto", className)}
    />
  )
}

export function SiteNavbar() {
  const [open, setOpen] = React.useState(false)
  const { data: session } = useSession()

  const role = session?.user?.role || "seeker"

  const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: `/dashboard/${role}` },
  ]

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        <Link
          href="/"
          className="shrink-0 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Logo />
          <span className="sr-only">Hireloop home</span>
        </Link>

        <div className="ml-auto hidden min-w-0 items-center gap-4 lg:flex xl:gap-6">

          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-4 xl:gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Separator
            orientation="vertical"
            className="h-5 shrink-0"
          />

          <div className="flex shrink-0 items-center gap-3">

            {session?.user ? (
              <>
                <span className="max-w-32 truncate whitespace-nowrap text-sm font-medium text-foreground">
                  Welcome, {session.user.name}
                </span>

                <Button
                  onClick={handleSignOut}
                  render={<Link href="/sign-up" />}
                  nativeButton={false}
                  className="shrink-0 rounded-lg border border-red-200 bg-red-50 px-4 py-2 font-medium text-red-600 shadow-sm transition-all duration-200 hover:border-red-600 hover:bg-red-600 hover:text-white dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm font-medium text-primary underline-offset-4 outline-none transition-colors hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  Sign In
                </Link>

                <Button
                  render={<Link href="/sign-up" />}
                  nativeButton={false}
                  className="shrink-0 whitespace-nowrap"
                >
                  Get Started
                </Button>
              </>
            )}

          </div>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 lg:hidden"
                aria-label="Open navigation menu"
              />
            }
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-80 max-w-[calc(100vw-2rem)]"
          >
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>

            <nav
              aria-label="Mobile navigation"
              className="px-4"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose
                      render={
                        <Link
                          href={link.href}
                          className="hover:bg-muted -mx-2 flex items-center rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  </li>
                ))}
              </ul>

              <Separator className="my-5" />

              <div className="flex flex-col gap-3 pb-4">

                {session?.user ? (
                  <>
                    <p className="truncate px-2 text-sm font-medium text-muted-foreground">
                      Welcome, {session.user.name}
                    </p>

                    <SheetClose
                      render={
                        <Button
                          onClick={handleSignOut}
                          render={<Link href="/sign-up" />}
                          nativeButton={false}
                          className="w-full border border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
                        />
                      }
                    >
                      Sign Out
                    </SheetClose>
                  </>
                ) : (
                  <>
                    <SheetClose
                      render={
                        <Link
                          href="/sign-in"
                          className="hover:bg-muted -mx-2 flex items-center rounded-lg px-3 py-3 text-sm font-medium text-primary transition-colors hover:underline"
                        />
                      }
                    >
                      Sign In
                    </SheetClose>

                    <SheetClose
                      render={
                        <Button
                          render={<Link href="/sign-up" />}
                          nativeButton={false}
                          className="w-full"
                        />
                      }
                    >
                      Get Started
                    </SheetClose>
                  </>
                )}

              </div>
            </nav>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  )
}
