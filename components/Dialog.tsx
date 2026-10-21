
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import styles from "./Dialog.module.css"

const Dialog = DialogPrimitive.Root

   10	const DialogTrigger = DialogPrimitive.Trigger
   11	
   12	const DialogPortal = DialogPrimitive.Portal
   13	
   14	const DialogClose = DialogPrimitive.Close
   15	
   16	const DialogOverlay = React.forwardRef<
   17	  React.ElementRef<typeof DialogPrimitive.Overlay>,
   18	  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
   19	>(({ className, ...props }, ref) => (
   20	  <DialogPrimitive.Overlay
   21	    ref={ref}
   22	    className={`${styles.overlay} ${className || ''}`}
   23	    {...props}
   24	  />
   25	))
   26	DialogOverlay.displayName = DialogPrimitive.Overlay.displayName
   27	
   28	interface DialogContentProps
   29	  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
   30	  /** Render the dialog into this element instead of document.body. */
   31	  container?: React.ComponentPropsWithoutRef<
   32	    typeof DialogPrimitive.Portal
   33	  >["container"];
   34	}
   35	
   36	const DialogContent = React.forwardRef<
   37	  React.ElementRef<typeof DialogPrimitive.Content>,
   38	  DialogContentProps
   39	>(({ className, children, container, ...props }, ref) => (
   40	  <DialogPortal container={container}>
   41	    <DialogOverlay />
   42	    <DialogPrimitive.Content
   43	      ref={ref}
   44	      className={`${styles.content} ${className || ''}`}
   45	      {...props}
   46	    >
   47	      {children}
   48	      <DialogPrimitive.Close className={styles.close}>
   49	        <X className={styles.closeIcon} />
   50	        <span className={styles.screenReaderText}>Close</span>
   51	      </DialogPrimitive.Close>
   52	    </DialogPrimitive.Content>
   53	  </DialogPortal>
   54	))
   55	DialogContent.displayName = DialogPrimitive.Content.displayName
   56	
   57	const DialogHeader = ({
   58	  className,
   59	  ...props
   60	}: React.HTMLAttributes<HTMLDivElement>) => (
   61	  <div
   62	    className={`${styles.header} ${className || ''}`}
   63	    {...props}
   64	  />
   65	)
   66	DialogHeader.displayName = "DialogHeader"
   67	
   68	const DialogFooter = ({
   69	  className,
   70	  ...props
   71	}: React.HTMLAttributes<HTMLDivElement>) => (
   72	  <div
   73	    className={`${styles.footer} ${className || ''}`}
   74	    {...props}
   75	  />
   76	)
   77	DialogFooter.displayName = "DialogFooter"
   78	
   79	const DialogTitle = React.forwardRef<
   80	  React.ElementRef<typeof DialogPrimitive.Title>,
   81	  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
   82	>(({ className, ...props }, ref) => (
   83	  <DialogPrimitive.Title
   84	    ref={ref}
   85	    className={`${styles.title} ${className || ''}`}
   86	    {...props}
   87	  />
   88	))
   89	DialogTitle.displayName = DialogPrimitive.Title.displayName
   90	
   91	const DialogDescription = React.forwardRef<
   92	  React.ElementRef<typeof DialogPrimitive.Description>,
   93	  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
   94	>(({ className, ...props }, ref) => (
   95	  <DialogPrimitive.Description
   96	    ref={ref}
   97	    className={`${styles.description} ${className || ''}`}
   98	    {...props}
   99	  />
  100	))
  101	DialogDescription.displayName = DialogPrimitive.Description.displayName
  102	
  103	export {
  104	  Dialog,
  105	  DialogPortal,
  106	  DialogOverlay,
  107	  DialogTrigger,
  108	  DialogClose,
  109	  DialogContent,
  110	  DialogHeader,
  111	  DialogFooter,
  112	  DialogTitle,
  113	  DialogDescription,
  114	}
  115	
