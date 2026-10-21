
import { useRef, useLayoutEffect, useCallback } from "react";

/**
 * Returns a stable callback reference that always calls the latest version of the callback.
 * Preferred over useCallback because it always has access to the latest callback
 * without causing re-renders or needing dependencies.
 */
export function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T,
   10	): T {
   11	  const callbackRef = useRef(callback);
   12	
   13	  // useLayoutEffect runs in the "Commit Phase"
   14	  // This only happens AFTER React is sure this render is going to the screen.
   15	  useLayoutEffect(() => {
   16	    callbackRef.current = callback;
   17	  });
   18	
   19	  return useCallback(
   20	    ((...args) => callbackRef.current?.(...args)) as T,
   21	    [],
   22	  ) as T;
   23	}
   24	
