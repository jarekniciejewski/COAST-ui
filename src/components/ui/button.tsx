/**
 * Button: coded from the Figma component "Button" (Camera Store – Option B, node 17:229).
 * Replaces the default shadcn/ui button at src/components/ui/button.tsx.
 * Needs tokens.css (imported in index.css) for the colors, radius and font.
 *
 * Figma property  →  prop
 *   style  primary | secondary | tertiary           → variant
 *          …_success | …_warning | …_error/_destructive → tone
 *   size   sm | lg                                  → size
 *   state  enabled | hover | active | focus | disable → real browser states
 *          (:hover, :active, :focus-visible, disabled attribute)
 *   Left Icon / Right Icon + icon swap              → leftIcon / rightIcon
 *   label                                           → children
 */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "rounded-md border",
    "font-sans text-sm leading-5 font-medium active:font-bold",
    "transition-[opacity,background-color,border-color,box-shadow] duration-150",
    "outline-none focus-visible:ring-3 focus-visible:ring-ring-shadow focus-visible:opacity-90",
    "active:opacity-100",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // primary: filled, border invisible until focus
        primary: "border-transparent hover:opacity-90",
        // secondary: always outlined; the border color comes from `tone` (see compoundVariants)
        secondary:
          "text-foreground hover:opacity-80 hover:bg-accent active:bg-accent focus-visible:bg-accent-subtle",
        // tertiary: text only, border appears on hover / press / focus
        tertiary:
          "border-transparent text-foreground hover:opacity-80 active:bg-accent focus-visible:bg-accent-subtle",
      },
      tone: {
        default: "",
        success: "",
        warning: "",
        destructive: "",
      },
      size: {
        // Figma strokes sit inside the frame, so horizontal padding is Figma padding minus the 1px border
        sm: "h-8 gap-1.5 px-[11px]", // 32px high, padding 6/12, gap 6
        lg: "h-10 gap-2 px-[23px]", // 40px high, padding 10/24, gap 8
      },
    },
    compoundVariants: [
      // primary: filled
      { variant: "primary", tone: "default", class: "bg-primary text-primary-foreground focus-visible:border-ring" },
      { variant: "primary", tone: "success", class: "bg-success text-success-foreground focus-visible:border-success-ring" },
      { variant: "primary", tone: "warning", class: "bg-warning text-warning-foreground focus-visible:border-warning-ring" },
      { variant: "primary", tone: "destructive", class: "bg-destructive text-destructive-foreground focus-visible:border-destructive-ring" },

      // secondary: outlined
      { variant: "secondary", tone: "default", class: "border-border hover:border-border-hover active:border-border focus-visible:border-ring" },
      { variant: "secondary", tone: "success", class: "border-success" },
      { variant: "secondary", tone: "warning", class: "border-warning" },
      { variant: "secondary", tone: "destructive", class: "border-destructive" },

      // tertiary: text only, border appears on interaction
      { variant: "tertiary", tone: "default", class: "hover:border-border-hover active:border-border focus-visible:border-ring" },
      { variant: "tertiary", tone: "success", class: "hover:border-success active:border-success focus-visible:border-success" },
      { variant: "tertiary", tone: "warning", class: "hover:border-warning active:border-warning focus-visible:border-warning" },
      { variant: "tertiary", tone: "destructive", class: "hover:border-destructive active:border-destructive focus-visible:border-destructive" },
    ],
    defaultVariants: {
      variant: "primary",
      tone: "default",
      size: "sm",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Icon before the label (Figma: Left Icon). Any 16px SVG icon, e.g. from lucide-react. */
    leftIcon?: React.ReactNode
    /** Icon after the label (Figma: Right Icon). */
    rightIcon?: React.ReactNode
  }

function Button({
  className,
  variant,
  tone,
  size,
  leftIcon,
  rightIcon,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ variant, tone, size }), className)}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
