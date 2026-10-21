
import type { ReactNode } from "react";

// THE APP'S NOTIFICATION API. Call `toast` from anywhere (components, hooks,
// mutation callbacks) to show a short notice; components/Toaster renders it.
// The Toaster is already mounted once in components/_globalContextProviders,
// so never render it again and never install another toast library.
//
//   import { toast } from "../helpers/toast";
//
   10	//   toast("Marked as unread");
   11	//   toast.success("Saved");
   12	//   toast.error("Couldn't send message", { action: { label: "Retry", onClick: retry } });
   13	//   toast("Task deleted", { action: { label: "Undo", onClick: undo } });
   14	//   toast.success("Invite sent", { description: "jane@example.com" });
   15	//   const id = toast.loading("Uploading…");  ...  toast.success("Uploaded", { id });
   16	//   toast.promise(save(), { loading: "Saving…", success: "Saved", error: "Couldn't save" });
   17	//   toast.dismiss(id);   // or toast.dismiss() for all
   18	//
   19	// The call shape is sonner's, so code written for `import { toast } from
   20	// "sonner"` works by changing only the import. Keep the text short: a notice
   21	// is one line (plus an optional one-line description) and is truncated past
   22	// that. One action at most. Feedback that belongs to a thing on screen (a
   23	// field error, a failed message) goes on that thing, not in a toast.
   24	//
   25	// Notices stack, newest in front with up to two older ones peeking out below;
   26	// tapping or hovering the stack fans it out. Each notice has its own timer
   27	// (3.5 s, 6 s for errors and notices with an action, never for `loading` or
   28	// duration: Infinity), and nothing expires while the stack is hovered or
   29	// fanned out. Re-using an id replaces that notice in place.
   30	
   31	export type ToastTone = "default" | "success" | "error" | "warning" | "info" | "loading";
   32	export type ToastId = string | number;
   33	
   34	export interface ToastAction {
   35	  label: string;
   36	  onClick: () => void;
   37	}
   38	
   39	export interface ToastOptions {
   40	  /** Re-use an id to replace that notice in place (e.g. loading → success). */
   41	  id?: ToastId;
   42	  /** One short line under the title. */
   43	  description?: ReactNode;
   44	  /** Milliseconds; Infinity keeps it until dismissed. */
   45	  duration?: number;
   46	  /** One action button, e.g. Undo or Retry. Clicking it also dismisses the notice. */
   47	  action?: ToastAction;
   48	  /** Replaces the tone's icon. */
   49	  icon?: ReactNode;
   50	}
   51	
   52	export interface ToastItem {
   53	  id: ToastId;
   54	  tone: ToastTone;
   55	  title: ReactNode;
   56	  description?: ReactNode;
   57	  action?: ToastAction;
   58	  icon?: ReactNode;
   59	  duration: number;
   60	  /** Bumped on every show/replace so the Toaster re-plays its entrance. */
   61	  version: number;
   62	}
   63	
   64	type PromiseMessage<T> = ReactNode | ((value: T) => ReactNode);
   65	
   66	export interface ToastPromiseMessages<T> {
   67	  loading: ReactNode;
   68	  success: PromiseMessage<T>;
   69	  error: PromiseMessage<unknown>;
   70	  description?: ReactNode;
   71	}
   72	
   73	type Timer = { handle: ReturnType<typeof setTimeout> | null; startedAt: number; remaining: number };
   74	
   75	let items: ToastItem[] = [];
   76	const listeners = new Set<() => void>();
   77	const timers = new Map<ToastId, Timer>();
   78	let counter = 0;
   79	let versionCounter = 0;
   80	
   81	const emit = () => {
   82	  items = [...items];
   83	  listeners.forEach((l) => l());
   84	};
   85	
   86	const defaultDuration = (tone: ToastTone, hasAction: boolean) => {
   87	  if (tone === "loading") return Infinity;
   88	  if (tone === "error" || hasAction) return 6000;
   89	  return 3500;
   90	};
   91	
   92	const clearTimer = (id: ToastId) => {
   93	  const t = timers.get(id);
   94	  if (t?.handle) clearTimeout(t.handle);
   95	  timers.delete(id);
   96	};
   97	
   98	const startTimer = (id: ToastId, ms: number) => {
   99	  clearTimer(id);
  100	  if (!Number.isFinite(ms)) return;
  101	  timers.set(id, {
  102	    handle: setTimeout(() => dismiss(id), ms),
  103	    startedAt: Date.now(),
  104	    remaining: ms,
  105	  });
  106	};
  107	
  108	function dismiss(id?: ToastId) {
  109	  if (id === undefined) {
  110	    timers.forEach((_, key) => clearTimer(key));
  111	    items = [];
  112	    emit();
  113	    return;
  114	  }
  115	  clearTimer(id);
  116	  const next = items.filter((i) => i.id !== id);
  117	  if (next.length === items.length) return;
  118	  items = next;
  119	  emit();
  120	}
  121	
  122	const show = (tone: ToastTone, title: ReactNode, opts: ToastOptions = {}): ToastId => {
  123	  const id = opts.id ?? `toast-${++counter}`;
  124	  const duration = opts.duration ?? defaultDuration(tone, !!opts.action);
  125	  const item: ToastItem = {
  126	    id,
  127	    tone,
  128	    title,
  129	    description: opts.description,
  130	    action: opts.action,
  131	    icon: opts.icon,
  132	    duration,
  133	    version: ++versionCounter,
  134	  };
  135	  items = [...items.filter((i) => i.id !== id), item];
  136	  startTimer(id, duration);
  137	  emit();
  138	  return id;
  139	};
  140	
  141	const resolveMessage = <T,>(message: PromiseMessage<T>, value: T): ReactNode =>
  142	  typeof message === "function" ? (message as (v: T) => ReactNode)(value) : message;
  143	
  144	/** Shows `loading` until the promise settles, then turns into success or error. Returns the promise. */
  145	function promise<T>(work: Promise<T> | (() => Promise<T>), messages: ToastPromiseMessages<T>, opts: ToastOptions = {}): Promise<T> {
  146	  const id = show("loading", messages.loading, { ...opts, description: messages.description ?? opts.description });
  147	  const running = typeof work === "function" ? work() : work;
  148	  running.then(
  149	    (value) => {
  150	      show("success", resolveMessage(messages.success, value), { ...opts, id, duration: opts.duration });
  151	    },
  152	    (error: unknown) => {
  153	      show("error", resolveMessage(messages.error, error), { ...opts, id, duration: opts.duration });
  154	    },
  155	  );
  156	  return running;
  157	}
  158	
  159	// Hover / press holds a notice, so an Undo isn't snatched away mid-reach.
  160	// Resume gives back what was left, with a short floor.
  161	const pause = (id: ToastId) => {
  162	  const t = timers.get(id);
  163	  if (!t?.handle) return;
  164	  clearTimeout(t.handle);
  165	  t.handle = null;
  166	  t.remaining = Math.max(0, t.remaining - (Date.now() - t.startedAt));
  167	};
  168	
  169	const resume = (id: ToastId) => {
  170	  const t = timers.get(id);
  171	  if (!t || t.handle) return;
  172	  startTimer(id, Math.max(t.remaining, 1200));
  173	};
  174	
  175	// While the stack is fanned out or hovered, nothing in it may expire under the
  176	// reader.
  177	const pauseAll = () => items.forEach((i) => pause(i.id));
  178	const resumeAll = () => items.forEach((i) => resume(i.id));
  179	
  180	const subscribe = (listener: () => void) => {
  181	  listeners.add(listener);
  182	  return () => {
  183	    listeners.delete(listener);
  184	  };
  185	};
  186	
  187	const getSnapshot = () => items;
  188	
  189	export const toast = Object.assign(
  190	  (title: ReactNode, opts?: ToastOptions) => show("default", title, opts),
  191	  {
  192	    success: (title: ReactNode, opts?: ToastOptions) => show("success", title, opts),
  193	    error: (title: ReactNode, opts?: ToastOptions) => show("error", title, opts),
  194	    warning: (title: ReactNode, opts?: ToastOptions) => show("warning", title, opts),
  195	    info: (title: ReactNode, opts?: ToastOptions) => show("info", title, opts),
  196	    message: (title: ReactNode, opts?: ToastOptions) => show("default", title, opts),
  197	    loading: (title: ReactNode, opts?: ToastOptions) => show("loading", title, opts),
  198	    promise,
  199	    dismiss,
  200	    /** Internal: used by components/Toaster only. */
  201	    _store: { subscribe, getSnapshot, pause, resume, pauseAll, resumeAll },
  202	  }
  203	);
  204	
