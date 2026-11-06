import * as React from "react"
import { CircleAlertIcon, EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function AuthField({
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
  error,
}: {
  name: string
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  autoComplete?: string
  error?: string | null
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm text-violet-100/60">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          "h-11 w-full rounded-lg border bg-white/[0.05] px-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus-visible:ring-3",
          error
            ? "border-red-500/50 focus-visible:ring-red-500/20"
            : "border-white/10 focus-visible:ring-violet-500/30 focus-visible:bg-white/[0.08]"
        )}
      />
      {error && (
        <p
          id={`${name}-error`}
          className="flex items-center gap-1.5 text-xs text-red-400"
        >
          <CircleAlertIcon className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

function PasswordField({
  name,
  label = "Password",
  placeholder,
  value,
  onChange,
  autoComplete = "current-password",
  error,
  hint,
}: {
  name: string
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  autoComplete?: string
  error?: string | null
  hint?: string
}) {
  const [show, setShow] = React.useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm text-violet-100/60">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? `${name}-hint` : undefined}
          className={cn(
            "h-11 w-full rounded-lg border bg-white/[0.05] pr-11 pl-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus-visible:ring-3",
            error
              ? "border-red-500/50 focus-visible:ring-red-500/20"
              : "border-white/10 focus-visible:ring-violet-500/30 focus-visible:bg-white/[0.08]"
          )}
        />
        <button
          type="button"
          onClick={() => setShow((current) => !current)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          className="text-violet-100/35 hover:text-violet-100/80 absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-md transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {show ? (
            <EyeOffIcon className="size-4" />
          ) : (
            <EyeIcon className="size-4" />
          )}
        </button>
      </div>
      {error ? (
        <p
          id={`${name}-hint`}
          className="flex items-center gap-1.5 text-xs text-red-400"
        >
          <CircleAlertIcon className="size-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${name}-hint`} className="text-xs text-violet-100/35">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export { AuthField, PasswordField }
