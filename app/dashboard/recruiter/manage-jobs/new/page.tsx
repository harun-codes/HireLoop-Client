
"use client"

import * as React from "react"
import Link from "next/link"
import {
    ArrowRight,
    ChevronRight,
    Building2,
    MapPin,
    CalendarDays,
    Globe2,
    BriefcaseBusiness,
    ClipboardList,
    CircleDollarSign,
    RotateCcw,
    Sparkles,
    CheckCircle2,
    type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"

type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"

type JobFormValues = {
    jobTitle: string
    companyName: string
    category: string
    jobType: JobType
    isRemote: boolean
    location: string
    deadline: string
    minSalary: string
    maxSalary: string
    frequency: string
    responsibilities: string
    qualifications: string
}

const initialFormValues: JobFormValues = {
    jobTitle: "",
    companyName: "",
    category: "Engineering & Tech",
    jobType: "Full-time",
    isRemote: false,
    location: "",
    deadline: "",
    minSalary: "",
    maxSalary: "",
    frequency: "per hour",
    responsibilities: "",
    qualifications: "",
}

const jobTypes: JobType[] = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
]

const categories = [
    "Engineering & Tech",
    "Design & Creative",
    "Marketing",
    "Sales & Business Development",
    "Finance & Accounting",
    "Human Resources",
    "Customer Support",
    "Operations",
    "Other",
]

const frequencies = [
    "per hour",
    "per day",
    "per week",
    "per month",
    "per year",
]

function SectionHeading({
    number,
    title,
    description,
    icon: Icon,
}: {
    number: string
    title: string
    description: string
    icon: LucideIcon
}) {
    return (
        <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                <Icon className="size-5" />
            </div>

            <div className="min-w-0">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-400">
                    Step {number}
                </p>

                <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    {title}
                </h2>

                <p className="mt-1 text-xs leading-relaxed text-zinc-500 sm:text-sm">
                    {description}
                </p>
            </div>
        </div>
    )
}

function Field({
    label,
    htmlFor,
    required,
    hint,
    children,
}: {
    label: string
    htmlFor: string
    required?: boolean
    hint?: string
    children: React.ReactNode
}) {
    return (
        <div className="min-w-0 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <Label
                    htmlFor={htmlFor}
                    className="text-[13px] font-medium text-zinc-200"
                >
                    {label}
                    {required && (
                        <span className="ml-1 text-violet-400">*</span>
                    )}
                </Label>

                {hint && (
                    <span className="text-[11px] text-zinc-500">
                        {hint}
                    </span>
                )}
            </div>

            {children}
        </div>
    )
}

function FormSection({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111318] shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-colors hover:border-white/[0.10]">
            {children}
        </section>
    )
}

export default function NewJobPage() {
    
    const [formData, setFormData] =
        React.useState<JobFormValues>(initialFormValues)

    const [formError, setFormError] = React.useState("")
    const [formMessage, setFormMessage] = React.useState("")

    const updateField = <K extends keyof JobFormValues,>(
        field: K,
        value: JobFormValues[K]
    ) => {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }))

        setFormError("")
        setFormMessage("")
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setFormError("")
        setFormMessage("")

        const minSalary =
            formData.minSalary.trim() === ""
                ? null
                : Number(formData.minSalary)

        const maxSalary =
            formData.maxSalary.trim() === ""
                ? null
                : Number(formData.maxSalary)

        if (
            minSalary !== null &&
            maxSalary !== null &&
            minSalary > maxSalary
        ) {
            setFormError(
                "Minimum salary cannot be greater than maximum salary."
            )
            return
        }

        const jobData = {
            jobTitle: formData.jobTitle.trim(),
            companyName: formData.companyName.trim(),
            category: formData.category,
            jobType: formData.jobType,
            isRemote: formData.isRemote,
            location: formData.location.trim(),
            deadline: formData.deadline || null,
            minSalary,
            maxSalary,
            frequency: formData.frequency,
            responsibilities: formData.responsibilities.trim(),
            qualifications: formData.qualifications.trim(),
        }

        console.log("Collected Job Data:", jobData)

        setFormMessage(
            "Your job information has been collected successfully. Check the browser console for the submitted data."
        )
    }

    const handleReset = () => {
        setFormData(initialFormValues)
        setFormError("")
        setFormMessage("")
    }

    const inputClass =
        "h-12 w-full rounded-xl border border-[#292c35] bg-[#191c23] px-4 text-[13px] text-zinc-100 shadow-none transition-all duration-200 placeholder:text-zinc-600 hover:border-[#414552] focus-visible:border-violet-500 focus-visible:ring-[3px] focus-visible:ring-violet-500/10"

    const selectClass =
        "h-12 w-full rounded-xl border border-[#292c35] bg-[#191c23] px-4 text-[13px] text-zinc-100 shadow-none transition-all hover:border-[#414552] focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"

    const textareaClass =
        "min-h-[145px] w-full resize-y rounded-xl border border-[#292c35] bg-[#191c23] px-4 py-3.5 text-[13px] leading-6 text-zinc-100 shadow-none transition-all placeholder:text-zinc-600 hover:border-[#414552] focus-visible:border-violet-500 focus-visible:ring-[3px] focus-visible:ring-violet-500/10"

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

            <div className="mb-8 flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-7 sm:flex-row sm:items-end">

                <div className="min-w-0 space-y-4">

                    <div className="flex items-center gap-2 text-xs">
                        <Link
                            href="/dashboard/recruiter/manage-jobs"
                            className="text-zinc-500 transition-colors hover:text-violet-300"
                        >
                            Manage Jobs
                        </Link>

                        <ChevronRight className="size-3.5 text-zinc-600" />

                        <span className="font-medium text-zinc-300">
                            Create New Listing
                        </span>
                    </div>

                    <div>
                        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/[0.08] px-3 py-1.5">
                            <Sparkles className="size-3.5 text-violet-400" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-300">
                                Recruiter Workspace
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Post a New Job
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
                            Create an attractive job listing and connect with
                            the right talent for your organization.
                        </p>
                    </div>
                </div>

            </div>

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="size-2 rounded-full bg-violet-400" />
                    Complete the information below to create your listing.
                </div>

                <p className="text-xs text-zinc-500">
                    <span className="text-violet-400">*</span> Required fields
                </p>
            </div>

            <form
                id="new-job-form"
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                <FormSection>

                    <div className="border-b border-white/[0.06] px-5 py-5 sm:px-7 sm:py-6">
                        <SectionHeading
                            number="01"
                            title="Basic Information"
                            description="Start with the position and the company details."
                            icon={BriefcaseBusiness}
                        />
                    </div>

                    <div className="space-y-6 p-5 sm:p-7">

                        <Field
                            label="Job Title"
                            htmlFor="jobTitle"
                            required
                        >
                            <Input
                                id="jobTitle"
                                name="jobTitle"
                                placeholder="e.g. Frontend Developer"
                                value={formData.jobTitle}
                                onChange={(e) =>
                                    updateField("jobTitle", e.target.value)
                                }
                                className={inputClass}
                                required
                            />
                        </Field>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <Field
                                label="Company Name"
                                htmlFor="companyName"
                                required
                            >
                                <div className="relative">
                                    <Building2 className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />

                                    <Input
                                        id="companyName"
                                        name="companyName"
                                        placeholder="Enter company name"
                                        value={formData.companyName}
                                        onChange={(e) =>
                                            updateField("companyName", e.target.value)
                                        }
                                        className={`${inputClass} pl-11`}
                                        required
                                    />
                                </div>
                            </Field>

                            <Field
                                label="Job Category"
                                htmlFor="category"
                                required
                            >
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) =>
                                        updateField("category", value ?? "")
                                    }
                                >
                                    <SelectTrigger
                                        id="category"
                                        className={selectClass}
                                    >
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>

                                    <SelectContent className=" border-[#30333d] bg-[#191c23] text-zinc-100">
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category}
                                                value={category}
                                                className="text-sm focus:bg-violet-500/15 focus:text-white"
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>

                        </div>

                        <div className="space-y-3">
                            <Label className="text-[13px] font-medium text-zinc-200">
                                Job Type
                                <span className="ml-1 text-violet-400">*</span>
                            </Label>

                            <RadioGroup
                                value={formData.jobType}
                                onValueChange={(value) =>
                                    updateField("jobType", value as JobType)
                                }
                                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                            >
                                {jobTypes.map((type) => {
                                    const selected = formData.jobType === type

                                    const id = `job-type-${type
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]+/g, "-")}`

                                    return (
                                        <div key={type} className="min-w-0">
                                            <RadioGroupItem
                                                value={type}
                                                id={id}
                                                className="peer sr-only"
                                            />

                                            <Label
                                                htmlFor={id}
                                                className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-2 text-center text-xs font-medium transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-violet-400 sm:text-sm ${selected
                                                        ? "border-violet-500/60 bg-violet-500/[0.12] text-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.08)]"
                                                        : "border-[#292c35] bg-[#191c23] text-zinc-400 hover:border-[#55505f] hover:bg-[#20232c] hover:text-zinc-200"
                                                    }`}
                                            >
                                                {type}
                                            </Label>
                                        </div>
                                    )
                                })}
                            </RadioGroup>
                        </div>

                    </div>
                </FormSection>

                <FormSection>

                    <div className="border-b border-white/[0.06] px-5 py-5 sm:px-7 sm:py-6">
                        <SectionHeading
                            number="02"
                            title="Location, Compensation & Timeline"
                            description="Set the work location, salary range and application deadline."
                            icon={CircleDollarSign}
                        />
                    </div>

                    <div className="space-y-6 p-5 sm:p-7">

                        <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#30303e] bg-gradient-to-r from-violet-500/[0.08] to-transparent p-4 sm:flex-row sm:items-center sm:p-5">

                            <div className="flex min-w-0 items-start gap-3">

                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-300">
                                    <Globe2 className="size-5" />
                                </div>

                                <div className="min-w-0">
                                    <Label
                                        htmlFor="isRemote"
                                        className="cursor-pointer text-sm font-semibold text-zinc-100"
                                    >
                                        Remote Work Allowed
                                    </Label>

                                    <p className="mt-1 max-w-md text-xs leading-relaxed text-zinc-500">
                                        Allow candidates to work remotely from
                                        different locations.
                                    </p>
                                </div>

                            </div>

                            <Switch
                                id="isRemote"
                                checked={formData.isRemote}
                                onCheckedChange={(checked) =>
                                    updateField("isRemote", checked)
                                }
                                className="shrink-0 data-[state=checked]:bg-violet-500"
                            />

                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <Field
                                label="Job Location"
                                htmlFor="location"
                                required
                                hint="e.g. New York, USA"
                            >
                                <div className="relative">
                                    <MapPin className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />

                                    <Input
                                        id="location"
                                        name="location"
                                        placeholder="Enter job location"
                                        value={formData.location}
                                        onChange={(e) =>
                                            updateField("location", e.target.value)
                                        }
                                        className={`${inputClass} pl-11`}
                                        required
                                    />
                                </div>
                            </Field>

                            <Field
                                label="Application Deadline"
                                htmlFor="deadline"
                                hint="Optional"
                            >
                                <div className="relative">
                                    <CalendarDays className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />

                                    <Input
                                        id="deadline"
                                        name="deadline"
                                        type="date"
                                        value={formData.deadline}
                                        onChange={(e) =>
                                            updateField("deadline", e.target.value)
                                        }
                                        className={`${inputClass} pl-11 [color-scheme:dark]`}
                                    />
                                </div>
                            </Field>

                        </div>

                        <div className="space-y-4">

                            <div>
                                <h3 className="text-[13px] font-semibold text-zinc-200">
                                    Salary & Compensation
                                </h3>

                                <p className="mt-1 text-xs text-zinc-500">
                                    Specify the expected salary range for this position.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                                <Field
                                    label="Minimum Salary / Rate"
                                    htmlFor="minSalary"
                                >
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-zinc-500">
                                            €
                                        </span>

                                        <Input
                                            id="minSalary"
                                            name="minSalary"
                                            type="number"
                                            min="0"
                                            step="any"
                                            placeholder="25"
                                            value={formData.minSalary}
                                            onChange={(e) =>
                                                updateField("minSalary", e.target.value)
                                            }
                                            className={`${inputClass} pl-9`}
                                        />
                                    </div>
                                </Field>

                                <Field
                                    label="Maximum Salary / Rate"
                                    htmlFor="maxSalary"
                                >
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-zinc-500">
                                            €
                                        </span>

                                        <Input
                                            id="maxSalary"
                                            name="maxSalary"
                                            type="number"
                                            min="0"
                                            step="any"
                                            placeholder="40"
                                            value={formData.maxSalary}
                                            onChange={(e) =>
                                                updateField("maxSalary", e.target.value)
                                            }
                                            className={`${inputClass} pl-9`}
                                        />
                                    </div>
                                </Field>

                                <Field
                                    label="Payment Frequency"
                                    htmlFor="frequency"
                                >
                                    <Select
                                        value={formData.frequency}
                                        onValueChange={(value) =>
                                            updateField("frequency", value ?? "")
                                        }
                                    >
                                        <SelectTrigger
                                            id="frequency"
                                            className={selectClass}
                                        >
                                            <SelectValue placeholder="Select frequency" />
                                        </SelectTrigger>

                                        <SelectContent className="border-[#30333d] bg-[#191c23] text-zinc-100">
                                            {frequencies.map((frequency) => (
                                                <SelectItem
                                                    key={frequency}
                                                    value={frequency}
                                                    className="text-sm focus:bg-violet-500/15 focus:text-white"
                                                >
                                                    {frequency}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>

                            </div>
                        </div>

                    </div>
                </FormSection>

                <FormSection>

                    <div className="border-b border-white/[0.06] px-5 py-5 sm:px-7 sm:py-6">
                        <SectionHeading
                            number="03"
                            title="Responsibilities & Requirements"
                            description="Help candidates understand the role and the qualifications you expect."
                            icon={ClipboardList}
                        />
                    </div>

                    <div className="space-y-6 p-5 sm:p-7">

                        <Field
                            label="Key Responsibilities"
                            htmlFor="responsibilities"
                            required
                            hint="Describe the daily tasks"
                        >
                            <Textarea
                                id="responsibilities"
                                name="responsibilities"
                                placeholder={"Describe the main responsibilities of this position...\n\nExample:\n• Develop and maintain web applications\n• Collaborate with designers and developers\n• Improve application performance"}
                                value={formData.responsibilities}
                                onChange={(e) =>
                                    updateField("responsibilities", e.target.value)
                                }
                                className={textareaClass}
                                required
                            />
                        </Field>

                        <Field
                            label="Qualifications & Requirements"
                            htmlFor="qualifications"
                            required
                            hint="Skills, experience and education"
                        >
                            <Textarea
                                id="qualifications"
                                name="qualifications"
                                placeholder={"Describe the qualifications and skills required...\n\nExample:\n• 3+ years of relevant experience\n• Strong knowledge of required technologies\n• Good communication and teamwork skills"}
                                value={formData.qualifications}
                                onChange={(e) =>
                                    updateField("qualifications", e.target.value)
                                }
                                className={textareaClass}
                                required
                            />
                        </Field>

                    </div>
                </FormSection>

                {formError && (
                    <div
                        role="alert"
                        className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-4 text-sm text-red-400"
                    >
                        <span className="mt-0.5 size-2 shrink-0 rounded-full bg-red-400" />
                        {formError}
                    </div>
                )}

                {formMessage && (
                    <div
                        role="status"
                        className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-4 text-sm leading-relaxed text-emerald-300"
                    >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                        {formMessage}
                    </div>
                )}

                <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleReset}
                        className="h-11 w-full rounded-xl px-5 text-sm text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-white sm:w-auto"
                    >
                        <RotateCcw className="mr-2 size-4" />
                        Reset Form
                    </Button>

                    <Button
                        type="submit"
                        className="h-12 w-full rounded-xl bg-violet-600 px-8 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition-all hover:bg-violet-500 hover:shadow-violet-500/20 sm:w-auto"
                    >
                        Publish Job
                        <ArrowRight className="ml-2 size-4" />
                    </Button>

                </div>

            </form>

            <p className="mt-6 text-center text-[11px] leading-relaxed text-zinc-600">
                HireLoop · Recruiter Dashboard · Create your next opportunity
            </p>

        </div>
    )
}
