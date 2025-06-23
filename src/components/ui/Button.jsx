import * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = {
  default: "bg-black text-white hover:bg-neutral-800",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  ghost: "hover:bg-gray-100 hover:text-gray-900",
  link: "underline-offset-4 hover:underline text-blue-600",
}

const sizes = {
  default: "h-12 px-4 py-3",
  sm: "h-9 px-3 text-sm",
  lg: "h-11 px-8 text-lg",
  icon: "h-10 w-10",
}

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    const classes = cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
      buttonVariants[variant],
      sizes[size],
      className
    )

    if (asChild) {
      return <span ref={ref} className={classes} {...props} />
    }

    return <Comp ref={ref} className={classes} {...props} />
  }
)

Button.displayName = "Button"

export { Button }
