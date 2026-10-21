
"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import styles from "./Collapsible.module.css";

const Collapsible = CollapsiblePrimitive.Root;

   10	interface CollapsibleTriggerProps
   11	  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> {
   12	  icon?: React.ReactNode;
   13	}
   14	
   15	const CollapsibleTrigger = React.forwardRef<
   16	  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
   17	  CollapsibleTriggerProps
   18	>(({ className, children, ...props }, ref) => (
   19	  <CollapsiblePrimitive.Trigger
   20	    ref={ref}
   21	    className={`${styles.trigger} ${className || ""}`}
   22	    {...props}
   23	  >
   24	    {children}
   25	  </CollapsiblePrimitive.Trigger>
   26	));
   27	CollapsibleTrigger.displayName = CollapsiblePrimitive.Trigger.displayName;
   28	
   29	const CollapsibleContent = React.forwardRef<
   30	  React.ElementRef<typeof CollapsiblePrimitive.Content>,
   31	  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
   32	>(({ className, children, ...props }, ref) => (
   33	  <CollapsiblePrimitive.Content
   34	    ref={ref}
   35	    className={`${styles.content} ${className || ""}`}
   36	    {...props}
   37	  >
   38	    {children}
   39	  </CollapsiblePrimitive.Content>
   40	));
   41	CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;
   42	
   43	export { Collapsible, CollapsibleTrigger, CollapsibleContent };
   44	
