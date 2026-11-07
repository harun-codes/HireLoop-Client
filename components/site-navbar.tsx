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

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

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
  const { data: session } = useSession();

  console.log("Session in SiteNavbar:", session);

  const handleSignOut = async () => {
    await signOut();

  }


  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
          <Logo />
          <span className="sr-only">Hireloop home</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Separator orientation="vertical" className="hidden h-5 md:block" />

          <div className="flex items-center gap-2">

            {
              session?.user ?
                <>
                  <span>Welcome, {session.user.name}</span>
                  <Button
                    onClick={handleSignOut}
                    render={<Link href="/sign-up" />}
                    nativeButton={false}
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 font-medium text-red-600 shadow-sm transition-all duration-200 hover:border-red-600 hover:bg-red-600 hover:text-white dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
                  >
                    Sign Out
                  </Button>
                </>


                :
                <>
                  <Link
                    href="/sign-in"
                    className="rounded-md px-2.5 py-1.5 text-sm font-medium text-primary transition-colors hover:underline underline-offset-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    Sign In
                  </Link>

                  <Button render={<Link href="/sign-up" />} nativeButton={false}>
                    Get Started
                  </Button>

                </>
            }
          </div>


        </div>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile navigation" className="px-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose
                      render={
                        <Link
                          href={link.href}
                          className="hover:bg-muted -mx-2 flex items-center rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <div className="flex flex-col gap-2 pb-4">
                <SheetClose
                  render={
                    <Link
                      href="/sign-in"
                      className="hover:bg-muted -mx-2 flex items-center rounded-lg px-2 py-2 text-sm font-medium text-primary transition-colors hover:underline"
                    />
                  }
                >
                  Sign In
                </SheetClose>
                <SheetClose render={<Button className="w-full" />}>
                  Get Started
                </SheetClose>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
