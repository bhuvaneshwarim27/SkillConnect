
import React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import styles from "./Separator.module.css";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  decorative?: boolean;
}
   10	
   11	export const Separator = ({
   12	  orientation = "horizontal",
   13	  className = "",
   14	  decorative = true,
   15	}: SeparatorProps) => {
   16	  return (
   17	    <SeparatorPrimitive.Root
   18	      className={`${styles.separator} ${styles[orientation]} ${className ?? ""}`}
   19	      orientation={orientation}
   20	      decorative={decorative}
   21	    />
   22	  );
   23	};
   24	
