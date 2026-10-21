
import React from "react";
import styles from "./Spinner.module.css";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
   10	  className,
   11	  ...props
   12	}) => {
   13	  return (
   14	    <div
   15	      className={`${styles.spinner} ${styles[size]} ${className || ""}`}
   16	      {...props}
   17	      role="status"
   18	    >
   19	      <div className={styles.spinnerInner}></div>
   20	    </div>
   21	  );
   22	};
   23	
