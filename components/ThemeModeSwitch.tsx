
"use client";

import React from "react";
import { Sun, Moon, SunMoon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
   10	} from "./DropdownMenu";
   11	import { Button } from "./Button";
   12	import { useThemeMode, ThemeMode } from "../helpers/themeMode";
   13	import styles from "./ThemeModeSwitch.module.css";
   14	
   15	export interface ThemeModeSwitchProps {
   16	  /**
   17	   * Optional CSS class to apply to the component
   18	   */
   19	  className?: string;
   20	}
   21	
   22	// Note: if the current style only supports one mode (light or dark), we will need to
   23	// first update the global style to support 2 modes before using this component.
   24	export const ThemeModeSwitch = ({ className }: ThemeModeSwitchProps) => {
   25	  const { mode, switchToLightMode, switchToDarkMode, switchToAutoMode } =
   26	    useThemeMode();
   27	
   28	  const applyThemeMode = (newMode: ThemeMode) => {
   29	    switch (newMode) {
   30	      case "light":
   31	        switchToLightMode();
   32	        break;
   33	      case "dark":
   34	        switchToDarkMode();
   35	        break;
   36	      case "auto":
   37	        switchToAutoMode();
   38	        break;
   39	    }
   40	  };
   41	
   42	  const getThemeIcon = () => {
   43	    switch (mode) {
   44	      case "light":
   45	        return <Sun className={styles.icon} />;
   46	      case "dark":
   47	        return <Moon className={styles.icon} />;
   48	      case "auto":
   49	        return <SunMoon className={styles.icon} />;
   50	      default:
   51	        return <Sun className={styles.icon} />;
   52	    }
   53	  };
   54	
   55	  return (
   56	    <div className={`${styles.container} ${className || ""}`}>
   57	      <DropdownMenu>
   58	        <DropdownMenuTrigger asChild>
   59	          <Button
   60	            variant="ghost"
   61	            size="icon-md"
   62	            aria-label={`Current theme: ${mode}. Click to change theme`}
   63	            className={styles.themeButton}
   64	          >
   65	            {getThemeIcon()}
   66	          </Button>
   67	        </DropdownMenuTrigger>
   68	        <DropdownMenuContent align="end">
   69	          <DropdownMenuItem
   70	            className={mode === "light" ? styles.activeItem : ""}
   71	            onClick={() => applyThemeMode("light")}
   72	          >
   73	            <Sun size={16} className={styles.menuIcon} />
   74	            Light
   75	            {mode === "light" && <span className={styles.checkmark}>✓</span>}
   76	          </DropdownMenuItem>
   77	          <DropdownMenuItem
   78	            className={mode === "dark" ? styles.activeItem : ""}
   79	            onClick={() => applyThemeMode("dark")}
   80	          >
   81	            <Moon size={16} className={styles.menuIcon} />
   82	            Dark
   83	            {mode === "dark" && <span className={styles.checkmark}>✓</span>}
   84	          </DropdownMenuItem>
   85	          <DropdownMenuItem
   86	            className={mode === "auto" ? styles.activeItem : ""}
   87	            onClick={() => applyThemeMode("auto")}
   88	          >
   89	            <SunMoon size={16} className={styles.menuIcon} />
   90	            Auto
   91	            {mode === "auto" && <span className={styles.checkmark}>✓</span>}
   92	          </DropdownMenuItem>
   93	        </DropdownMenuContent>
   94	      </DropdownMenu>
   95	    </div>
   96	  );
   97	};
   98	
