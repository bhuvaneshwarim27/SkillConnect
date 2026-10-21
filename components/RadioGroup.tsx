

"use client"
import styles from './RadioGroup.module.css';
import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
 
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
   10	>(({ className, ...props }, ref) => {
   11	  return (
   12	    <RadioGroupPrimitive.Root
   13	      className={`${styles.group} ${className || ''}`}
   14	      {...props}
   15	      ref={ref}
   16	    />
   17	  )
   18	})
   19	RadioGroup.displayName = RadioGroupPrimitive.Root.displayName
   20	 
   21	const RadioGroupItem = React.forwardRef<
   22	  React.ElementRef<typeof RadioGroupPrimitive.Item>,
   23	  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
   24	>(({ className, ...props }, ref) => {
   25	  return (
   26	    <RadioGroupPrimitive.Item
   27	      ref={ref}
   28	      className={`${styles.item} ${className || ''}`}
   29	      {...props}
   30	    >
   31	      <RadioGroupPrimitive.Indicator className={styles.indicator}>
   32	        <div className={styles.indicatorInner} />
   33	      </RadioGroupPrimitive.Indicator>
   34	    </RadioGroupPrimitive.Item>
   35	  )
   36	})
   37	RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName
   38	 
   39	export { RadioGroup, RadioGroupItem }
   40	
