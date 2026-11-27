import { useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"

/** Segmented choice built from the COAST Button itself. */
export function Choice<T extends string>({
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

export type Check = readonly [label: string, checked: boolean, set: (checked: boolean) => void]

export function Checks({ label, items }: { label: string; items: readonly Check[] }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">{label}</legend>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {items.map(([name, checked, set]) => (
          <label key={name} className="inline-flex cursor-pointer items-center gap-1.5">
            <input type="checkbox" className="size-4 accent-primary" checked={checked} onChange={(e) => set(e.target.checked)} />
            {name}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function TextSetting({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      <span className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">{label}</span>
      <input
        id={id}
        className="h-8 rounded-md border border-zinc-300 px-2.5 text-sm outline-none focus-visible:border-ring"
        value={value}
        maxLength={60}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

/** Playground frame: controls on the left, live component + code on the right. */
export function Playground({ controls, preview, code }: { controls: ReactNode; preview: ReactNode; code: string }) {
  return (
    <div className="grid overflow-hidden rounded-xl border border-zinc-200 md:grid-cols-[300px_minmax(0,1fr)]">
      <div className="flex flex-col gap-5 border-b border-zinc-200 p-5 md:border-r md:border-b-0">{controls}</div>
      <div className="flex min-w-0 flex-col">
        <div className="grid min-h-56 flex-1 place-items-center bg-[radial-gradient(var(--color-zinc-200)_1px,transparent_1px)] [background-size:16px_16px] p-8">
          {preview}
        </div>
        <CodeSnippet code={code} />
      </div>
    </div>
  )
}

export function CodeSnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex items-start gap-3 border-t border-zinc-200 bg-zinc-50 p-3 pl-4">
      <pre className="min-w-0 flex-1 overflow-x-auto py-1.5 font-mono text-[13px]">{code}</pre>
      <Button variant="secondary" size="sm" onClick={copy}>
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  )
}

export function MappingTable({ rows }: { rows: readonly (readonly [string, string])[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="text-xs tracking-wide text-zinc-500 uppercase">
          <tr>
            <th className="px-4 py-3 font-semibold">In Figma</th>
            <th className="px-4 py-3 font-semibold">In code</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([figma, code]) => (
            <tr key={figma} className="border-t border-zinc-200 align-top">
              <td className="px-4 py-3">{figma}</td>
              <td className="px-4 py-3 font-mono text-[12.5px]">{code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** One component's section on the page. */
export function ComponentSection({
  id,
  index,
  title,
  description,
  stats,
  children,
}: {
  id: string
  index: string
  title: string
  description: ReactNode
  stats: readonly (readonly [number, string])[]
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="flex scroll-mt-6 flex-col gap-10">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-xs tracking-wider text-zinc-500 uppercase">Component {index}</p>
        <h2 id={`${id}-title`} className="text-3xl font-bold tracking-tight text-balance">
          {title}
        </h2>
        <p className="max-w-[64ch] text-zinc-600">{description}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-zinc-500">
          {stats.map(([n, what]) => (
            <span key={what}>
              <b className="font-semibold text-foreground">{n}</b> {what}
            </span>
          ))}
        </div>
      </header>
      {children}
    </section>
  )
}

export function SubSection({ id, title, note, children }: { id: string; title: string; note?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 id={id} className="text-xl font-semibold">
        {title}
      </h3>
      {note && <p className="max-w-[70ch] text-sm text-zinc-600">{note}</p>}
      {children}
    </div>
  )
}
