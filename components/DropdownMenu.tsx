
"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight } from "lucide-react";
import styles from "./DropdownMenu.module.css";

const DropdownMenu = DropdownMenuPrimitive.Root;

   10	const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
   11	
   12	const DropdownMenuGroup = DropdownMenuPrimitive.Group;
   13	
   14	const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
   15	
   16	const DropdownMenuSub = DropdownMenuPrimitive.Sub;
   17	
   18	const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
   19	
   20	const DropdownMenuSubTrigger = React.forwardRef<
   21	  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
   22	  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
   23	    inset?: boolean;
   24	  }
   25	>(({ className, inset, children, ...props }, ref) => (
   26	  <DropdownMenuPrimitive.SubTrigger
   27	    ref={ref}
   28	    className={`${styles.subTrigger} ${inset ? styles.inset : ""} ${className || ""}`}
   29	    {...props}
   30	  >
   31	    {children}
   32	    <ChevronRight className={styles.subTriggerIcon} />
   33	  </DropdownMenuPrimitive.SubTrigger>
   34	));
   35	DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
   36	
   37	const DropdownMenuSubContent = React.forwardRef<
   38	  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
   39	  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
   40	>(({ className, ...props }, ref) => (
   41	  <DropdownMenuPrimitive.SubContent
   42	    ref={ref}
   43	    className={`${styles.subContent} ${className || ""}`}
   44	    {...props}
   45	  />
   46	));
   47	DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
   48	
   49	const DropdownMenuContent = React.forwardRef<
   50	  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
   51	  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
   52	>(({ className, sideOffset = 4, ...props }, ref) => (
   53	  <DropdownMenuPrimitive.Portal>
   54	    <DropdownMenuPrimitive.Content
   55	      ref={ref}
   56	      sideOffset={sideOffset}
   57	      className={`${styles.content} ${className || ""}`}
   58	      {...props}
   59	    />
   60	  </DropdownMenuPrimitive.Portal>
   61	));
   62	DropdownMenuContent.displayName = "DropdownMenuContent";
   63	
   64	const DropdownMenuItem = React.forwardRef<
   65	  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
   66	  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
   67	    inset?: boolean;
   68	  }
   69	>(({ className, inset, ...props }, ref) => (
   70	  <DropdownMenuPrimitive.Item
   71	    ref={ref}
   72	    className={`${styles.item} ${inset ? styles.inset : ""} ${className || ""}`}
   73	    {...props}
   74	  />
   75	));
   76	DropdownMenuItem.displayName = "DropdownMenuItem";
   77	
   78	const DropdownMenuCheckboxItem = React.forwardRef<
   79	  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
   80	  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
   81	>(({ className, children, checked, ...props }, ref) => (
   82	  <DropdownMenuPrimitive.CheckboxItem
   83	    ref={ref}
   84	    className={`${styles.checkboxItem} ${className || ""}`}
   85	    checked={checked}
   86	    {...props}
   87	  >
   88	    <span className={styles.checkboxIndicator}>
   89	      <DropdownMenuPrimitive.ItemIndicator>
   90	        <Check />
   91	      </DropdownMenuPrimitive.ItemIndicator>
   92	    </span>
   93	    {children}
   94	  </DropdownMenuPrimitive.CheckboxItem>
   95	));
   96	DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
   97	
   98	const DropdownMenuRadioItem = React.forwardRef<
   99	  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  100	  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
  101	>(({ className, children, ...props }, ref) => (
  102	  <DropdownMenuPrimitive.RadioItem
  103	    ref={ref}
  104	    className={`${styles.radioItem} ${className || ""}`}
  105	    {...props}
  106	  >
  107	    <span className={styles.radioIndicator}>
  108	      <DropdownMenuPrimitive.ItemIndicator>
  109	        <div className={styles.radioIndicatorCircle} />
  110	      </DropdownMenuPrimitive.ItemIndicator>
  111	    </span>
  112	    {children}
  113	  </DropdownMenuPrimitive.RadioItem>
  114	));
  115	DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
  116	
  117	const DropdownMenuLabel = React.forwardRef<
  118	  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  119	  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
  120	    inset?: boolean;
  121	  }
  122	>(({ className, inset, ...props }, ref) => (
  123	  <DropdownMenuPrimitive.Label
  124	    ref={ref}
  125	    className={`${styles.label} ${inset ? styles.inset : ""} ${className || ""}`}
  126	    {...props}
  127	  />
  128	));
  129	DropdownMenuLabel.displayName = "DropdownMenuLabel";
  130	
  131	const DropdownMenuSeparator = React.forwardRef<
  132	  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  133	  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
  134	>(({ className, ...props }, ref) => (
  135	  <DropdownMenuPrimitive.Separator
  136	    ref={ref}
  137	    className={`${styles.separator} ${className || ""}`}
  138	    {...props}
  139	  />
  140	));
  141	DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
  142	
  143	const DropdownMenuShortcut = ({
  144	  className,
  145	  ...props
  146	}: React.HTMLAttributes<HTMLSpanElement>) => {
  147	  return (
  148	    <span className={`${styles.shortcut} ${className || ""}`} {...props} />
  149	  );
  150	};
  151	DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
  152	
  153	export {
  154	  DropdownMenu,
  155	  DropdownMenuTrigger,
  156	  DropdownMenuContent,
  157	  DropdownMenuItem,
  158	  DropdownMenuCheckboxItem,
  159	  DropdownMenuRadioItem,
  160	  DropdownMenuLabel,
  161	  DropdownMenuSeparator,
  162	  DropdownMenuShortcut,
  163	  DropdownMenuGroup,
  164	  DropdownMenuPortal,
  165	  DropdownMenuSub,
  166	  DropdownMenuSubContent,
  167	  DropdownMenuSubTrigger,
  168	  DropdownMenuRadioGroup,
  169	};
  170	
