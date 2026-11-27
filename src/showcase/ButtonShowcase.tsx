import { useState } from "react"
import { ChevronRight, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checks, Choice, ComponentSection, MappingTable, Playground, SubSection, TextSetting } from "./shared"

const VARIANTS = ["primary", "secondary", "tertiary"] as const
const TONES = ["default", "success", "warning", "destructive"] as const
const SIZES = ["sm", "lg"] as const

type Variant = (typeof VARIANTS)[number]
type Tone = (typeof TONES)[number]
type Size = (typeof SIZES)[number]

const MAPPING = [
  ["style = primary, secondary, tertiary", 'variant="primary" · "secondary" · "tertiary"'],
  ["style suffix _success, _warning, _error / _destructive", 'tone="success" · "warning" · "destructive" (no suffix = "default")'],
  ["size = sm, lg", 'size="sm" (32 px) · size="lg" (40 px)'],
  ["state = hover, active, focus", "Handled by the browser when someone points at, presses or tabs to the button"],
  ["state = disable", "disabled"],
  ["Left Icon / Right Icon + icon swap", "leftIcon={<Plus />} · rightIcon={<ChevronRight />}"],
  ["label", "The text between <Button> and </Button>"],
] as const

function ButtonPlayground() {
  const [variant, setVariant] = useState<Variant>("primary")
  const [tone, setTone] = useState<Tone>("default")
  const [size, setSize] = useState<Size>("lg")
  const [label, setLabel] = useState("Add to cart")
  const [left, setLeft] = useState(true)
  const [right, setRight] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const text = label || "Button"
  const attrs = [
    variant !== "primary" && `variant="${variant}"`,
    tone !== "default" && `tone="${tone}"`,
    size !== "sm" && `size="${size}"`,
    left && "leftIcon={<Plus />}",
    right && "rightIcon={<ChevronRight />}",
    disabled && "disabled",
  ].filter(Boolean)
  const code = `<Button${attrs.length ? " " + attrs.join(" ") : ""}>${text}</Button>`

  return (
    <Playground
      code={code}
      controls={
        <>
          <Choice label="Style" options={VARIANTS} value={variant} onChange={setVariant} />
          <Choice label="Tone" options={TONES} value={tone} onChange={setTone} />
          <Choice label="Size" options={SIZES} value={size} onChange={setSize} />
          <TextSetting id="button-label" label="Label" value={label} onChange={setLabel} />
          <Checks
            label="Options"
            items={[
              ["Left icon", left, setLeft],
              ["Right icon", right, setRight],
              ["Disabled", disabled, setDisabled],
            ]}
          />
        </>
      }
      preview={
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
      }
    />
  )
}

function ButtonMatrix() {
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

export function ButtonShowcase() {
  return (
    <ComponentSection
      id="button"
      index="01"
      title="Button"
      description="Every button here is the real component: point at it, press it, or move to it with the Tab key to see the hover, pressed and focus states from Figma."
      stats={[
        [3, "styles"],
        [4, "tones"],
        [2, "sizes"],
        [5, "states"],
      ]}
    >
      <SubSection id="button-try" title="Try it">
        <ButtonPlayground />
      </SubSection>
      <SubSection
        id="button-variants"
        title="All variants"
        note="The same grid as the Figma component set, light theme. Hover, pressed and focus are live states here, not separate frames."
      >
        <ButtonMatrix />
      </SubSection>
      <SubSection id="button-mapping" title="From Figma to code">
        <MappingTable rows={MAPPING} />
      </SubSection>
    </ComponentSection>
  )
}
