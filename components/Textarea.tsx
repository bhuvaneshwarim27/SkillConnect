
import React, { forwardRef, TextareaHTMLAttributes } from "react";
import inputStyles from "./Input.module.css";
import styles from "./Textarea.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  disableResize?: boolean;
  variant?: "default" | "clear";
}

   10	export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
   11	  (
   12	    { className, disableResize = false, variant = "default", ...props },
   13	    ref
   14	  ) => {
   15	    const resizeClass = disableResize ? styles.noResize : "";
   16	
   17	    return (
   18	      <textarea
   19	        ref={ref}
   20	        className={`${inputStyles.input} ${styles.textarea} ${resizeClass} ${styles[variant]} ${className || ""}`}
   21	        {...props}
   22	      />
   23	    );
   24	  }
   25	);
   26	
   27	Textarea.displayName = "Textarea";
   28	
