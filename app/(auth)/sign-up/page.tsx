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

        // Client-side validation
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
                // Role stored on the user via better-auth additionalFields
                role,
                callbackURL: "/sign-in",
            })

            if (error) {
                // Field-level error for duplicate email, banner for anything else
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

            // Success → sign-in page
            router.push("/sign-in")
        } catch {
            setFormError("Something went wrong. Please try again.")
        } finally {
            setPending(false)
        }
    }

    return (
        <div className="animate-in fade-in zoom-in-95 relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/40 backdrop-blur-md duration-500 sm:p-8">
            <div
                aria-hidden
                className="via-violet-400/40 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
            />

            <h1 className="text-center text-2xl font-semibold text-white">
                Create your account
            </h1>
            <p className="mt-1.5 text-center text-sm text-violet-100/55">
                Start your journey with HireLoop
            </p>

            {formError && (
                <div
                    aria-live="polite"
                    className="mt-6 flex items-center gap-2 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2.5 text-xs text-red-300"
                >
                    <CircleAlertIcon className="size-4 shrink-0" />
                    {formError}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-4"
                noValidate
            >
                <fieldset className="flex flex-col gap-1.5">
                    <legend className="text-sm text-violet-100/60">
                        I am a
                    </legend>
                    <div className="grid grid-cols-3 gap-2">
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
                                        "flex h-full flex-col items-center gap-1.5 rounded-lg border px-2 py-3 transition-colors peer-focus-visible:ring-3 peer-focus-visible:ring-violet-500/40",
                                        role === option.value
                                            ? "border-violet-400/60 bg-violet-500/15 text-white"
                                            : "border-white/10 bg-white/[0.03] text-violet-100/60 hover:border-white/20 hover:bg-white/[0.06]"
                                    )}
                                >
                                    <option.icon
                                        className={cn(
                                            "size-5",
                                            role === option.value
                                                ? "text-violet-300"
                                                : "text-violet-100/40 group-hover:text-violet-100/70"
                                        )}
                                        strokeWidth={1.75}
                                    />
                                    <span className="text-xs font-medium">
                                        {option.label}
                                    </span>
                                    <span className="text-center text-[10px] leading-tight text-violet-100/35">
                                        {option.hint}
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
                    label="Email"
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
                    className="mt-2 h-11 w-full rounded-lg bg-[#7d55fc] text-sm font-medium text-white transition-all hover:bg-[#8d68ff] active:translate-y-px focus-visible:ring-3 focus-visible:ring-violet-500/40 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60"
                >
                    <span className="flex items-center justify-center gap-2">
                        {pending && (
                            <Loader2Icon className="size-4 animate-spin" />
                        )}
                        {pending ? "Creating account…" : "Sign Up"}
                    </span>
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-violet-100/50">
                Already have an account?{"  "}
                <Link
                    href="/sign-in"
                    className="font-medium text-violet-400 transition-colors hover:text-violet-300"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default SignUpPage;
