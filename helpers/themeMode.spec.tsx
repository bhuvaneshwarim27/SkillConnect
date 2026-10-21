
import { switchToDarkMode, switchToLightMode, switchToAutoMode, getCurrentThemeMode } from "./themeMode";

// Helper function to create a mutable MediaQueryList mock.
function createMediaQueryList(initialMatches: boolean, query = "(prefers-color-scheme: dark)") {
  let currentMatches = initialMatches;
  const mql: Partial<MediaQueryList> = {
    get matches() {
      return currentMatches;
    },
   10	    media: query,
   11	    onchange: null,
   12	    addListener: () => {},
   13	    removeListener: () => {},
   14	    addEventListener: () => {},
   15	    removeEventListener: () => {},
   16	    dispatchEvent: () => false,
   17	  };
   18	  return Object.assign(mql, {
   19	    setMatches(newMatches: boolean) {
   20	      currentMatches = newMatches;
   21	    },
   22	  }) as MediaQueryList & { setMatches: (matches: boolean) => void };
   23	}
   24	
   25	describe("themeMode helper", () => {
   26	  let originalMatchMedia: typeof window.matchMedia;
   27	
   28	  beforeAll(() => {
   29	    originalMatchMedia = window.matchMedia;
   30	  });
   31	
   32	  afterAll(() => {
   33	    window.matchMedia = originalMatchMedia;
   34	  });
   35	
   36	  beforeEach(() => {
   37	    // Clear theme classes and reset auto mode before each test.
   38	    document.body.className = "";
   39	  });
   40	
   41	  it("should add the 'dark' class when switching to dark mode", () => {
   42	    switchToDarkMode();
   43	    expect(document.body.classList.contains("dark")).toBeTrue();
   44	  });
   45	
   46	  it("should remove the 'dark' class when switching to light mode", () => {
   47	    document.body.classList.add("dark");
   48	    switchToLightMode();
   49	    expect(document.body.classList.contains("dark")).toBeFalse();
   50	  });
   51	
   52	  it("should apply dark mode automatically when user prefers dark", () => {
   53	    window.matchMedia = (query: string): MediaQueryList =>
   54	      createMediaQueryList(true, query);
   55	    switchToAutoMode();
   56	    expect(document.body.classList.contains("dark")).toBeTrue();
   57	  });
   58	
   59	  it("should apply light mode automatically when user does not prefer dark", () => {
   60	    document.body.classList.add("dark");
   61	    window.matchMedia = (query: string): MediaQueryList =>
   62	      createMediaQueryList(false, query);
   63	    switchToAutoMode();
   64	    expect(document.body.classList.contains("dark")).toBeFalse();
   65	  });
   66	
   67	  it("should update theme when system preference changes in auto mode upon re-calling switchToAutoMode", () => {
   68	    // Initially simulate light preference.
   69	    window.matchMedia = (query: string): MediaQueryList =>
   70	      createMediaQueryList(false, query);
   71	    switchToAutoMode();
   72	    expect(document.body.classList.contains("dark")).toBeFalse();
   73	
   74	    // Simulate dark preference by returning a new media query object.
   75	    window.matchMedia = (query: string): MediaQueryList =>
   76	      createMediaQueryList(true, query);
   77	    switchToAutoMode();
   78	    expect(document.body.classList.contains("dark")).toBeTrue();
   79	
   80	    // Change back to light preference.
   81	    window.matchMedia = (query: string): MediaQueryList =>
   82	      createMediaQueryList(false, query);
   83	    switchToAutoMode();
   84	    expect(document.body.classList.contains("dark")).toBeFalse();
   85	  });
   86	
   87	  it("should update theme when media query change event is triggered", () => {
   88	    // Create a single dummy media query object to simulate changes.
   89	    const dummyMediaQuery = createMediaQueryList(false);
   90	    window.matchMedia = (query: string): MediaQueryList => dummyMediaQuery;
   91	
   92	    switchToAutoMode();
   93	    // Initially, dummyMediaQuery.matches is false so light mode.
   94	    expect(document.body.classList.contains("dark")).toBeFalse();
   95	
   96	    // Simulate change to dark preference.
   97	    dummyMediaQuery.setMatches(true);
   98	    if (dummyMediaQuery.onchange) {
   99	      dummyMediaQuery.onchange({ matches: true } as MediaQueryListEvent);
  100	    }
  101	    expect(document.body.classList.contains("dark")).toBeTrue();
  102	
  103	    // Simulate change back to light preference.
  104	    dummyMediaQuery.setMatches(false);
  105	    if (dummyMediaQuery.onchange) {
  106	      dummyMediaQuery.onchange({ matches: false } as MediaQueryListEvent);
  107	    }
  108	    expect(document.body.classList.contains("dark")).toBeFalse();
  109	  });
  110	
  111	  it("getCurrentThemeMode should return 'dark' when dark mode is set manually", () => {
  112	    switchToDarkMode();
  113	    expect(getCurrentThemeMode()).toBe("dark");
  114	  });
  115	
  116	  it("getCurrentThemeMode should return 'light' when light mode is set manually", () => {
  117	    switchToLightMode();
  118	    expect(getCurrentThemeMode()).toBe("light");
  119	  });
  120	
  121	  it("getCurrentThemeMode should return 'auto' when auto mode is enabled", () => {
  122	    window.matchMedia = (query: string): MediaQueryList =>
  123	      createMediaQueryList(true, query);
  124	    switchToAutoMode();
  125	    expect(getCurrentThemeMode()).toBe("auto");
  126	  });
  127	});
