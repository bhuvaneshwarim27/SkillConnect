
/*
From https://github.com/juliencrn/usehooks-ts
The MIT License (MIT)

Copyright (c) 2020 Julien CARON

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
   10	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   11	copies of the Software, and to permit persons to whom the Software is
   12	furnished to do so, subject to the following conditions:
   13	
   14	The above copyright notice and this permission notice shall be included in all
   15	copies or substantial portions of the Software.
   16	
   17	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   18	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   19	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   20	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   21	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   22	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   23	SOFTWARE.
   24	*/
   25	
   26	import { useState, useLayoutEffect } from "react";
   27	
   28	type UseMediaQueryOptions = {
   29	  defaultValue?: boolean;
   30	  initializeWithValue?: boolean;
   31	};
   32	
   33	const IS_SERVER = typeof window === "undefined";
   34	
   35	export function useMediaQuery(
   36	  query: string,
   37	  {
   38	    defaultValue = false,
   39	    initializeWithValue = true,
   40	  }: UseMediaQueryOptions = {},
   41	): boolean {
   42	  const getMatches = (query: string): boolean => {
   43	    if (IS_SERVER) {
   44	      return defaultValue;
   45	    }
   46	    return window.matchMedia(query).matches;
   47	  };
   48	
   49	  const [matches, setMatches] = useState<boolean>(() => {
   50	    if (initializeWithValue) {
   51	      return getMatches(query);
   52	    }
   53	    return defaultValue;
   54	  });
   55	
   56	  // Handles the change event of the media query.
   57	  function handleChange() {
   58	    setMatches(getMatches(query));
   59	  }
   60	
   61	  useLayoutEffect(() => {
   62	    const matchMedia = window.matchMedia(query);
   63	
   64	    // Triggered at the first client-side load and if query changes
   65	    handleChange();
   66	
   67	    // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
   68	    if (matchMedia.addListener) {
   69	      matchMedia.addListener(handleChange);
   70	    } else {
   71	      matchMedia.addEventListener("change", handleChange);
   72	    }
   73	
   74	    return () => {
   75	      if (matchMedia.removeListener) {
   76	        matchMedia.removeListener(handleChange);
   77	      } else {
   78	        matchMedia.removeEventListener("change", handleChange);
   79	      }
   80	    };
   81	  }, [query]);
   82	
   83	  return matches;
   84	}
   85	
