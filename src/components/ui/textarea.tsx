import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "w-full min-w-0 text-xs transition-colors outline-none disabled:pointer-events-none disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default:
          "rounded-lg border border-input bg-transparent px-2.5 py-2 text-base placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm",
        bevel:
          "bg-white border-t-2 border-l border-b border-r border-t-[#3d4f97] border-l-[#3d4f97] border-b-white border-r-white shadow-inner px-2.5 py-1.5 text-xs text-[#21242e] rounded-xs placeholder:text-[#60619c]/60 focus:ring-1 focus:ring-[#3d4f97]",
      },
    },
    defaultVariants: {
      variant: "bevel",
    },
  }
)

export interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {}

function Textarea({ className, variant, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
