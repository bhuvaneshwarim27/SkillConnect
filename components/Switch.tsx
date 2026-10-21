
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import styles from "./Switch.module.css"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
   10	>(({ className, ...props }, ref) => (
   11	  <SwitchPrimitives.Root
   12	    className={`${styles.root} ${className ?? ""}`}
   13	    {...props}
   14	    ref={ref}
   15	  >
   16	    <SwitchPrimitives.Thumb
   17	      className={`${styles.thumb} ${className ?? ""}`}
   18	    />
   19	  </SwitchPrimitives.Root>
   20	))
   21	Switch.displayName = SwitchPrimitives.Root.displayName
   22	
   23	export { Switch }
   24	
