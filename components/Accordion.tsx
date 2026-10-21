
"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import styles from "./Accordion.module.css";

const Accordion = AccordionPrimitive.Root;

   10	const AccordionItem = React.forwardRef<
   11	  React.ElementRef<typeof AccordionPrimitive.Item>,
   12	  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
   13	>(({ className, ...props }, ref) => (
   14	  <AccordionPrimitive.Item
   15	    ref={ref}
   16	    className={`${styles.item} ${className || ""}`}
   17	    {...props}
   18	  />
   19	));
   20	AccordionItem.displayName = "AccordionItem";
   21	
   22	const AccordionTrigger = React.forwardRef<
   23	  React.ElementRef<typeof AccordionPrimitive.Trigger>,
   24	  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
   25	>(({ className, children, ...props }, ref) => (
   26	  <AccordionPrimitive.Header className={styles.header}>
   27	    <AccordionPrimitive.Trigger
   28	      ref={ref}
   29	      className={`${styles.trigger} ${className || ""}`}
   30	      {...props}
   31	    >
   32	      {children}
   33	      <ChevronDown className={styles.icon} />
   34	    </AccordionPrimitive.Trigger>
   35	  </AccordionPrimitive.Header>
   36	));
   37	AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
   38	
   39	const AccordionContent = React.forwardRef<
   40	  React.ElementRef<typeof AccordionPrimitive.Content>,
   41	  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
   42	>(({ className, children, ...props }, ref) => (
   43	  <AccordionPrimitive.Content
   44	    ref={ref}
   45	    className={`${styles.content} ${className || ""}`}
   46	    {...props}
   47	  >
   48	    <div className={styles.contentInner}>{children}</div>
   49	  </AccordionPrimitive.Content>
   50	));
   51	
   52	AccordionContent.displayName = AccordionPrimitive.Content.displayName;
   53	
   54	export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
   55	
