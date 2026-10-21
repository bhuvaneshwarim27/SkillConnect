
"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import styles from "./Slider.module.css";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
   10	>(({ className, ...props }, ref) => {
   11	  const isRange =
   12	    (Array.isArray(props.defaultValue) && props.defaultValue.length > 1) ||
   13	    (Array.isArray(props.value) && props.value.length > 1);
   14	
   15	  return (
   16	    <SliderPrimitive.Root
   17	      ref={ref}
   18	      className={`${styles.slider} ${className ?? ""}`}
   19	      {...props}
   20	    >
   21	      <SliderPrimitive.Track className={styles.track}>
   22	        <SliderPrimitive.Range className={styles.range} />
   23	      </SliderPrimitive.Track>
   24	      <SliderPrimitive.Thumb className={styles.thumb} />
   25	      {isRange && <SliderPrimitive.Thumb className={styles.thumb} />}
   26	    </SliderPrimitive.Root>
   27	  );
   28	});
   29	Slider.displayName = SliderPrimitive.Root.displayName;
   30	
   31	export { Slider };
   32	
