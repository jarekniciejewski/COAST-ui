import { useState } from "react"
import { ChevronRight, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

const VARIANTS = ["primary", "secondary", "tertiary"] as const
const TONES = ["default", "success", "warning", "destructive"] as const
const SIZES = ["sm", "lg"] as const

type Variant = (typeof VARIANTS)[number]
type Tone = (typeof TONES)[number]
type Size = (typeof SIZES)[number]

const MAPPING: [string, string][] = [
  ["style = primary, secondary, tertiary", 'variant="primary" · "secondary" · "tertiary"'],
  ["style suffix _success, _warning, _error / _destructive", 'tone="success" · "warning" · "destructive" (no suffix = "default")'],
  ["size = sm, lg", 'size="sm" (32 px) · size="lg" (40 px)'],
  ["state = hover, active, focus", "Handled by the browser when someone points at, presses or tabs to the button"],
  ["state = disable", "disabled"],
  ["Left Icon / Right Icon + icon swap", "leftIcon={<Plus />} · rightIcon={<ChevronRight />}"],
  ["label", "The text between <Button> and </Button>"],
]

function Choice<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">{label}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <Button
            key={option}
            size="sm"
            variant={option === value ? "primary" : "secondary"}
            aria-pressed={option === value}
            onClick={() => onChange(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </fieldset>
  )
}

function Playground() {
  const [variant, setVariant] = useState<Variant>("primary")
  const [tone, setTone] = useState<Tone>("default")
  const [size, setSize] = useState<Size>("lg")
  const [label, setLabel] = useState("Add to cart")
  const [left, setLeft] = useState(true)
  const [right, setRight] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [copied, setCopied] = useState(false)

  const text = label || "Button"
  const attrs = [
    variant !== "primary" && `variant="${variant}"`,
    tone !== "default" && `tone="${tone}"`,
    size !== "sm" && `size="${size}"`,
    left && "leftIcon={<Plus />}",
    right && "rightIcon={<ChevronRight />}",
    disabled && "disabled",
  ].filter(Boolean)
  const snippet = `<Button${attrs.length ? " " + attrs.join(" ") : ""}>${text}</Button>`

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="grid overflow-hidden rounded-xl border border-zinc-200 md:grid-cols-[300px_minmax(0,1fr)]">
      <div className="flex flex-col gap-5 border-b border-zinc-200 p-5 md:border-r md:border-b-0">
        <Choice label="Style" options={VARIANTS} value={variant} onChange={setVariant} />
        <Choice label="Tone" options={TONES} value={tone} onChange={setTone} />
        <Choice label="Size" options={SIZES} value={size} onChange={setSize} />
        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">Label</span>
          <input
            id="playground-label"
            className="h-8 rounded-md border border-zinc-300 px-2.5 text-sm outline-none focus-visible:border-ring"
            value={label}
            maxLength={40}
            onChange={(e) => setLabel(e.target.value)}
          />
        </label>
        <fieldset className="min-w-0">
          <legend className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">Options</legend>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {(
              [
                ["Left icon", left, setLeft],
                ["Right icon", right, setRight],
                ["Disabled", disabled, setDisabled],
              ] as const
            ).map(([name, checked, set]) => (
              <label key={name} className="inline-flex cursor-pointer items-center gap-1.5">
                <input
                  type="checkbox"
                  className="size-4 accent-primary"
                  checked={checked}
                  onChange={(e) => set(e.target.checked)}
                />
                {name}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex min-w-0 flex-col">
        <div className="grid min-h-56 flex-1 place-items-center bg-[radial-gradient(var(--color-zinc-200)_1px,transparent_1px)] [background-size:16px_16px] p-8">
          <div className="flex flex-col items-center gap-3">
            <Button
              variant={variant}
              tone={tone}
              size={size}
              disabled={disabled}
              leftIcon={left ? <Plus /> : undefined}
              rightIcon={right ? <ChevronRight /> : undefined}
            >
              {text}
            </Button>
            <p className="text-xs text-zinc-500">Hover, press, or Tab to it</p>
          </div>
        </div>
        <div className="flex items-start gap-3 border-t border-zinc-200 bg-zinc-50 p-3 pl-4">
          <pre className="min-w-0 flex-1 overflow-x-auto py-1.5 font-mono text-[13px]">{snippet}</pre>
          <Button variant="secondary" size="sm" onClick={copy}>
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function Matrix() {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200">
      <table className="w-full min-w-[620px] border-collapse text-left">
        <thead className="bg-zinc-50 font-mono text-[11px] tracking-wide text-zinc-500 uppercase">
          <tr>
            {["style · tone", "sm", "lg", "sm · disabled", "lg · disabled"].map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {VARIANTS.flatMap((variant) =>
            TONES.map((tone, i) => (
              <tr key={`${variant}-${tone}`} className={i === 0 ? "border-t border-zinc-300" : "border-t border-zinc-100"}>
                <th scope="row" className="px-4 py-3 font-mono text-xs font-normal whitespace-nowrap text-zinc-500">
                  {variant} · {tone}
                </th>
                {(
                  [
                    ["sm", false],
                    ["lg", false],
                    ["sm", true],
                    ["lg", true],
                  ] as const
                ).map(([size, disabled]) => (
                  <td key={`${size}-${disabled}`} className="px-4 py-3">
                    <Button variant={variant} tone={tone} size={size} disabled={disabled}>
                      Button
                    </Button>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default function App() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-10 md:px-6">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs tracking-wider text-zinc-500 uppercase">COAST UI · Component 01</p>
        <h1 className="text-4xl font-bold tracking-tight text-balance">Button</h1>
        <p className="max-w-[64ch] text-zinc-600">
          The COAST Button, built with React, shadcn/ui and Tailwind CSS from the Figma component set. Every button on
          this page is the real component: point at it, press it, or move to it with the Tab key to see the hover,
          pressed and focus states.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-zinc-500">
          <span>
            <b className="font-semibold text-foreground">3</b> styles
          </span>
          <span>
            <b className="font-semibold text-foreground">4</b> tones
          </span>
          <span>
            <b className="font-semibold text-foreground">2</b> sizes
          </span>
          <span>
            <b className="font-semibold text-foreground">5</b> states
          </span>
          <a className="underline underline-offset-2 hover:text-foreground" href="https://github.com/jarekniciejewski/COAST-ui">
            Source on GitHub
          </a>
        </div>
      </header>

      <section className="flex flex-col gap-4" aria-labelledby="try-it">
        <h2 id="try-it" className="text-xl font-semibold">
          Try it
        </h2>
        <Playground />
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="all-variants">
        <h2 id="all-variants" className="text-xl font-semibold">
          All variants
        </h2>
        <p className="max-w-[70ch] text-sm text-zinc-600">
          The same grid as the Figma component set, light theme. Hover, pressed and focus are live states here, not
          separate frames.
        </p>
        <Matrix />
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="figma-to-code">
        <h2 id="figma-to-code" className="text-xl font-semibold">
          From Figma to code
        </h2>
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="text-xs tracking-wide text-zinc-500 uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">In Figma</th>
                <th className="px-4 py-3 font-semibold">In code</th>
              </tr>
            </thead>
            <tbody>
              {MAPPING.map(([figma, code]) => (
                <tr key={figma} className="border-t border-zinc-200 align-top">
                  <td className="px-4 py-3">{figma}</td>
                  <td className="px-4 py-3 font-mono text-[12.5px]">{code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="run-locally">
        <h2 id="run-locally" className="text-xl font-semibold">
          Run it locally
        </h2>
        <pre className="overflow-x-auto rounded-xl bg-zinc-50 p-4 font-mono text-[13px] leading-relaxed">
          {`git clone https://github.com/jarekniciejewski/COAST-ui.git
cd COAST-ui
npm install
npm run dev`}
        </pre>
      </section>
    </main>
  )
}
