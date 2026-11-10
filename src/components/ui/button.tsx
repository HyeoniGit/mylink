import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center text-sm font-medium whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80 rounded-lg",
        outline:
          "border border-border bg-background hover:bg-muted hover:text-foreground rounded-lg",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg",
        ghost: "hover:bg-muted hover:text-foreground rounded-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg",
        link: "text-primary underline-offset-4 hover:underline",

        // ── Nintendo 2001 Design System Variants (design.md) ──
        amber:
          "bg-[#ecab37] text-[#21242e] border-t-2 border-l border-b-2 border-r-2 border-t-[#ffde7a] border-l-[#ffde7a] border-b-[#a66f12] border-r-[#a66f12] font-bold uppercase tracking-wider rounded-xs hover:bg-[#ffbe4a] active:bg-[#e48600] active:border-t-2 active:border-l active:border-b active:border-r active:border-t-[#a66f12] active:border-l-[#a66f12] active:border-b-[#ffde7a] active:border-r-[#ffde7a] shadow-xs",
        signal:
          "bg-[#f68d1f] text-white border-t-2 border-l border-b-2 border-r-2 border-t-[#ffb266] border-l-[#ffb266] border-b-[#9e4b02] border-r-[#9e4b02] font-bold uppercase tracking-wider rounded-xs hover:bg-[#ff9e3b] active:bg-[#e48600] active:border-t-2 active:border-l active:border-b active:border-r active:border-t-[#9e4b02] active:border-l-[#9e4b02] active:border-b-[#ffb266] active:border-r-[#ffb266] shadow-xs",
        carbon:
          "bg-[#21242e] text-white border-t-2 border-l border-b-2 border-r-2 border-t-[#4a5166] border-l-[#4a5166] border-b-[#0e1014] border-r-[#0e1014] font-bold uppercase tracking-wider rounded-none hover:bg-[#323746] active:bg-[#16181f] shadow-xs",
        arrow:
          "w-6 h-6 rounded-full bg-[#f68d1f] text-white p-0 flex items-center justify-center hover:bg-[#ff9e3b] active:scale-95 shadow-xs border-0",
      },
      size: {
        default: "h-8 gap-1.5 px-3 text-xs",
        xs: "h-6 gap-1 px-2 text-[10px]",
        sm: "h-7 gap-1 px-2.5 text-xs",
        lg: "h-9 gap-2 px-4 text-sm",
        icon: "size-8",
        "icon-sm": "size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
