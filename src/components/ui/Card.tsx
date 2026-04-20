import * as React from "react"
import { cn } from "@/src/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)]",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

export { Card }
