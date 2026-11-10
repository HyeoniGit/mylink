import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "w-full min-w-0 text-xs transition-colors outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "h-8 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm",
        // Nintendo 2001 Inset Bevel (Recessed into canvas)
        bevel:
          "h-8 bg-white border-t-2 border-l border-b border-r border-t-[#3d4f97] border-l-[#3d4f97] border-b-white border-r-white shadow-inner px-2.5 py-1 text-xs text-[#21242e] rounded-xs placeholder:text-[#60619c]/60 focus:ring-1 focus:ring-[#3d4f97]",
      },
    },
    defaultVariants: {
      variant: "bevel",
    },
  }
)

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

function Input({ className, type, variant, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
