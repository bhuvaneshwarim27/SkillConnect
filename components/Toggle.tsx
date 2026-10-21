
"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import styles from "./Toggle.module.css"
import buttonStyles from "./Button.module.css"

export const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
   10	  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
   11	    {
   12	      variant?: "default" | "outline";
   13	      size?: "md" | "sm" | "lg";
   14	    }
   15	>(({ className, variant = "default", size = "md", ...props }, ref) => (
   16	  <TogglePrimitive.Root
   17	    ref={ref}
   18	    className={`${buttonStyles.button} ${styles.toggle} ${styles["toggle-variant-" + variant]} ${styles["toggle-size-" + size]} ${className ?? ""}`}
   19	    {...props}
   20	  />
   21	))
   22	
   23	Toggle.displayName = TogglePrimitive.Root.displayName
   24	
