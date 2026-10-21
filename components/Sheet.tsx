
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import styles from "./Sheet.module.css"

const Sheet = SheetPrimitive.Root

   10	const SheetTrigger = SheetPrimitive.Trigger
   11	
   12	const SheetClose = SheetPrimitive.Close
   13	
   14	const SheetPortal = SheetPrimitive.Portal
   15	
   16	const SheetOverlay = React.forwardRef<
   17	  React.ElementRef<typeof SheetPrimitive.Overlay>,
   18	  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
   19	>(({ className, ...props }, ref) => (
   20	  <SheetPrimitive.Overlay
   21	    className={`${styles.overlay} ${className ?? ""}`}
   22	    {...props}
   23	    ref={ref}
   24	  />
   25	))
   26	SheetOverlay.displayName = SheetPrimitive.Overlay.displayName
   27	
   28	interface SheetContentProps
   29	  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
   30	  side?: "top" | "bottom" | "left" | "right";
   31	  /** Render the sheet into this element instead of document.body. */
   32	  container?: React.ComponentPropsWithoutRef<
   33	    typeof SheetPrimitive.Portal
   34	  >["container"];
   35	}
   36	
   37	const SheetContent = React.forwardRef<
   38	  React.ElementRef<typeof SheetPrimitive.Content>,
   39	  SheetContentProps
   40	>(({ side = "right", className, children, container, ...props }, ref) => (
   41	  <SheetPortal container={container}>
   42	    <SheetOverlay />
   43	    <SheetPrimitive.Content
   44	      ref={ref}
   45	      className={`${styles.content} ${styles[side]} ${className ?? ""}`}
   46	      {...props}
   47	    >
   48	      {children}
   49	      <SheetPrimitive.Close className={styles.close}>
   50	        <X className={styles.closeIcon} />
   51	      </SheetPrimitive.Close>
   52	    </SheetPrimitive.Content>
   53	  </SheetPortal>
   54	))
   55	SheetContent.displayName = SheetPrimitive.Content.displayName
   56	
   57	const SheetHeader = ({
   58	  className,
   59	  ...props
   60	}: React.HTMLAttributes<HTMLDivElement>) => (
   61	  <div
   62	    className={`${styles.header} ${className ?? ""}`}
   63	    {...props}
   64	  />
   65	)
   66	SheetHeader.displayName = "SheetHeader"
   67	
   68	const SheetFooter = ({
   69	  className,
   70	  ...props
   71	}: React.HTMLAttributes<HTMLDivElement>) => (
   72	  <div
   73	    className={`${styles.footer} ${className ?? ""}`}
   74	    {...props}
   75	  />
   76	)
   77	SheetFooter.displayName = "SheetFooter"
   78	
   79	const SheetTitle = React.forwardRef<
   80	  React.ElementRef<typeof SheetPrimitive.Title>,
   81	  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
   82	>(({ className, ...props }, ref) => (
   83	  <SheetPrimitive.Title
   84	    ref={ref}
   85	    className={`${styles.title} ${className ?? ""}`}
   86	    {...props}
   87	  />
   88	))
   89	SheetTitle.displayName = SheetPrimitive.Title.displayName
   90	
   91	const SheetDescription = React.forwardRef<
   92	  React.ElementRef<typeof SheetPrimitive.Description>,
   93	  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
   94	>(({ className, ...props }, ref) => (
   95	  <SheetPrimitive.Description
   96	    ref={ref}
   97	    className={`${styles.description} ${className ?? ""}`}
   98	    {...props}
   99	  />
  100	))
  101	SheetDescription.displayName = SheetPrimitive.Description.displayName
  102	
  103	export {
  104	  Sheet,
  105	  SheetPortal,
  106	  SheetOverlay,
  107	  SheetTrigger,
  108	  SheetClose,
  109	  SheetContent,
  110	  SheetHeader,
  111	  SheetFooter,
  112	  SheetTitle,
  113	  SheetDescription,
  114	}
  115	
