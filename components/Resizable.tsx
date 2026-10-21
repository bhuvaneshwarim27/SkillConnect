
"use client";

import React from "react";
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import styles from "./Resizable.module.css";

export const ResizablePanelGroup = ({
  className,
   10	  ...props
   11	}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
   12	  <ResizablePrimitive.PanelGroup
   13	    className={`${styles.panelGroup} ${className || ""}`}
   14	    {...props}
   15	  />
   16	);
   17	
   18	export const ResizablePanel = ({
   19	  className,
   20	  ...props
   21	}: React.ComponentProps<typeof ResizablePrimitive.Panel>) => (
   22	  <ResizablePrimitive.Panel
   23	    className={`${styles.panel} ${className || ""}`}
   24	    {...props}
   25	  />
   26	);
   27	
   28	export const ResizableHandle = ({
   29	  withHandle = true,
   30	  className,
   31	  ...props
   32	}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
   33	  withHandle?: boolean;
   34	}) => (
   35	  <ResizablePrimitive.PanelResizeHandle
   36	    className={`${styles.resizeHandle} ${className || ""}`}
   37	    {...props}
   38	  >
   39	    {withHandle && (
   40	      <div className={styles.resizeHandleGrip}>
   41	        <GripVertical size={12} strokeWidth={1.5} className={styles.gripIcon} />
   42	      </div>
   43	    )}
   44	  </ResizablePrimitive.PanelResizeHandle>
   45	);
   46	
