
"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import toggleStyles from "./Toggle.module.css"
import styles from "./ToggleGroup.module.css"

type VariantProps = {
  variant?: "default" | "outline";
   10	  size?: "sm" | "md" | "lg" | "icon" | "icon-sm" | "icon-md" | "icon-lg";
   11	}
   12	
   13	const ToggleGroupContext = React.createContext<VariantProps>({
   14	  size: "md",
   15	  variant: "default",
   16	})
   17	
   18	const ToggleGroup = React.forwardRef<
   19	  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
   20	  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
   21	    VariantProps
   22	>(({ className, variant = "default", size = "md", children, ...props }, ref) => (
   23	  <ToggleGroupPrimitive.Root
   24	    ref={ref}
   25	    className={`${styles.toggleGroup} ${className ?? ""}`}
   26	    {...props}
   27	  >
   28	    <ToggleGroupContext.Provider value={{ variant, size }}>
   29	      {children}
   30	    </ToggleGroupContext.Provider>
   31	  </ToggleGroupPrimitive.Root>
   32	))
   33	
   34	ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName
   35	
   36	const ToggleGroupItem = React.forwardRef<
   37	  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
   38	  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
   39	    VariantProps
   40	>(({ className, children, variant, size, ...props }, ref) => {
   41	  const { variant: groupVariant, size: groupSize } = React.useContext(ToggleGroupContext)
   42	
   43	  return (
   44	    <ToggleGroupPrimitive.Item
   45	      ref={ref}
   46	      className={`${toggleStyles.toggle} ${toggleStyles["toggle-variant-" + (variant ?? groupVariant)]} ${toggleStyles["toggle-size-" + (size ?? groupSize)]} ${className ?? ""}`}
   47	      {...props}
   48	    >
   49	      {children}
   50	    </ToggleGroupPrimitive.Item>
   51	  )
   52	})
   53	
   54	ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName
   55	
   56	export { ToggleGroup, ToggleGroupItem }
   57	
