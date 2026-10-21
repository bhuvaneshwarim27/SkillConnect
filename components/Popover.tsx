
"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import styles from "./Popover.module.css";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;
   10	
   11	const PopoverContent = React.forwardRef<
   12	  React.ElementRef<typeof PopoverPrimitive.Content>,
   13	  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
   14	    removeBackgroundAndPadding?: boolean;
   15	  }
   16	>(
   17	  (
   18	    {
   19	      className,
   20	      removeBackgroundAndPadding = false,
   21	      align = "center",
   22	      sideOffset = 4,
   23	      ...props
   24	    },
   25	    ref,
   26	  ) => (
   27	    <PopoverPrimitive.Portal>
   28	      <PopoverPrimitive.Content
   29	        ref={ref}
   30	        align={align}
   31	        sideOffset={sideOffset}
   32	        className={`${styles.content} ${removeBackgroundAndPadding ? "" : styles.withBackgroundAndPadding} ${className ?? ""}`}
   33	        {...props}
   34	      />
   35	    </PopoverPrimitive.Portal>
   36	  ),
   37	);
   38	PopoverContent.displayName = PopoverPrimitive.Content.displayName;
   39	
   40	export { Popover, PopoverTrigger, PopoverContent };
   41	
