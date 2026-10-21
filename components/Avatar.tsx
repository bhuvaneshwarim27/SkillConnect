
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import styles from "./Avatar.module.css";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
   10	>(({ className, ...props }, ref) => (
   11	  <AvatarPrimitive.Root
   12	    ref={ref}
   13	    className={`${styles.avatar} ${className ?? ""}`}
   14	    {...props}
   15	  />
   16	));
   17	Avatar.displayName = AvatarPrimitive.Root.displayName;
   18	
   19	const AvatarImage = React.forwardRef<
   20	  React.ElementRef<typeof AvatarPrimitive.Image>,
   21	  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
   22	>(({ className, ...props }, ref) => (
   23	  <AvatarPrimitive.Image
   24	    ref={ref}
   25	    className={`${styles.avatarImage} ${className ?? ""}`}
   26	    {...props}
   27	  />
   28	));
   29	AvatarImage.displayName = AvatarPrimitive.Image.displayName;
   30	
   31	const AvatarFallback = React.forwardRef<
   32	  React.ElementRef<typeof AvatarPrimitive.Fallback>,
   33	  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
   34	>(({ className, ...props }, ref) => (
   35	  <AvatarPrimitive.Fallback
   36	    ref={ref}
   37	    className={`${styles.avatarFallback} ${className ?? ""}`}
   38	    {...props}
   39	  />
   40	));
   41	AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
   42	
   43	export { Avatar, AvatarImage, AvatarFallback };
   44	
