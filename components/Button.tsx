
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "outline"
    | "ghost"
   10	    | "link"
   11	    | "secondary"
   12	    | "destructive";
   13	  size?: "sm" | "md" | "lg" | "icon" | "icon-sm" | "icon-md" | "icon-lg";
   14	  asChild?: boolean;
   15	}
   16	
   17	export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   18	  (
   19	    {
   20	      children,
   21	      variant = "primary",
   22	      size = "md",
   23	      asChild = false,
   24	      className,
   25	      disabled,
   26	      type = "button",
   27	      ...props
   28	    },
   29	    ref,
   30	  ) => {
   31	    const Comp = asChild ? Slot : "button";
   32	
   33	    return (
   34	      <Comp
   35	        ref={ref}
   36	        type={type}
   37	        className={`
   38	        ${styles.button} 
   39	        ${styles[variant]} 
   40	        ${styles[size]} 
   41	        ${disabled ? styles.disabled : ""} 
   42	        ${className || ""}
   43	      `}
   44	        disabled={disabled}
   45	        {...props}
   46	      >
   47	        {children}
   48	      </Comp>
   49	    );
   50	  },
   51	);
   52	
   53	Button.displayName = "Button";
   54	
