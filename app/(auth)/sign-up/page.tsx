
"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
    CircleAlertIcon,
    Loader2Icon,
    ShieldCheckIcon,
    UserRoundIcon,
    BriefcaseIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { AuthField, PasswordField } from "@/components/auth/form-controls"
import { authClient } from "@/lib/auth-client"

const roles = [
    {
        value: "seeker",
        label: "Job Seeker",
        icon: UserRoundIcon,
        hint: "Find and apply for jobs",
    },
    {
        value: "recruiter",
        label: "Recruiter",
        icon: BriefcaseIcon,
        hint: "Hire top talent",
    },
    {
        value: "admin",
        label: "Admin",
        icon: ShieldCheckIcon,
        hint: "Manage the platform",
    },
] as const

const SignUpPage = () => {
    const router = useRouter()
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [role, setRole] = React.useState<(typeof roles)[number]["value"]>(
        "seeker"
    )
    const [errors, setErrors] = React.useState<{
        name?: string | null
        email?: string | null
        password?: string | null
    }>({})
    const [formError, setFormError] = React.useState<string | null>(null)
    const [pending, setPending] = React.useState(false)

    const updateName = (value: string) => {
        setName(value)
        if (errors.name && value.trim().length > 0) {
            setErrors((current) => ({ ...current, name: null }))
        }
    }

    const updateEmail = (value: string) => {
        setEmail(value)
        if (errors.email && /\S+@\S+\.\S+/.test(value)) {
            setErrors((current) => ({ ...current, email: null }))
        }
    }

    const updatePassword = (value: string) => {
        setPassword(value)
        if (errors.password && value.length >= 8) {
            setErrors((current) => ({ ...current, password: null }))
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const nextErrors: typeof errors = {}

        if (name.trim().length === 0) {
            nextErrors.name = "Enter your full name."
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            nextErrors.email = "Enter a valid email address."
        }

        if (password.length < 8) {
            nextErrors.password = "Password must be at least 8 characters."
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors)
            return
        }

        setErrors({})
        setFormError(null)
        setPending(true)

        try {
            const { error } = await authClient.signUp.email({
                name,
                email,
                password,
                role,
                callbackURL: "/sign-in",
            })

            if (error) {
                if (error.message?.toLowerCase().includes("already")) {
                    setErrors((current) => ({
                        ...current,
                        email: "An account with this email already exists.",
                    }))
                } else {
                    setFormError(
                        error.message?.length
                            ? error.message
                            : "Failed to create your account. Please try again."
                    )
                }
                return
            }

            router.push("/sign-in")
        } catch {
            setFormError("Something went wrong. Please try again.")
        } finally {
            setPending(false)
        }
    }

    return (
        <div className="animate-in fade-in zoom-in-95 relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#17101d]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl duration-500 sm:p-8">

            <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-violet-500/10 blur-3xl"
            />

            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"
            />

            <div className="relative z-10">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        Create your account
                    </h1>

                    <p className="mt-3 text-sm leading-relaxed text-violet-100/55 sm:text-base">
                        Start your journey with HireLoop.
                    </p>
                </div>

                {formError && (
                    <div
                        aria-live="polite"
                        className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-300"
                    >
                        <CircleAlertIcon className="mt-0.5 size-4 shrink-0" />
                        {formError}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    noValidate
                >
                    <fieldset className="flex flex-col gap-2">
                        <legend className="mb-2 text-sm font-medium text-violet-100/70">
                            I am a
                        </legend>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                            {roles.map((option) => (
                                <label
                                    key={option.value}
                                    className="group relative cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="role"
                                        value={option.value}
                                        checked={role === option.value}
                                        onChange={() => setRole(option.value)}
                                        className="peer sr-only"
                                        aria-description={option.hint}
                                    />

                                    <span
                                        className={cn(
                                            "flex min-h-[68px] flex-row items-center gap-3 rounded-xl border p-3 transition-all duration-200 peer-focus-visible:ring-3 peer-focus-visible:ring-violet-500/40 sm:min-h-[126px] sm:flex-col sm:justify-center sm:gap-2 sm:px-2 sm:py-4",
                                            role === option.value
                                                ? "border-violet-400/60 bg-violet-500/15 text-white shadow-[0_0_24px_rgba(139,92,246,0.08)]"
                                                : "border-white/10 bg-white/[0.03] text-violet-100/60 hover:border-white/20 hover:bg-white/[0.06]"
                                        )}
                                    >
                                        <option.icon
                                            className={cn(
                                                "size-5 shrink-0",
                                                role === option.value
                                                    ? "text-violet-300"
                                                    : "text-violet-100/40 group-hover:text-violet-100/70"
                                            )}
                                            strokeWidth={1.75}
                                        />

                                        <span className="min-w-0 sm:text-center">
                                            <span className="block text-sm font-medium">
                                                {option.label}
                                            </span>

                                            <span className="mt-1 block text-xs leading-tight text-violet-100/40">
                                                {option.hint}
                                            </span>
                                        </span>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <AuthField
                        name="name"
                        label="Full name"
                        type="text"
                        placeholder="Jane Doe"
                        autoComplete="name"
                        value={name}
                        onChange={updateName}
                        error={errors.name}
                    />

                    <AuthField
                        name="email"
                        label="Email address"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={email}
                        onChange={updateEmail}
                        error={errors.email}
                    />

                    <PasswordField
                        name="password"
                        label="Password"
                        placeholder="Create a password"
                        autoComplete="new-password"
                        value={password}
                        onChange={updatePassword}
                        error={errors.password}
                        hint="At least 8 characters"
                    />

                    <button
                        type="submit"
                        disabled={pending}
                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#7547f5] to-[#8b5cf6] text-sm font-semibold text-white shadow-[0_8px_24px_rgba(125,85,252,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(125,85,252,0.3)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-400/50 disabled:pointer-events-none disabled:opacity-60"
                    >
                        <span className="flex items-center justify-center gap-2">
                            {pending && (
                                <Loader2Icon className="size-4 animate-spin" />
                            )}
                            {pending ? "Creating account…" : "Create Account"}
                        </span>
                    </button>
                </form>

                <div className="mt-8 border-t border-white/[0.08] pt-6">
                    <p className="text-center text-sm text-violet-100/50">
                        Already have an account?{" "}
                        <Link
                            href="/sign-in"
                            className="font-semibold text-violet-400 transition-colors hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default SignUpPage
