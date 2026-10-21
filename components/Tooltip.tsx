
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import styles from "./Tooltip.module.css";

/**
 * This is already included in the global context providers so should not be rendered again.
 */
const TooltipProvider = TooltipPrimitive.Provider;

   10	const Tooltip = TooltipPrimitive.Root;
   11	
   12	const TooltipTrigger = TooltipPrimitive.Trigger;
   13	
   14	const TooltipContent = React.forwardRef<
   15	  React.ElementRef<typeof TooltipPrimitive.Content>,
   16	  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
   17	>(({ className, sideOffset = 4, ...props }, ref) => (
   18	  <TooltipPrimitive.Portal>
   19	    <TooltipPrimitive.Content
   20	      ref={ref}
   21	      sideOffset={sideOffset}
   22	      className={`${styles.content} ${className || ""}`}
   23	      {...props}
   24	    />
   25	  </TooltipPrimitive.Portal>
   26	));
   27	TooltipContent.displayName = TooltipPrimitive.Content.displayName;
   28	
   29	export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
   30	
