
"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import styles from "./Tabs.module.css";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
   10	  React.ElementRef<typeof TabsPrimitive.List>,
   11	  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
   12	>(({ className, ...props }, ref) => (
   13	  <TabsPrimitive.List
   14	    ref={ref}
   15	    className={`${styles.tabsList} ${className || ""}`}
   16	    {...props}
   17	  />
   18	));
   19	TabsList.displayName = TabsPrimitive.List.displayName;
   20	
   21	const TabsTrigger = React.forwardRef<
   22	  React.ElementRef<typeof TabsPrimitive.Trigger>,
   23	  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
   24	>(({ className, ...props }, ref) => (
   25	  <TabsPrimitive.Trigger
   26	    ref={ref}
   27	    className={`${styles.tabsTrigger} ${className || ""}`}
   28	    {...props}
   29	  />
   30	));
   31	TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
   32	
   33	const TabsContent = React.forwardRef<
   34	  React.ElementRef<typeof TabsPrimitive.Content>,
   35	  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
   36	>(({ className, ...props }, ref) => (
   37	  <TabsPrimitive.Content
   38	    ref={ref}
   39	    className={`${styles.tabsContent} ${className || ""}`}
   40	    {...props}
   41	  />
   42	));
   43	TabsContent.displayName = TabsPrimitive.Content.displayName;
   44	
   45	export { Tabs, TabsList, TabsTrigger, TabsContent };
   46	
