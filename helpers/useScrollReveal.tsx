
import { useEffect, useRef } from "react";
import { useCallbackRef } from "./useCallbackRef";

export interface ScrollRevealOptions {
  threshold?: number | number[];
  rootMargin?: string;
}
/**
 * useScrollReveal — Scroll-triggered reveal hook
   10	 *
   11	 * Returns a callback ref. Attach it DIRECTLY to the element that has the
   12	 * "reveal" CSS class (the one with `opacity: 0`). When that element enters
   13	 * the viewport, `data-revealed="true"` is set ON THAT SAME element, which
   14	 * activates the visible CSS rule. You should style the element with the data-revealed
   15	 * to trigger the reveal animation. You should not use inline styles.
   16	 *
   17	 * If you want to animate multiple children independently, create a separate
   18	 * useScrollReveal() call for each one and attach each ref to its own element.
   19	 */
   20	export function useScrollReveal(options: ScrollRevealOptions = {}) {
   21	  const observerRef = useRef<IntersectionObserver | null>(null);
   22	  const observedElementsRef = useRef<Set<HTMLElement>>(new Set());
   23	  const mutationObserversRef = useRef<Map<Element, MutationObserver>>(
   24	    new Map(),
   25	  );
   26	  const optionsRef = useRef(options);
   27	
   28	  // Keep options up to date without recreating the observer unnecessarily
   29	  useEffect(() => {
   30	    optionsRef.current = options;
   31	  }, [options]);
   32	
   33	  const getObserver = () => {
   34	    if (!observerRef.current) {
   35	      observerRef.current = new IntersectionObserver(
   36	        (entries) => {
   37	          entries.forEach((entry) => {
   38	            if (entry.isIntersecting) {
   39	              entry.target.setAttribute("data-revealed", "true");
   40	
   41	              const revealChildren = (el: Element) => {
   42	                Array.from(el.children).forEach((child) => {
   43	                  if (child.getAttribute("data-revealed") !== "true") {
   44	                    child.setAttribute("data-revealed", "true");
   45	                  }
   46	                  revealChildren(child);
   47	                });
   48	              };
   49	
   50	              revealChildren(entry.target);
   51	
   52	              if (!mutationObserversRef.current.has(entry.target)) {
   53	                const mo = new MutationObserver((mutations) => {
   54	                  mutations.forEach((mutation) => {
   55	                    if (mutation.type === "childList") {
   56	                      mutation.addedNodes.forEach((node) => {
   57	                        if (node instanceof Element) {
   58	                          if (node.getAttribute("data-revealed") !== "true") {
   59	                            node.setAttribute("data-revealed", "true");
   60	                          }
   61	                          revealChildren(node);
   62	                        }
   63	                      });
   64	                    }
   65	                  });
   66	                });
   67	                mo.observe(entry.target, { childList: true, subtree: true });
   68	                mutationObserversRef.current.set(entry.target, mo);
   69	              }
   70	
   71	              observerRef.current?.unobserve(entry.target);
   72	              if (entry.target instanceof HTMLElement) {
   73	                observedElementsRef.current.delete(entry.target);
   74	              }
   75	            }
   76	          });
   77	        },
   78	        {
   79	          threshold: optionsRef.current.threshold ?? 0.15,
   80	          rootMargin: optionsRef.current.rootMargin ?? "0px 0px -40px 0px",
   81	        },
   82	      );
   83	    }
   84	    return observerRef.current;
   85	  };
   86	
   87	  useEffect(() => {
   88	    return () => {
   89	      // Disconnect observer on unmount and clear tracking set
   90	      observerRef.current?.disconnect();
   91	      observedElementsRef.current.clear();
   92	      mutationObserversRef.current.forEach((mo) => mo.disconnect());
   93	      mutationObserversRef.current.clear();
   94	    };
   95	  }, []);
   96	
   97	  const observe = useCallbackRef((element: HTMLElement | null) => {
   98	    if (!element) return;
   99	
  100	    // Safety check for environments without IntersectionObserver
  101	    if (typeof IntersectionObserver === "undefined") {
  102	      element.setAttribute("data-revealed", "true");
  103	      return;
  104	    }
  105	
  106	    // Check for prefers-reduced-motion
  107	    if (typeof window !== "undefined" && window.matchMedia) {
  108	      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  109	      if (mediaQuery.matches) {
  110	        element.setAttribute("data-revealed", "true");
  111	        return;
  112	      }
  113	    }
  114	
  115	    // Only observe if we haven't already and it hasn't been revealed
  116	    if (
  117	      !observedElementsRef.current.has(element) &&
  118	      element.getAttribute("data-revealed") !== "true"
  119	    ) {
  120	      getObserver().observe(element);
  121	      observedElementsRef.current.add(element);
  122	    }
  123	  });
  124	
  125	  return observe;
  126	}
  127	
