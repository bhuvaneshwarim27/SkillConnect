
import React, { forwardRef, InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
   10	        ref={ref}
   11	        className={`${styles.input} ${className || ""}`}
   12	        {...props}
   13	      />
   14	    );
   15	  }
   16	);
   17	
   18	Input.displayName = "Input";
   19	
