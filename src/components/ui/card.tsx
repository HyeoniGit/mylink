import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva("overflow-hidden text-card-foreground transition-all", {
  variants: {
    variant: {
      default: "rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10 py-4",
      // Nintendo 2001 Chamfered Cut-corner Periwinkle Panel
      chamfered:
        "bg-[#8ba1d4] border-t-2 border-l border-b-2 border-r-2 border-t-white border-l-white border-b-[#3d4f97] border-r-[#3d4f97] [clip-path:polygon(10px_0%,calc(100%-10px)_0%,100%_10px,100%_calc(100%-10px),calc(100%-10px)_100%,10px_100%,0%_calc(100%-10px),0%_10px)] shadow-[0_4px_12px_rgba(0,0,0,0.25)] relative",
      // Nintendo 2001 Standard Metallic Bevel Plate
      beveled:
        "bg-[#7a8aba] border-t-2 border-l border-b-2 border-r-2 border-t-white border-l-white border-b-[#3d4f97] border-r-[#3d4f97] shadow-sm",
      // Nintendo 2001 Platinum List Item Card
      platinum:
        "bg-[#dedede] border-t border-l border-b-2 border-r-2 border-t-white border-l-white border-b-[#3d4f97] border-r-[#3d4f97] text-[#21242e] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 shadow-xs",
      // Recessed / Inset
      inset:
        "bg-white border-t-2 border-l border-b border-r border-t-[#3d4f97] border-l-[#3d4f97] border-b-white border-r-white shadow-inner",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-bold text-base leading-snug tracking-tight", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-4 pt-0", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-4 pt-0", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants }
