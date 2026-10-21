
import { useState, useEffect } from "react";

/**
 * A custom React hook that debounces a value.
 *
 * @template T The type of the value to be debounced.
 * @param {T} value The value to debounce.
 * @param {number} delay The debounce delay in milliseconds.
 * @returns {T} The debounced value.
   10	 */
   11	export function useDebounce<T>(value: T, delay: number): T {
   12	  // State to store the debounced value
   13	  const [debouncedValue, setDebouncedValue] = useState<T>(value);
   14	
   15	  useEffect(
   16	    () => {
   17	      // Set up a timer to update the debounced value after the specified delay
   18	      const handler = setTimeout(() => {
   19	        setDebouncedValue(value);
   20	      }, delay);
   21	
   22	      // Clean up the timer if the value or delay changes before the timer fires.
   23	      // This is the core of the debounce logic.
   24	      return () => {
   25	        clearTimeout(handler);
   26	      };
   27	    },
   28	    [value, delay], // Re-run the effect only if the value or delay changes
   29	  );
   30	
   31	  return debouncedValue;
   32	}
   33	
