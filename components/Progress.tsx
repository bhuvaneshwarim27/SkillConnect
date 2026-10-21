
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import styles from "./Progress.module.css"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
   10	>(({ className, value, ...props }, ref) => (
   11	  <ProgressPrimitive.Root
   12	    ref={ref}
   13	    className={`${styles.progress} ${className ?? ""}`}
   14	    {...props}
   15	  >
   16	    <ProgressPrimitive.Indicator
   17	      className={styles.indicator}
   18	      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
   19	    />
   20	  </ProgressPrimitive.Root>
   21	))
   22	Progress.displayName = ProgressPrimitive.Root.displayName
   23	
   24	export { Progress }
   25	
