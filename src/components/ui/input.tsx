/**
 * Input + InputField: coded from the Figma component "Svitzer input" (Figma file "COAST", node 55:61).
 * Needs tokens.css (imported in index.css) for the colors, radius and font.
 *
 * Figma property  →  prop
 *   Size    sm | md | lg                          → size (32 / 36 / 40 px high)
 *   State   Default | Success | Warning | Error   → status ("default" | "success" | "warning" | "error")
 *           Focus, *_focus                        → real browser focus
 *           Disabled                              → disabled
 *   Filled  No | Yes                              → placeholder vs. value (handled by the browser)
 *   Left-icon / Right-icon + icon swap            → leftIcon / rightIcon
 *   Label, Top Right label                        → label, topRightLabel      (InputField only)
 *   Bottom Left label (+ status icon), Bottom Right label → helperText, bottomRightLabel (InputField only)
 *
 * Use <InputField> for the full Figma component (labels + helper text).
 * Use <Input> on its own when the labels live elsewhere (e.g. a search bar).
 */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, OctagonAlert, TriangleAlert } from "lucide-react"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    "flex w-full min-w-0 items-center rounded-md border bg-background",
    "text-sm leading-5 font-normal",
    // resting shadow (Figma: 0 1px 3px, shadow-xs); replaced by the focus ring
    "shadow-[0_1px_3px_var(--shadow-xs)] transition-[border-color,box-shadow] duration-150",
    "focus-within:shadow-none focus-within:ring-3 focus-within:ring-ring-shadow",
    "has-[input:disabled]:cursor-not-allowed has-[input:disabled]:bg-muted has-[input:disabled]:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 gap-1 px-3", // Figma: 32px, padding 4/12, gap 4
        md: "h-9 gap-1.5 px-3", // Figma: 36px, padding 4/12, gap 6
        lg: "h-10 gap-2 px-3", // Figma: 40px, padding 6/12, gap 8
      },
      status: {
        default: "border-input focus-within:border-ring",
        success: "border-success",
        warning: "border-warning",
        error: "border-destructive",
      },
    },
    defaultVariants: {
      size: "sm",
      status: "default",
    },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    /** Icon inside the field, before the text (Figma: Left-icon). Any 16px SVG icon, e.g. from lucide-react. */
    leftIcon?: React.ReactNode
    /** Icon inside the field, after the text (Figma: Right-icon). */
    rightIcon?: React.ReactNode
    /** Extra classes for the bordered box. `className` goes to the <input> itself. */
    containerClassName?: string
  }

function Input({
  className,
  containerClassName,
  size,
  status,
  leftIcon,
  rightIcon,
  type = "text",
  ...props
}: InputProps) {
  return (
    <div data-slot="input-control" className={cn(inputVariants({ size, status }), containerClassName)}>
      {leftIcon}
      <input
        type={type}
        data-slot="input"
        aria-invalid={status === "error" || undefined}
        className={cn(
          "h-full min-w-0 flex-1 bg-transparent text-field-foreground outline-none",
          "placeholder:text-muted-foreground disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
      {rightIcon}
    </div>
  )
}

const STATUS_ICON = { success: Check, warning: TriangleAlert, error: OctagonAlert } as const
const STATUS_COLOR = { success: "text-success", warning: "text-warning", error: "text-destructive" } as const
// Figma: the status icon next to the helper text grows with the field size
const STATUS_ICON_SIZE = { sm: "size-3", md: "size-3.5", lg: "size-4" } as const

type InputFieldProps = InputProps & {
  /** Text above the field (Figma: Label). */
  label?: React.ReactNode
  /** Small text above the field, on the right (Figma: Top Right label), e.g. "Optional". */
  topRightLabel?: React.ReactNode
  /** Text below the field (Figma: Bottom Left label). Gets a status icon when `status` is set. */
  helperText?: React.ReactNode
  /** Small text below the field, on the right (Figma: Bottom Right label), e.g. "0 / 120". */
  bottomRightLabel?: React.ReactNode
  /** Classes for the outer wrapper. */
  fieldClassName?: string
}

function InputField({
  label,
  topRightLabel,
  helperText,
  bottomRightLabel,
  fieldClassName,
  id,
  size,
  status,
  disabled,
  ...props
}: InputFieldProps) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const helperId = helperText ? `${inputId}-helper` : undefined
  const fieldSize = size ?? "sm"
  const fieldStatus = status ?? "default"
  const StatusIcon = fieldStatus === "default" ? null : STATUS_ICON[fieldStatus]
  const statusColor = fieldStatus === "default" ? undefined : STATUS_COLOR[fieldStatus]

  return (
    <div data-slot="input-field" className={cn("flex w-full flex-col", fieldClassName)}>
      {(label || topRightLabel) && (
        <div className={cn("flex items-center gap-2 p-1", disabled && "opacity-50")}>
          {label && (
            <label htmlFor={inputId} className="flex-1 text-sm leading-5 font-medium text-field-foreground">
              {label}
            </label>
          )}
          {topRightLabel && (
            <span className="ml-auto text-xs leading-4 text-muted-foreground/80">{topRightLabel}</span>
          )}
        </div>
      )}

      <Input
        id={inputId}
        size={size}
        status={status}
        disabled={disabled}
        aria-describedby={helperId}
        {...props}
      />

      {(helperText || bottomRightLabel) && (
        <div className={cn("flex items-center gap-2 px-1 pt-1.5 pb-1", disabled && "opacity-50")}>
          {helperText && (
            <p id={helperId} className="flex flex-1 items-center gap-1 text-xs leading-4 text-muted-foreground/80">
              {StatusIcon && (
                <StatusIcon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={cn("shrink-0", STATUS_ICON_SIZE[fieldSize], statusColor)}
                />
              )}
              {helperText}
            </p>
          )}
          {bottomRightLabel && (
            <span className="ml-auto text-xs leading-4 text-muted-foreground/80">{bottomRightLabel}</span>
          )}
        </div>
      )}
    </div>
  )
}

export { Input, InputField, inputVariants }
export type { InputProps, InputFieldProps }
