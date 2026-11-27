import { useState } from "react"
import { EyeOff, User } from "lucide-react"

import { InputField } from "@/components/ui/input"
import { Checks, Choice, ComponentSection, MappingTable, Playground, SubSection, TextSetting } from "./shared"

const SIZES = ["sm", "md", "lg"] as const
const STATUSES = ["default", "success", "warning", "error"] as const

type Size = (typeof SIZES)[number]
type Status = (typeof STATUSES)[number]

const HELPER: Record<Status, string> = {
  default: "We'll send the order confirmation here",
  success: "Email address verified",
  warning: "This looks like a work address",
  error: "Enter a valid email address",
}

const MAPPING = [
  ["Size = sm, md, lg", 'size="sm" (32 px) · "md" (36 px) · "lg" (40 px)'],
  ["State = Success, Warning, Error", 'status="success" · "warning" · "error" (Default = "default")'],
  ["State = Focus, Error_focus, Warning_focus, Success_focus", "Handled by the browser when someone clicks or tabs into the field"],
  ["State = Disabled", "disabled"],
  ["Filled = No / Yes", "Placeholder until someone types; the typed text uses field-foreground"],
  ["Label · Top Right label", 'label="Email" · topRightLabel="Optional"'],
  ["Bottom Left label (+ status icon) · Bottom Right label", 'helperText="…" · bottomRightLabel="0 / 50"'],
  ["Left-icon / Right-icon + icon swap", "leftIcon={<User />} · rightIcon={<EyeOff />}"],
  ["Placeholder text · Text", 'placeholder="Type here" · value / defaultValue'],
] as const

function InputPlayground() {
  const [size, setSize] = useState<Size>("md")
  const [status, setStatus] = useState<Status>("default")
  const [label, setLabel] = useState("Email")
  const [placeholder, setPlaceholder] = useState("name@example.com")
  const [value, setValue] = useState("")
  const [topRight, setTopRight] = useState(false)
  const [helper, setHelper] = useState(true)
  const [bottomRight, setBottomRight] = useState(false)
  const [left, setLeft] = useState(false)
  const [right, setRight] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const attrs = [
    label && `label="${label}"`,
    topRight && 'topRightLabel="Optional"',
    placeholder && `placeholder="${placeholder}"`,
    size !== "sm" && `size="${size}"`,
    status !== "default" && `status="${status}"`,
    helper && `helperText="${HELPER[status]}"`,
    bottomRight && 'bottomRightLabel="0 / 50"',
    left && "leftIcon={<User />}",
    right && "rightIcon={<EyeOff />}",
    disabled && "disabled",
  ].filter(Boolean)
  const code = `<InputField\n  ${attrs.join("\n  ")}\n/>`

  return (
    <Playground
      code={code}
      controls={
        <>
          <Choice label="Size" options={SIZES} value={size} onChange={setSize} />
          <Choice label="Status" options={STATUSES} value={status} onChange={setStatus} />
          <TextSetting id="input-label" label="Label" value={label} onChange={setLabel} />
          <TextSetting id="input-placeholder" label="Placeholder" value={placeholder} onChange={setPlaceholder} />
          <Checks
            label="Options"
            items={[
              ["Helper text", helper, setHelper],
              ["Top right label", topRight, setTopRight],
              ["Bottom right label", bottomRight, setBottomRight],
              ["Left icon", left, setLeft],
              ["Right icon", right, setRight],
              ["Disabled", disabled, setDisabled],
            ]}
          />
        </>
      }
      preview={
        <div className="flex w-full max-w-72 flex-col items-center gap-3">
          <InputField
            id="playground-input"
            size={size}
            status={status}
            label={label || undefined}
            topRightLabel={topRight ? "Optional" : undefined}
            placeholder={placeholder}
            helperText={helper ? HELPER[status] : undefined}
            bottomRightLabel={bottomRight ? `${value.length} / 50` : undefined}
            maxLength={50}
            leftIcon={left ? <User /> : undefined}
            rightIcon={right ? <EyeOff /> : undefined}
            disabled={disabled}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <p className="text-xs text-zinc-500">Click or Tab into the field and type</p>
        </div>
      }
    />
  )
}

function InputMatrix() {
  const [filled, setFilled] = useState<"empty" | "filled">("empty")
  const rows = [...STATUSES.map((s) => [s, s, false] as const), ["disabled", "default", true] as const]

  return (
    <div className="flex flex-col gap-4">
      <Choice label="Show" options={["empty", "filled"] as const} value={filled} onChange={setFilled} />
      <div className="overflow-x-auto rounded-xl border border-zinc-200">
        <table className="w-full min-w-[860px] border-collapse text-left">
          <thead className="bg-zinc-50 font-mono text-[11px] tracking-wide text-zinc-500 uppercase">
            <tr>
              {["state", "sm", "md", "lg"].map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, status, disabled]) => (
              <tr key={name} className="border-t border-zinc-100 align-top">
                <th scope="row" className="px-4 py-4 font-mono text-xs font-normal whitespace-nowrap text-zinc-500">
                  {name}
                </th>
                {SIZES.map((size) => (
                  <td key={size} className="w-64 px-4 py-2">
                    <InputField
                      key={filled}
                      size={size}
                      status={status}
                      disabled={disabled}
                      label="Label"
                      placeholder="Type here"
                      defaultValue={filled === "filled" ? "This is my text" : undefined}
                      helperText="Bottom left label"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function InputShowcase() {
  return (
    <ComponentSection
      id="input"
      index="02"
      title="Input"
      description="A text field with a label, helper text and validation states, from the Figma component “Svitzer input”. Click or Tab into any field to see the focus state; the fields keep their status color while focused."
      stats={[
        [3, "sizes"],
        [4, "statuses"],
        [2, "fill states"],
        [9, "Figma states"],
      ]}
    >
      <SubSection id="input-try" title="Try it">
        <InputPlayground />
      </SubSection>
      <SubSection
        id="input-variants"
        title="All variants"
        note="The same grid as the Figma component set. Focus (and Error_focus, Warning_focus, Success_focus) is live: click into a field."
      >
        <InputMatrix />
      </SubSection>
      <SubSection id="input-mapping" title="From Figma to code">
        <MappingTable rows={MAPPING} />
      </SubSection>
    </ComponentSection>
  )
}
