
"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight } from "lucide-react";
import styles from "./ContextMenu.module.css";

const ContextMenu = ContextMenuPrimitive.Root;

   10	const ContextMenuTrigger = ContextMenuPrimitive.Trigger
   11	
   12	const ContextMenuGroup = ContextMenuPrimitive.Group
   13	
   14	const ContextMenuPortal = ContextMenuPrimitive.Portal
   15	
   16	const ContextMenuSub = ContextMenuPrimitive.Sub
   17	
   18	const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup
   19	
   20	const ContextMenuSubTrigger = React.forwardRef<
   21	  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
   22	  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
   23	    inset?: boolean
   24	  }
   25	>(({ className, inset, children, ...props }, ref) => (
   26	  <ContextMenuPrimitive.SubTrigger
   27	    ref={ref}
   28	    className={`${styles.subTrigger} ${className ?? ""} ${inset ? styles.inset : ""}`}
   29	    {...props}
   30	  >
   31	    {children}
   32	    <ChevronRight className={styles.chevronRightIcon} />
   33	  </ContextMenuPrimitive.SubTrigger>
   34	))
   35	ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName
   36	
   37	const ContextMenuSubContent = React.forwardRef<
   38	  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
   39	  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
   40	>(({ className, ...props }, ref) => (
   41	  <ContextMenuPrimitive.SubContent
   42	    ref={ref}
   43	    className={`${styles.subContent} ${className ?? ""}`}
   44	    {...props}
   45	  />
   46	))
   47	ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName
   48	
   49	const ContextMenuContent = React.forwardRef<
   50	  React.ElementRef<typeof ContextMenuPrimitive.Content>,
   51	  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
   52	>(({ className, ...props }, ref) => (
   53	  <ContextMenuPrimitive.Portal>
   54	    <ContextMenuPrimitive.Content
   55	      ref={ref}
   56	      className={`${styles.content} ${className ?? ""}`}
   57	      {...props}
   58	    />
   59	  </ContextMenuPrimitive.Portal>
   60	))
   61	ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName
   62	
   63	const ContextMenuItem = React.forwardRef<
   64	  React.ElementRef<typeof ContextMenuPrimitive.Item>,
   65	  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
   66	    inset?: boolean
   67	  }
   68	>(({ className, inset, ...props }, ref) => (
   69	  <ContextMenuPrimitive.Item
   70	    ref={ref}
   71	    className={`${styles.item} ${className ?? ""} ${inset ? styles.inset : ""}`}
   72	    {...props}
   73	  />
   74	))
   75	ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName
   76	
   77	const ContextMenuCheckboxItem = React.forwardRef<
   78	  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
   79	  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
   80	>(({ className, children, checked, ...props }, ref) => (
   81	  <ContextMenuPrimitive.CheckboxItem
   82	    ref={ref}
   83	    className={`${styles.checkboxItem} ${className ?? ""}`}
   84	    checked={checked}
   85	    {...props}
   86	  >
   87	    <span className={styles.checkboxItemIndicator}>
   88	      <ContextMenuPrimitive.ItemIndicator>
   89	        <Check className={`${styles.checkIcon}`} />
   90	      </ContextMenuPrimitive.ItemIndicator>
   91	    </span>
   92	    {children}
   93	  </ContextMenuPrimitive.CheckboxItem>
   94	))
   95	ContextMenuCheckboxItem.displayName =
   96	  ContextMenuPrimitive.CheckboxItem.displayName
   97	
   98	const ContextMenuRadioItem = React.forwardRef<
   99	  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  100	  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
  101	>(({ className, children, ...props }, ref) => (
  102	  <ContextMenuPrimitive.RadioItem
  103	    ref={ref}
  104	    className={`${styles.radioItem} ${className ?? ""}`}
  105	    {...props}
  106	  >
  107	    <span className={styles.radioItemIndicator}>
  108	      <ContextMenuPrimitive.ItemIndicator>
  109	        <div className={styles.radioIndicatorCircle} />
  110	      </ContextMenuPrimitive.ItemIndicator>
  111	    </span>
  112	    {children}
  113	  </ContextMenuPrimitive.RadioItem>
  114	))
  115	ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName
  116	
  117	const ContextMenuLabel = React.forwardRef<
  118	  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  119	  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
  120	    inset?: boolean
  121	  }
  122	>(({ className, inset, ...props }, ref) => (
  123	  <ContextMenuPrimitive.Label
  124	    ref={ref}
  125	    className={`${styles.label} ${className ?? ""} ${inset ? styles.inset : ""}`}
  126	    {...props}
  127	  />
  128	))
  129	ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName
  130	
  131	const ContextMenuSeparator = React.forwardRef<
  132	  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  133	  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
  134	>(({ className, ...props }, ref) => (
  135	  <ContextMenuPrimitive.Separator
  136	    ref={ref}
  137	    className={`${styles.separator} ${className ?? ""}`}
  138	    {...props}
  139	  />
  140	))
  141	ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName
  142	
  143	const ContextMenuShortcut = ({
  144	  className,
  145	  ...props
  146	}: React.HTMLAttributes<HTMLSpanElement>) => {
  147	  return (
  148	    <span
  149	      className={`${styles.shortcut} ${className ?? ""}`}
  150	      {...props}
  151	    />
  152	  )
  153	}
  154	ContextMenuShortcut.displayName = "ContextMenuShortcut"
  155	
  156	export {
  157	  ContextMenu,
  158	  ContextMenuTrigger,
  159	  ContextMenuContent,
  160	  ContextMenuItem,
  161	  ContextMenuCheckboxItem,
  162	  ContextMenuRadioItem,
  163	  ContextMenuLabel,
  164	  ContextMenuSeparator,
  165	  ContextMenuShortcut,
  166	  ContextMenuGroup,
  167	  ContextMenuPortal,
  168	  ContextMenuSub,
  169	  ContextMenuSubContent,
  170	  ContextMenuSubTrigger,
  171	  ContextMenuRadioGroup,
  172	}
  173	
