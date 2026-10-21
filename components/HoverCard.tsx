
"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import styles from "./HoverCard.module.css"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger
   10	
   11	const HoverCardContent = React.forwardRef<
   12	  React.ElementRef<typeof HoverCardPrimitive.Content>,
   13	  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
   14	>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
   15	  <HoverCardPrimitive.Content
   16	    ref={ref}
   17	    align={align}
   18	    sideOffset={sideOffset}
   19	    className={`${styles.content} ${className ?? ""}`}
   20	    {...props}
   21	  />
   22	))
   23	HoverCardContent.displayName = HoverCardPrimitive.Content.displayName
   24	
   25	export { HoverCard, HoverCardTrigger, HoverCardContent }
   26	
