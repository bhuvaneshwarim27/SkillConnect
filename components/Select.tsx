
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import inputStyles from "./Input.module.css";
import styles from "./Select.module.css";

const Select = SelectPrimitive.Root;
   10	
   11	const SelectGroup = SelectPrimitive.Group;
   12	
   13	const SelectValue = SelectPrimitive.Value;
   14	
   15	const SelectTrigger = React.forwardRef<
   16	  React.ElementRef<typeof SelectPrimitive.Trigger>,
   17	  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
   18	>(({ children, className, ...props }, ref) => (
   19	  <SelectPrimitive.Trigger
   20	    ref={ref}
   21	    className={`${inputStyles.input} ${styles.selectTrigger} ${className || ""}`}
   22	    {...props}
   23	  >
   24	    {children}
   25	    <SelectPrimitive.Icon asChild>
   26	      <ChevronDown className={styles.selectIcon} />
   27	    </SelectPrimitive.Icon>
   28	  </SelectPrimitive.Trigger>
   29	));
   30	SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
   31	
   32	const SelectScrollUpButton = React.forwardRef<
   33	  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
   34	  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
   35	>(({ className, ...props }, ref) => (
   36	  <SelectPrimitive.ScrollUpButton
   37	    ref={ref}
   38	    className={`${styles.scrollButton} ${className || ""}`}
   39	    {...props}
   40	  >
   41	    <ChevronUp className={styles.scrollIcon} />
   42	  </SelectPrimitive.ScrollUpButton>
   43	));
   44	SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
   45	
   46	const SelectScrollDownButton = React.forwardRef<
   47	  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
   48	  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
   49	>(({ className, ...props }, ref) => (
   50	  <SelectPrimitive.ScrollDownButton
   51	    ref={ref}
   52	    className={`${styles.scrollButton} ${className || ""}`}
   53	    {...props}
   54	  >
   55	    <ChevronDown className={styles.scrollIcon} />
   56	  </SelectPrimitive.ScrollDownButton>
   57	));
   58	SelectScrollDownButton.displayName =
   59	  SelectPrimitive.ScrollDownButton.displayName;
   60	
   61	const SelectContent = React.forwardRef<
   62	  React.ElementRef<typeof SelectPrimitive.Content>,
   63	  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
   64	>(({ children, position = "popper", className, ...props }, ref) => (
   65	  <SelectPrimitive.Portal>
   66	    <SelectPrimitive.Content
   67	      ref={ref}
   68	      position={position}
   69	      className={`${styles.selectContent} ${className || ""}`}
   70	      {...props}
   71	    >
   72	      <SelectScrollUpButton />
   73	      <SelectPrimitive.Viewport className={styles.selectViewport}>
   74	        {children}
   75	      </SelectPrimitive.Viewport>
   76	      <SelectScrollDownButton />
   77	    </SelectPrimitive.Content>
   78	  </SelectPrimitive.Portal>
   79	));
   80	SelectContent.displayName = SelectPrimitive.Content.displayName;
   81	
   82	const SelectLabel = React.forwardRef<
   83	  React.ElementRef<typeof SelectPrimitive.Label>,
   84	  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
   85	>(({ className, ...props }, ref) => (
   86	  <SelectPrimitive.Label
   87	    ref={ref}
   88	    className={`${styles.selectLabel} ${className || ""}`}
   89	    {...props}
   90	  />
   91	));
   92	SelectLabel.displayName = SelectPrimitive.Label.displayName;
   93	
   94	// Note: The value prop of the SelectItem component should not be "". Use a stub value like "_empty" instead.
   95	const SelectItem = React.forwardRef<
   96	  React.ElementRef<typeof SelectPrimitive.Item>,
   97	  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
   98	>(({ children, className, ...props }, ref) => (
   99	  <SelectPrimitive.Item
  100	    ref={ref}
  101	    className={`${styles.selectItem} ${className || ""}`}
  102	    {...props}
  103	  >
  104	    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  105	    <SelectPrimitive.ItemIndicator className={styles.selectItemIndicator}>
  106	      <Check className={styles.checkIcon} />
  107	    </SelectPrimitive.ItemIndicator>
  108	  </SelectPrimitive.Item>
  109	));
  110	SelectItem.displayName = SelectPrimitive.Item.displayName;
  111	
  112	const SelectSeparator = React.forwardRef<
  113	  React.ElementRef<typeof SelectPrimitive.Separator>,
  114	  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
  115	>(({ className, ...props }, ref) => (
  116	  <SelectPrimitive.Separator
  117	    ref={ref}
  118	    className={`${styles.selectSeparator} ${className || ""}`}
  119	    {...props}
  120	  />
  121	));
  122	SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
  123	
  124	export {
  125	  Select,
  126	  SelectGroup,
  127	  SelectValue,
  128	  SelectTrigger,
  129	  SelectContent,
  130	  SelectLabel,
  131	  SelectItem,
  132	  SelectSeparator,
  133	  SelectScrollUpButton,
  134	  SelectScrollDownButton,
  135	};
  136	
