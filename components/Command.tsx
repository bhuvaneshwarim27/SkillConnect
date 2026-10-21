
"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"
import { Dialog, DialogContent } from "./Dialog"
import styles from "./Command.module.css"

   10	const Command = React.forwardRef<
   11	  React.ElementRef<typeof CommandPrimitive>,
   12	  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
   13	>(({ className, ...props }, ref) => (
   14	  <CommandPrimitive
   15	    ref={ref}
   16	    className={`${styles.command} ${className ?? ""}`}
   17	    {...props}
   18	  />
   19	))
   20	Command.displayName = CommandPrimitive.displayName
   21	
   22	const CommandDialog = ({ children, ...props }: DialogProps) => {
   23	  return (
   24	    <Dialog {...props}>
   25	      <DialogContent className={styles.CommandDialogContent}>
   26	        <Command className={styles.commandInDialog}>
   27	          {children}
   28	        </Command>
   29	      </DialogContent>
   30	    </Dialog>
   31	  )
   32	}
   33	
   34	const CommandInput = React.forwardRef<
   35	  React.ElementRef<typeof CommandPrimitive.Input>,
   36	  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
   37	>(({ className, ...props }, ref) => (
   38	  <div className={styles.cmdkInputWrapper}>
   39	    <Search className={styles.cmdkInputWrapperSearchIcon} />
   40	    <CommandPrimitive.Input
   41	      ref={ref}
   42	      className={`${styles.cmdkInput} ${className ?? ""}`}
   43	      {...props}
   44	    />
   45	  </div>
   46	))
   47	
   48	CommandInput.displayName = CommandPrimitive.Input.displayName
   49	
   50	const CommandList = React.forwardRef<
   51	  React.ElementRef<typeof CommandPrimitive.List>,
   52	  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
   53	>(({ className, ...props }, ref) => (
   54	  <CommandPrimitive.List
   55	    ref={ref}
   56	    className={`${styles.commandList} ${className ?? ""}`}
   57	    {...props}
   58	  />
   59	))
   60	
   61	CommandList.displayName = CommandPrimitive.List.displayName
   62	
   63	const CommandEmpty = React.forwardRef<
   64	  React.ElementRef<typeof CommandPrimitive.Empty>,
   65	  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
   66	>((props, ref) => (
   67	  <CommandPrimitive.Empty
   68	    ref={ref}
   69	    className={styles.commandEmpty}
   70	    {...props}
   71	  />
   72	))
   73	
   74	CommandEmpty.displayName = CommandPrimitive.Empty.displayName
   75	
   76	const CommandGroup = React.forwardRef<
   77	  React.ElementRef<typeof CommandPrimitive.Group>,
   78	  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
   79	>(({ className, ...props }, ref) => (
   80	  <CommandPrimitive.Group
   81	    ref={ref}
   82	    className={`${styles.commandGroup} ${className ?? ""}`}
   83	    {...props}
   84	  />
   85	))
   86	
   87	CommandGroup.displayName = CommandPrimitive.Group.displayName
   88	
   89	const CommandSeparator = React.forwardRef<
   90	  React.ElementRef<typeof CommandPrimitive.Separator>,
   91	  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
   92	>(({ className, ...props }, ref) => (
   93	  <CommandPrimitive.Separator
   94	    ref={ref}
   95	    className={`${styles.commandSeparator} ${className ?? ""}`}
   96	    {...props}
   97	  />
   98	))
   99	CommandSeparator.displayName = CommandPrimitive.Separator.displayName
  100	
  101	const CommandItem = React.forwardRef<
  102	  React.ElementRef<typeof CommandPrimitive.Item>,
  103	  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
  104	>(({ className, ...props }, ref) => (
  105	  <CommandPrimitive.Item
  106	    ref={ref}
  107	    className={`${styles.commandItem} ${className ?? ""}`}
  108	    {...props}
  109	  />
  110	))
  111	
  112	CommandItem.displayName = CommandPrimitive.Item.displayName
  113	
  114	const CommandShortcut = ({
  115	  className,
  116	  ...props
  117	}: React.HTMLAttributes<HTMLSpanElement>) => {
  118	  return (
  119	    <span
  120	      className={`${styles.commandShortcut} ${className ?? ""}`}
  121	      {...props}
  122	    />
  123	  )
  124	}
  125	CommandShortcut.displayName = "CommandShortcut"
  126	
  127	export {
  128	  Command,
  129	  CommandDialog,
  130	  CommandInput,
  131	  CommandList,
  132	  CommandEmpty,
  133	  CommandGroup,
  134	  CommandItem,
  135	  CommandShortcut,
  136	  CommandSeparator,
  137	}
  138	
