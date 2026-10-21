
import { renderHook } from "@testing-library/react";
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  let matchMedia: jasmine.Spy;
  let addListener: jasmine.Spy;
  let removeListener: jasmine.Spy;

  beforeEach(() => {
   10	    addListener = jasmine.createSpy("addEventListener");
   11	    removeListener = jasmine.createSpy("removeEventListener");
   12	
   13	    matchMedia = jasmine.createSpy("matchMedia").and.returnValue({
   14	      matches: false,
   15	      addEventListener: addListener,
   16	      removeEventListener: removeListener,
   17	    });
   18	
   19	    (window as any).matchMedia = matchMedia;
   20	  });
   21	
   22	  it("should return false by default", () => {
   23	    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
   24	    expect(result.current).toBe(false);
   25	  });
   26	
   27	  it("should call matchMedia with the provided query", () => {
   28	    const query = "(min-width: 768px)";
   29	    renderHook(() => useMediaQuery(query));
   30	    expect(matchMedia).toHaveBeenCalledWith(query);
   31	  });
   32	
   33	  it("should add event listener on mount", () => {
   34	    renderHook(() => useMediaQuery("(min-width: 768px)"));
   35	    expect(addListener).toHaveBeenCalledWith("change", jasmine.any(Function));
   36	  });
   37	
   38	  it("should remove event listener on unmount", () => {
   39	    const { unmount } = renderHook(() => useMediaQuery("(min-width: 768px)"));
   40	    unmount();
   41	    expect(removeListener).toHaveBeenCalledWith(
   42	      "change",
   43	      jasmine.any(Function),
   44	    );
   45	  });
   46	});
   47	
