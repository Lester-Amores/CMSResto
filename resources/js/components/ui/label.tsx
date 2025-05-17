import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Asterisk } from "lucide-react"
import { cn } from "@/lib/utils"

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  required?: boolean
}

function Label({
  className,
  required = false,
  ...props
}: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <div className="flex items-center mb-1">
        {props.children}
        {required && <Asterisk className="text-red-500 ml-1 w-3 h-3" />}
      </div>
    </LabelPrimitive.Root>
  )
}

export { Label }
