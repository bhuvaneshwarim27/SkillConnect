
import React, {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AlertCircle, AlertTriangle, Check, Info, Loader2 } from "lucide-react";
   10	import { toast, type ToastId, type ToastItem } from "../helpers/toast";
   11	import styles from "./Toaster.module.css";
   12	
   13	// THE TOASTER: the app's only notification surface. Show a notice with
   14	// `toast(...)` from helpers/toast; this component renders it. It is already
   15	// mounted once in components/_globalContextProviders, so do not render it
   16	// again.
   17	//
   18	// One compact capsule, top-centre, under the status bar, in the theme's
   19	// inverse colours (foreground as background) so it reads as the app speaking
   20	// over any screen. The one action (Undo / Retry / Open) uses --primary.
   21	//
   22	// SEVERAL AT ONCE, as a stack: the newest in front, up to two older ones
   23	// peeking out underneath, smaller and with their text hidden. Tap the stack,
   24	// or hover it with a mouse, and it fans out into a list where each notice can
   25	// be read, tapped, actioned or swiped away on its own. Nothing expires while
   26	// it is fanned out or hovered. Tap a single notice to dismiss it; swipe up to
   27	// dismiss with the finger.
   28	//
   29	// ON A DYNAMIC ISLAND IPHONE (native iOS build, portrait) it becomes the
   30	// hardware island growing downward, the way iOS's own alerts do: pure black,
   31	// with a hidden "neck" reaching up into the camera pill so the join is the
   32	// hardware's own black. Everywhere else it is the plain capsule.
   33	
   34	const EMPTY: ToastItem[] = [];
   35	// A little longer than the longest exit animation (260ms in Dynamic Island
   36	// mode), so the node is never removed on the animation's last frame.
   37	const LEAVE_MS = 300;
   38	
   39	/** Cards visible when folded: the front one plus two peeking. */
   40	const MAX_COLLAPSED = 3;
   41	/** Cards visible when fanned out. Older live notices wait their turn. */
   42	const MAX_EXPANDED = 5;
   43	/** How far each folded card peeks out below the one in front of it. */
   44	const PEEK = 8;
   45	/** Each folded card is this much smaller than the one in front. */
   46	const SCALE_STEP = 0.05;
   47	/** Space between fanned-out cards. */
   48	const GAP = 8;
   49	/** Height used for a card before it has been measured (the one-line capsule). */
   50	const DEFAULT_HEIGHT = 34;
   51	
   52	type CapacitorGlobal = { isNativePlatform?: () => boolean; getPlatform?: () => string };
   53	
   54	/** True inside the native iOS build (Capacitor injects its bridge before the bundle runs). */
   55	function isNativeIos(): boolean {
   56	  try {
   57	    const cap = (globalThis as unknown as { Capacitor?: CapacitorGlobal }).Capacitor;
   58	    return cap?.isNativePlatform?.() === true && cap.getPlatform?.() === "ios";
   59	  } catch {
   60	    return false;
   61	  }
   62	}
   63	
   64	/** iOS-style resistance: follows almost 1:1 at first, then ever more reluctantly, never past `dim`. */
   65	function rubberBand(over: number, dim: number, c = 0.55): number {
   66	  if (dim <= 0 || over === 0) return 0;
   67	  const sign = over < 0 ? -1 : 1;
   68	  const a = Math.abs(over);
   69	  return sign * (1 - 1 / ((a * c) / dim + 1)) * dim;
   70	}
   71	
   72	/** The real top safe-area inset in CSS px, which env() knows and JS doesn't. */
   73	function measureSafeTop(): number {
   74	  if (typeof document === "undefined" || !document.body) return 0;
   75	  const probe = document.createElement("div");
   76	  probe.style.cssText =
   77	    "position:fixed;top:0;left:0;width:0;visibility:hidden;pointer-events:none;height:env(safe-area-inset-top, 0px)";
   78	  document.body.appendChild(probe);
   79	  const h = probe.getBoundingClientRect().height;
   80	  probe.remove();
   81	  return h;
   82	}
   83	
   84	/**
   85	 * Where the hardware Dynamic Island's top edge is, or null when this isn't a
   86	 * Dynamic Island iPhone held upright. There is no API for the island itself,
   87	 * but the inset gives it away: Dynamic Island phones report 59pt+ in portrait,
   88	 * notched ones 44–50pt, and landscape reports 0. The pill sits ~48pt above the
   89	 * bottom of that inset.
   90	 */
   91	function useDynamicIslandTop(): number | null {
   92	  const [top, setTop] = useState<number | null>(null);
   93	  useEffect(() => {
   94	    if (!isNativeIos()) return;
   95	    const update = () => {
   96	      const inset = measureSafeTop();
   97	      setTop(inset >= 51 ? Math.min(16, Math.max(10, Math.round(inset - 48))) : null);
   98	    };
   99	    update();
  100	    window.addEventListener("resize", update);
  101	    window.addEventListener("orientationchange", update);
  102	    return () => {
  103	      window.removeEventListener("resize", update);
  104	      window.removeEventListener("orientationchange", update);
  105	    };
  106	  }, []);
  107	  return top;
  108	}
  109	
  110	const toneIcon = (item: ToastItem): React.ReactNode => {
  111	  if (item.icon) return item.icon;
  112	  switch (item.tone) {
  113	    case "success":
  114	      return <Check size={12} strokeWidth={3} />;
  115	    case "error":
  116	      return <AlertCircle size={13} strokeWidth={2.5} />;
  117	    case "warning":
  118	      return <AlertTriangle size={12} strokeWidth={2.5} />;
  119	    case "info":
  120	      return <Info size={13} strokeWidth={2.5} />;
  121	    case "loading":
  122	      return <Loader2 size={13} className={styles.spin} />;
  123	    default:
  124	      return null;
  125	  }
  126	};
  127	
  128	type Layout = { y: number; scale: number; opacity: number; z: number };
  129	
  130	export interface ToasterViewProps {
  131	  /** Live notices, oldest first (the toast store's order). */
  132	  items: ToastItem[];
  133	  /** Notices just dismissed, kept mounted while they animate out. */
  134	  leavingItems?: ToastItem[];
  135	  /** Dynamic Island shape (native iOS, portrait). */
  136	  dynamic?: boolean;
  137	  /** Top edge of the hardware pill in CSS px (Dynamic Island mode only). */
  138	  islandTop?: number;
  139	  /** Lay out where it is rendered instead of pinned to the top of the screen. */
  140	  inline?: boolean;
  141	  /** Start fanned out (a stack is otherwise folded until tapped or hovered). */
  142	  defaultExpanded?: boolean;
  143	}
  144	
  145	/**
  146	 * The Toaster's presentation: the given notices as a stack, in the plain
  147	 * capsule or Dynamic Island shape. `Toaster` feeds it from the toast store;
  148	 * it is exported so notices can be shown in a given state on their own.
  149	 *
  150	 * Each card sits in a "slot" that carries its place in the stack (a CSS
  151	 * transition moves it when the stack changes). The card inside the slot
  152	 * carries only the swipe gesture, so the two transforms never fight.
  153	 */
  154	export const ToasterView = ({
  155	  items,
  156	  leavingItems = EMPTY,
  157	  dynamic = false,
  158	  islandTop = 11,
  159	  inline = false,
  160	  defaultExpanded = false,
  161	}: ToasterViewProps) => {
  162	  const regionRef = useRef<HTMLDivElement>(null);
  163	  const [expanded, setExpanded] = useState(defaultExpanded);
  164	  const [hovered, setHovered] = useState(false);
  165	  const [heights, setHeights] = useState<Record<string, number>>({});
  166	
  167	  const shown = items.slice(-MAX_EXPANDED).reverse(); // newest first
  168	  const stacked = shown.length > 1;
  169	  const open = stacked && (expanded || hovered);
  170	  const holding = hovered || open;
  171	  const holdingRef = useRef(holding);
  172	  holdingRef.current = holding;
  173	
  174	  const heightOf = (id: ToastId) => heights[String(id)] ?? DEFAULT_HEIGHT;
  175	  const frontHeight = shown.length ? heightOf(shown[0].id) : 0;
  176	
  177	  // Where every visible card goes. Folded, each older card hides behind the
  178	  // front one, scaled down, with just its bottom edge showing. Fanned out,
  179	  // they simply list downward.
  180	  const layouts = new Map<string, Layout>();
  181	  let listed = 0;
  182	  shown.forEach((it, i) => {
  183	    const h = heightOf(it.id);
  184	    const z = MAX_EXPANDED - i;
  185	    if (open) {
  186	      layouts.set(String(it.id), { y: listed, scale: 1, opacity: 1, z });
  187	      listed += h + GAP;
  188	    } else {
  189	      const k = Math.min(i, MAX_COLLAPSED - 1);
  190	      const scale = 1 - SCALE_STEP * k;
  191	      layouts.set(String(it.id), {
  192	        y: i === 0 ? 0 : frontHeight + PEEK * k - h * scale,
  193	        scale,
  194	        opacity: i < MAX_COLLAPSED ? 1 : 0,
  195	        z,
  196	      });
  197	    }
  198	  });
  199	  const stackHeight = open
  200	    ? Math.max(0, listed - GAP)
  201	    : frontHeight + PEEK * Math.max(0, Math.min(shown.length, MAX_COLLAPSED) - 1);
  202	
  203	  // A dismissed card animates out from wherever it last stood.
  204	  const lastLayout = useRef(new Map<string, Layout>());
  205	  layouts.forEach((l, id) => lastLayout.current.set(id, l));
  206	  useEffect(() => {
  207	    const keep = new Set([...items, ...leavingItems].map((i) => String(i.id)));
  208	    lastLayout.current.forEach((_, id) => {
  209	      if (!keep.has(id)) lastLayout.current.delete(id);
  210	    });
  211	  });
  212	
  213	  // Measure every card (offsetHeight ignores the stack's scale). Only commits
  214	  // when something actually changed, so it settles after one pass.
  215	  useLayoutEffect(() => {
  216	    const region = regionRef.current;
  217	    if (!region) return;
  218	    const next: Record<string, number> = {};
  219	    let changed = false;
  220	    region.querySelectorAll<HTMLElement>("[data-toast-slot]").forEach((slot) => {
  221	      const id = slot.dataset.toastSlot!;
  222	      const card = slot.firstElementChild as HTMLElement | null;
  223	      if (!card) return;
  224	      next[id] = card.offsetHeight;
  225	      if (heights[id] !== next[id]) changed = true;
  226	    });
  227	    if (changed) setHeights((prev) => ({ ...prev, ...next }));
  228	  });
  229	
  230	  // Nothing expires while the reader is looking at the stack. Resume only on
  231	  // the way out of holding, so a timer a swipe has paused isn't restarted.
  232	  const wasHolding = useRef(false);
  233	  useEffect(() => {
  234	    if (holding) toast._store.pauseAll();
  235	    else if (wasHolding.current) toast._store.resumeAll();
  236	    wasHolding.current = holding;
  237	  }, [holding, items.length]);
  238	
  239	  useEffect(() => {
  240	    if (!stacked) setExpanded(false);
  241	  }, [stacked]);
  242	
  243	  // Fanned out by a tap: a tap anywhere else folds it back up.
  244	  useEffect(() => {
  245	    if (!expanded) return;
  246	    const onDown = (e: PointerEvent) => {
  247	      if (!regionRef.current?.contains(e.target as Node)) setExpanded(false);
  248	    };
  249	    document.addEventListener("pointerdown", onDown, true);
  250	    return () => document.removeEventListener("pointerdown", onDown, true);
  251	  }, [expanded]);
  252	
  253	  const entries = [
  254	    ...shown.map((it, i) => ({ it, i, leaving: false, layout: layouts.get(String(it.id))! })),
  255	    ...leavingItems
  256	      .filter((it) => lastLayout.current.has(String(it.id)))
  257	      .map((it) => ({ it, i: -1, leaving: true, layout: lastLayout.current.get(String(it.id))! })),
  258	  ];
  259	
  260	  return (
  261	    <div
  262	      ref={regionRef}
  263	      className={[
  264	        styles.region,
  265	        dynamic ? styles.dynamic : "",
  266	        inline ? styles.inline : "",
  267	        open ? styles.open : "",
  268	      ].join(" ")}
  269	      style={
  270	        {
  271	          ...(dynamic ? { "--toast-island-top": `${islandTop}px` } : {}),
  272	          // Inline, the region is sized to the stack; in Dynamic Island mode it
  273	          // also keeps the room above the card where the neck reaches the pill.
  274	          ...(inline ? { height: stackHeight + (dynamic ? islandTop + 34 : 0) } : {}),
  275	        } as React.CSSProperties
  276	      }
  277	      aria-live="polite"
  278	      onPointerEnter={(e) => {
  279	        if (e.pointerType === "mouse") setHovered(true);
  280	      }}
  281	      onPointerLeave={(e) => {
  282	        if (e.pointerType === "mouse") setHovered(false);
  283	      }}
  284	    >
  285	      {entries.map(({ it, i, leaving, layout }) => (
  286	        <div
  287	          key={`${it.id}:${it.version}`}
  288	          data-toast-slot={String(it.id)}
  289	          className={styles.slot}
  290	          style={{
  291	            transform: `translateY(${layout.y}px) scale(${layout.scale})`,
  292	            opacity: layout.opacity,
  293	            zIndex: layout.z,
  294	          }}
  295	        >
  296	          <ToastCard
  297	            item={it}
  298	            leaving={leaving}
  299	            dynamic={dynamic}
  300	            front={i === 0}
  301	            behind={!leaving && !open && i > 0}
  302	            interactive={!leaving && (open || i === 0) && layout.opacity > 0}
  303	            title={i === 0 && stacked && !open ? "Show all" : "Dismiss"}
  304	            onTap={() => {
  305	              if (stacked && !open) setExpanded(true);
  306	              else toast.dismiss(it.id);
  307	            }}
  308	            held={() => holdingRef.current}
  309	          />
  310	        </div>
  311	      ))}
  312	    </div>
  313	  );
  314	};
  315	
  316	/**
  317	 * Renders every notice raised with `toast(...)`. Already mounted in
  318	 * components/_globalContextProviders: do not render it again.
  319	 */
  320	export const Toaster = ({ inline = false }: { inline?: boolean }) => {
  321	  const items = useSyncExternalStore(toast._store.subscribe, toast._store.getSnapshot, () => EMPTY);
  322	
  323	  // Keep each dismissed notice mounted for its exit animation. Decided DURING
  324	  // render: storing the leaving notice in state from an effect commits one
  325	  // frame without it before the exit starts, a visible blink.
  326	  const prevItems = useRef<ToastItem[]>(EMPTY);
  327	  const leaving = useRef(new Map<string, { item: ToastItem; since: number }>());
  328	  const [tick, bump] = useReducer((n: number) => n + 1, 0);
  329	  const liveIds = new Set(items.map((i) => String(i.id)));
  330	  const now = Date.now();
  331	  for (const p of prevItems.current) {
  332	    const id = String(p.id);
  333	    if (!liveIds.has(id) && !leaving.current.has(id)) leaving.current.set(id, { item: p, since: now });
  334	  }
  335	  leaving.current.forEach((v, id) => {
  336	    if (liveIds.has(id) || now - v.since >= LEAVE_MS) leaving.current.delete(id);
  337	  });
  338	  prevItems.current = items;
  339	  const leavingItems = [...leaving.current.values()].map((v) => v.item);
  340	  useEffect(() => {
  341	    if (!leavingItems.length) return;
  342	    const t = setTimeout(bump, LEAVE_MS);
  343	    return () => clearTimeout(t);
  344	  }, [leavingItems.length, tick]);
  345	
  346	  const islandTop = useDynamicIslandTop();
  347	
  348	  return (
  349	    <ToasterView
  350	      items={items}
  351	      leavingItems={leavingItems}
  352	      dynamic={islandTop !== null}
  353	      islandTop={islandTop ?? undefined}
  354	      inline={inline}
  355	    />
  356	  );
  357	};
  358	
  359	/** Finger travel (px, upward) that takes a card all the way to its dismissed shape. */
  360	const DRAG_DIST = 64;
  361	/** Movement before a press becomes a drag, so taps on the card and its action still work. */
  362	const DRAG_SLOP = 6;
  363	const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
  364	const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  365	
  366	/**
  367	 * One notice. SWIPE UP TO DISMISS, DRIVEN BY THE FINGER: the card's position
  368	 * is a single number, `y` (how far the finger has travelled, negative is up),
  369	 * and its shape is a pure function of it. Release hands `y` to a spring seeded
  370	 * with the finger's velocity: past half way or flicked up, it finishes the
  371	 * dismiss; otherwise it springs home. Transforms are written straight to the
  372	 * element on every frame; React only learns when the drag starts and ends.
  373	 */
  374	const ToastCard = ({
  375	  item,
  376	  leaving,
  377	  dynamic,
  378	  front,
  379	  behind,
  380	  interactive,
  381	  title,
  382	  onTap,
  383	  held,
  384	}: {
  385	  item: ToastItem;
  386	  leaving: boolean;
  387	  dynamic: boolean;
  388	  /** Newest card: in Dynamic Island mode, the one joined to the pill. */
  389	  front: boolean;
  390	  /** Folded behind the front card: just an edge, text hidden. */
  391	  behind: boolean;
  392	  /** Can be tapped and swiped (the front card, or any card when fanned out). */
  393	  interactive: boolean;
  394	  title: string;
  395	  onTap: () => void;
  396	  /** Whether the stack is holding every timer (fanned out / hovered). */
  397	  held: () => boolean;
  398	}) => {
  399	  const icon = toneIcon(item);
  400	  const toneClass = styles[`tone_${item.tone}`] ?? "";
  401	  const ref = useRef<HTMLDivElement>(null);
  402	  /** Once touched, the entrance animation is retired so it can't replay or fight the finger. */
  403	  const [handled, setHandled] = useState(false);
  404	  /** Swiped away: the exit animation must not replay over the spot the finger left it. */
  405	  const [swiped, setSwiped] = useState(false);
  406	  const dynamicRef = useRef(dynamic);
  407	  dynamicRef.current = dynamic;
  408	  const interactiveRef = useRef(interactive);
  409	  interactiveRef.current = interactive;
  410	  const heldRef = useRef(held);
  411	  heldRef.current = held;
  412	  const suppressClick = useRef(false);
  413	
  414	  useEffect(() => {
  415	    const el = ref.current;
  416	    if (!el) return;
  417	
  418	    let y = 0;
  419	    let dismissTarget = -DRAG_DIST;
  420	    let frame: number | null = null;
  421	    let pointerId: number | null = null;
  422	    let startX = 0;
  423	    let startY = 0;
  424	    let dragging = false;
  425	    let samples: Array<{ t: number; y: number }> = [];
  426	
  427	    /** The whole look of the card as a function of finger travel. */
  428	    const apply = (v: number) => {
  429	      if (dynamicRef.current) {
  430	        if (v <= 0) {
  431	          // Up: shrink back toward the pill, exactly the exit's end state at p = 1.
  432	          const p = clamp01(-v / DRAG_DIST);
  433	          el.style.transform = `translateY(${-34 * p}px) scale(${lerp(1, 0.33, p)}, ${lerp(1, 0.4, p)})`;
  434	          el.style.setProperty("--toast-content-opacity", String(clamp01(1 - p * 2.2)));
  435	        } else {
  436	          // Down: the island stretches out of the pill, ever more reluctantly.
  437	          const k = rubberBand(v, 80) / 80;
  438	          el.style.transform = `translateY(${k * 22}px) scale(${1 + k * 0.06}, ${1 + k * 0.14})`;
  439	          el.style.setProperty("--toast-content-opacity", "1");
  440	        }
  441	        el.style.opacity = "";
  442	      } else {
  443	        if (v <= 0) {
  444	          // Up: follow the finger 1:1, shrinking and fading as it goes.
  445	          const p = clamp01(-v / DRAG_DIST);
  446	          el.style.transform = `translateY(${v}px) scale(${1 - 0.12 * p})`;
  447	          el.style.opacity = String(1 - 0.85 * p);
  448	        } else {
  449	          const r = rubberBand(v, 80) * 0.5;
  450	          el.style.transform = `translateY(${r}px) scale(${1 + (r / 40) * 0.04})`;
  451	          el.style.opacity = "";
  452	        }
  453	        el.style.setProperty("--toast-content-opacity", "1");
  454	      }
  455	    };
  456	
  457	    const stop = () => {
  458	      if (frame !== null) cancelAnimationFrame(frame);
  459	      frame = null;
  460	    };
  461	
  462	    /** Damped spring from the current y to `target`, starting at `v0` px/ms. */
  463	    const springTo = (target: number, v0: number, zeta: number, onDone: () => void) => {
  464	      stop();
  465	      const k = 420;
  466	      const c = 2 * Math.sqrt(k) * zeta;
  467	      let vel = v0 * 1000;
  468	      let last = performance.now();
  469	      const step = (now: number) => {
  470	        const dt = Math.min(0.032, (now - last) / 1000);
  471	        last = now;
  472	        for (let i = 0; i < 4; i++) {
  473	          const a = -k * (y - target) - c * vel;
  474	          vel += a * (dt / 4);
  475	          y += vel * (dt / 4);
  476	        }
  477	        const arrived = Math.abs(y - target) < 0.5 && Math.abs(vel) < 15;
  478	        // Going away, there is nothing to settle: done the moment it gets there.
  479	        const passed = target < 0 && y <= target + 0.5;
  480	        if (arrived || passed) {
  481	          y = target;
  482	          apply(y);
  483	          frame = null;
  484	          onDone();
  485	          return;
  486	        }
  487	        apply(y);
  488	        frame = requestAnimationFrame(step);
  489	      };
  490	      frame = requestAnimationFrame(step);
  491	    };
  492	
  493	    const velocity = () => {
  494	      if (samples.length < 2) return 0;
  495	      const a = samples[0];
  496	      const b = samples[samples.length - 1];
  497	      const dt = b.t - a.t;
  498	      if (dt < 8 || performance.now() - b.t > 60) return 0;
  499	      return (b.y - a.y) / dt;
  500	    };
  501	
  502	    const onDown = (e: PointerEvent) => {
  503	      if (pointerId !== null || (e.pointerType === "mouse" && e.button !== 0)) return;
  504	      if (!interactiveRef.current || el.classList.contains(styles.leaving)) return;
  505	      pointerId = e.pointerId;
  506	      stop();
  507	      // Catching it mid-spring continues from where it is, with no slop.
  508	      dragging = y !== 0;
  509	      startX = e.clientX;
  510	      startY = e.clientY - y;
  511	      samples = [{ t: performance.now(), y: e.clientY }];
  512	      if (dragging) el.setPointerCapture(e.pointerId);
  513	    };
  514	
  515	    const onMove = (e: PointerEvent) => {
  516	      if (e.pointerId !== pointerId) return;
  517	      const dy = e.clientY - startY;
  518	      if (!dragging) {
  519	        const dx = e.clientX - startX;
  520	        if (Math.abs(dy) < DRAG_SLOP || Math.abs(dy) < Math.abs(dx)) return;
  521	        dragging = true;
  522	        // Measured before any transform: how far up "fully off screen" is.
  523	        if (!dynamicRef.current) dismissTarget = -(el.getBoundingClientRect().bottom + 24);
  524	        else dismissTarget = -DRAG_DIST;
  525	        setHandled(true);
  526	        toast._store.pause(item.id);
  527	        try {
  528	          // Captured only now, so a plain tap on the action button still clicks it.
  529	          el.setPointerCapture(e.pointerId);
  530	        } catch {
  531	          /* ignore */
  532	        }
  533	      }
  534	      suppressClick.current = true;
  535	      y = dy;
  536	      const now = performance.now();
  537	      samples.push({ t: now, y: e.clientY });
  538	      while (samples.length > 2 && now - samples[0].t > 100) samples.shift();
  539	      apply(y);
  540	    };
  541	
  542	    const onUp = (e: PointerEvent) => {
  543	      if (e.pointerId !== pointerId) return;
  544	      pointerId = null;
  545	      try {
  546	        el.releasePointerCapture(e.pointerId);
  547	      } catch {
  548	        /* ignore */
  549	      }
  550	      if (!dragging) return;
  551	      dragging = false;
  552	      const vy = e.type === "pointercancel" ? 0 : velocity();
  553	      const p = clamp01(-y / DRAG_DIST);
  554	      if (p > 0.5 || (vy < -0.35 && y < 0)) {
  555	        setSwiped(true);
  556	        springTo(dismissTarget, Math.min(vy, 0), 1, () => toast.dismiss(item.id));
  557	      } else {
  558	        springTo(0, vy, 0.72, () => {
  559	          el.style.transform = "";
  560	          el.style.opacity = "";
  561	          el.style.removeProperty("--toast-content-opacity");
  562	          if (!heldRef.current()) toast._store.resume(item.id);
  563	        });
  564	      }
  565	    };
  566	
  567	    el.addEventListener("pointerdown", onDown);
  568	    el.addEventListener("pointermove", onMove);
  569	    el.addEventListener("pointerup", onUp);
  570	    el.addEventListener("pointercancel", onUp);
  571	    return () => {
  572	      stop();
  573	      el.removeEventListener("pointerdown", onDown);
  574	      el.removeEventListener("pointermove", onMove);
  575	      el.removeEventListener("pointerup", onUp);
  576	      el.removeEventListener("pointercancel", onUp);
  577	    };
  578	  }, [item.id]);
  579	
  580	  return (
  581	    <div
  582	      ref={ref}
  583	      role={item.tone === "error" ? "alert" : "status"}
  584	      className={[
  585	        styles.toast,
  586	        toneClass,
  587	        item.description ? styles.twoLine : "",
  588	        item.action ? "" : styles.noAction,
  589	        icon ? "" : styles.noIcon,
  590	        leaving ? styles.leaving : "",
  591	        handled ? styles.handled : "",
  592	        swiped ? styles.swiped : "",
  593	        front ? styles.front : "",
  594	        behind ? styles.behind : "",
  595	      ].join(" ")}
  596	      title={title}
  597	      aria-hidden={behind || undefined}
  598	      // A drag ends in a click on whatever it started over; that click is not a tap.
  599	      onClickCapture={(e) => {
  600	        if (!suppressClick.current) return;
  601	        suppressClick.current = false;
  602	        e.stopPropagation();
  603	        e.preventDefault();
  604	      }}
  605	      onPointerDown={() => {
  606	        suppressClick.current = false;
  607	      }}
  608	      onClick={() => {
  609	        if (interactiveRef.current) onTap();
  610	      }}
  611	    >
  612	      <span className={`${styles.fillet} ${styles.filletLeft}`} aria-hidden />
  613	      <span className={`${styles.fillet} ${styles.filletRight}`} aria-hidden />
  614	      {icon && <span className={styles.icon}>{icon}</span>}
  615	      <span className={styles.text}>
  616	        <span className={styles.title}>{item.title}</span>
  617	        {item.description && <span className={styles.description}>{item.description}</span>}
  618	      </span>
  619	      {item.action && (
  620	        <>
  621	          <span className={styles.divider} />
  622	          <button
  623	            type="button"
  624	            className={styles.action}
  625	            onClick={(e) => {
  626	              e.stopPropagation();
  627	              item.action?.onClick();
  628	              toast.dismiss(item.id);
  629	            }}
  630	          >
  631	            {item.action.label}
  632	          </button>
  633	        </>
  634	      )}
  635	    </div>
  636	  );
  637	};
  638	
