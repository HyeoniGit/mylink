import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center font-bold whitespace-nowrap transition-colors select-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs",
        secondary: "border-transparent bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs",
        destructive: "border-transparent bg-destructive text-destructive-foreground rounded-full px-2 py-0.5 text-xs",
        outline: "text-foreground border border-border rounded-full px-2 py-0.5 text-xs",

        // ── Nintendo 2001 Design System Variants (design.md) ──
        amber:
          "bg-[#ecab37] text-[#21242e] border border-white/60 rounded-xs uppercase tracking-wider px-1.5 py-0.5 text-[9px] shadow-xs",
        signal:
          "bg-[#f68d1f] text-white border border-[#ffb266] rounded-xs uppercase tracking-wider px-1.5 py-0.5 text-[9px] shadow-xs",
        carbon:
          "bg-[#21242e] text-white border border-[#4a5166] rounded-xs uppercase tracking-wider px-2 py-0.5 text-[10px] shadow-xs",
        indigo:
          "bg-white/80 text-[#3d4f97] border border-[#3d4f97]/20 rounded-xs px-1.5 py-0.5 text-[10px] font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
