
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";

   10	export type ThemeMode = "light" | "dark" | "auto";
   11	
   12	// Event mechanism to sync standalone functions with React Context
   13	type ThemeChangeListener = (mode: ThemeMode) => void;
   14	const listeners = new Set<ThemeChangeListener>();
   15	
   16	function notifyThemeChange() {
   17	  const mode = getCurrentThemeMode();
   18	  listeners.forEach((listener) => listener(mode));
   19	}
   20	
   21	function subscribeToThemeChange(listener: ThemeChangeListener) {
   22	  listeners.add(listener);
   23	  return () => {
   24	    listeners.delete(listener);
   25	  };
   26	}
   27	
   28	function updateTheme(darkPreferred: boolean): void {
   29	  if (darkPreferred) {
   30	    document.body.classList.add("dark");
   31	  } else {
   32	    document.body.classList.remove("dark");
   33	  }
   34	}
   35	
   36	let currentMediaQuery: MediaQueryList | null = null;
   37	
   38	/**
   39	 * Switch to dark mode by adding the "dark" class to document.body.
   40	 */
   41	export function switchToDarkMode(): void {
   42	  // Clear any auto mode listener if present.
   43	  if (currentMediaQuery) {
   44	    currentMediaQuery.onchange = null;
   45	    currentMediaQuery = null;
   46	  }
   47	  document.body.classList.add("dark");
   48	  notifyThemeChange();
   49	}
   50	
   51	/**
   52	 * Switch to light mode by removing the "dark" class from document.body.
   53	 */
   54	export function switchToLightMode(): void {
   55	  // Clear any auto mode listener if present.
   56	  if (currentMediaQuery) {
   57	    currentMediaQuery.onchange = null;
   58	    currentMediaQuery = null;
   59	  }
   60	  document.body.classList.remove("dark");
   61	  notifyThemeChange();
   62	}
   63	
   64	/**
   65	 * Switch to auto mode. This function immediately applies the user's color scheme preference
   66	 * and listens for system preference changes to update the theme automatically.
   67	 * It uses the onchange property instead of addEventListener to avoid TypeScript issues.
   68	 */
   69	export function switchToAutoMode(): void {
   70	  if (currentMediaQuery) {
   71	    currentMediaQuery.onchange = null;
   72	  }
   73	  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
   74	  mediaQuery.onchange = (e: MediaQueryListEvent) => {
   75	    updateTheme(e.matches);
   76	  };
   77	  currentMediaQuery = mediaQuery;
   78	  updateTheme(mediaQuery.matches);
   79	  notifyThemeChange();
   80	}
   81	
   82	/**
   83	 * Returns the current theme mode:
   84	 * - "auto" if auto mode is enabled,
   85	 * - "dark" if the document body has the "dark" class,
   86	 * - "light" otherwise.
   87	 */
   88	export function getCurrentThemeMode(): ThemeMode {
   89	  if (currentMediaQuery) {
   90	    return "auto";
   91	  }
   92	  return document.body.classList.contains("dark") ? "dark" : "light";
   93	}
   94	
   95	// -- React Context & Provider --
   96	
   97	interface ThemeModeContextValue {
   98	  mode: ThemeMode;
   99	  switchToDarkMode: () => void;
  100	  switchToLightMode: () => void;
  101	  switchToAutoMode: () => void;
  102	}
  103	
  104	const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);
  105	
  106	export function ThemeModeProvider({ children }: { children: ReactNode }) {
  107	  const [mode, setMode] = useState<ThemeMode>(() => getCurrentThemeMode());
  108	
  109	  useEffect(() => {
  110	    // Subscribe to changes triggered by standalone functions
  111	    const unsubscribe = subscribeToThemeChange((newMode) => {
  112	      setMode(newMode);
  113	    });
  114	    return unsubscribe;
  115	  }, []);
  116	
  117	  const value = useMemo(
  118	    () => ({
  119	      mode,
  120	      switchToDarkMode,
  121	      switchToLightMode,
  122	      switchToAutoMode,
  123	    }),
  124	    [mode],
  125	  );
  126	
  127	  return (
  128	    <ThemeModeContext.Provider value={value}>
  129	      {children}
  130	    </ThemeModeContext.Provider>
  131	  );
  132	}
  133	
  134	export function useThemeMode(): ThemeModeContextValue {
  135	  const context = useContext(ThemeModeContext);
  136	  if (!context) {
  137	    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  138	  }
  139	  return context;
  140	}
  141	
