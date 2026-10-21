
import { Example } from "@floot/examples";
import { Archive, Link2 } from "lucide-react";
import { ToasterView } from "./Toaster";
import { Button } from "./Button";
import { toast, type ToastItem } from "../helpers/toast";
import styles from "./Toaster.example.module.css";

let version = 0;
const notice = (item: Omit<ToastItem, "version" | "duration"> & { duration?: number }): ToastItem => ({
   10	  duration: Infinity,
   11	  version: ++version,
   12	  ...item,
   13	});
   14	
   15	const noop = () => {};
   16	
   17	const TONES: { title: string; item: ToastItem }[] = [
   18	  { title: "Default", item: notice({ id: "t-default", tone: "default", title: "Marked as unread" }) },
   19	  { title: "Success", item: notice({ id: "t-success", tone: "success", title: "Saved" }) },
   20	  { title: "Error", item: notice({ id: "t-error", tone: "error", title: "Couldn't send message" }) },
   21	  { title: "Warning", item: notice({ id: "t-warning", tone: "warning", title: "You're offline. Changes will sync later" }) },
   22	  { title: "Info", item: notice({ id: "t-info", tone: "info", title: "A new version is available" }) },
   23	  { title: "Loading", item: notice({ id: "t-loading", tone: "loading", title: "Uploading roadmap.pdf…" }) },
   24	];
   25	
   26	const withAction = notice({
   27	  id: "t-undo",
   28	  tone: "default",
   29	  icon: <Archive size={11} />,
   30	  title: "#design archived",
   31	  action: { label: "Undo", onClick: noop },
   32	});
   33	
   34	const errorWithAction = notice({
   35	  id: "t-retry",
   36	  tone: "error",
   37	  title: "Couldn't send message",
   38	  action: { label: "Retry", onClick: noop },
   39	});
   40	
   41	const withDescription = notice({
   42	  id: "t-desc",
   43	  tone: "success",
   44	  title: "Invite sent",
   45	  description: "jane@example.com will get an email in a minute",
   46	});
   47	
   48	const customIcon = notice({ id: "t-icon", tone: "default", icon: <Link2 size={12} />, title: "Link copied" });
   49	
   50	const longTitle = notice({
   51	  id: "t-long",
   52	  tone: "default",
   53	  title: "This notice is far too long to fit on one line, so the end of it is cut off with an ellipsis rather than wrapping",
   54	});
   55	
   56	// Oldest first, as the toast store keeps them: the last one is in front.
   57	const stack: ToastItem[] = [
   58	  notice({ id: "s-1", tone: "success", title: "Link copied" }),
   59	  notice({ id: "s-2", tone: "default", icon: <Archive size={11} />, title: "#design archived", action: { label: "Undo", onClick: noop } }),
   60	  notice({ id: "s-3", tone: "error", title: "Couldn't send message", action: { label: "Retry", onClick: noop } }),
   61	];
   62	
   63	function TryIt() {
   64	  return (
   65	    <div className={styles.buttons}>
   66	      <Button variant="outline" onClick={() => toast("Marked as unread")}>
   67	        Default
   68	      </Button>
   69	      <Button variant="outline" onClick={() => toast.success("Saved")}>
   70	        Success
   71	      </Button>
   72	      <Button
   73	        variant="outline"
   74	        onClick={() =>
   75	          toast.error("Couldn't send message", {
   76	            action: { label: "Retry", onClick: () => toast.success("Sent") },
   77	          })
   78	        }
   79	      >
   80	        Error with Retry
   81	      </Button>
   82	      <Button
   83	        variant="outline"
   84	        onClick={() =>
   85	          toast("Task deleted", {
   86	            description: "Fix the login redirect",
   87	            action: { label: "Undo", onClick: () => toast("Task restored") },
   88	          })
   89	        }
   90	      >
   91	        Undo
   92	      </Button>
   93	      <Button
   94	        variant="outline"
   95	        onClick={() =>
   96	          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
   97	            loading: "Uploading roadmap.pdf…",
   98	            success: "Uploaded",
   99	            error: "Upload failed",
  100	          })
  101	        }
  102	      >
  103	        Loading, then done
  104	      </Button>
  105	      <Button variant="ghost" onClick={() => toast.dismiss()}>
  106	        Dismiss all
  107	      </Button>
  108	    </div>
  109	  );
  110	}
  111	
  112	export default function ToasterShowcase() {
  113	  return (
  114	    <>
  115	      <h1>Toaster</h1>
  116	      <p>
  117	        The app's notification surface: a compact capsule at the top centre of the screen that confirms
  118	        an action, reports a failure, or offers a single follow-up such as Undo or Retry. Show one by
  119	        calling <code>toast</code> from <code>helpers/toast</code>, anywhere in the app. The Toaster that
  120	        renders them is already mounted by the global providers.
  121	      </p>
  122	      <ul>
  123	        <li>
  124	          <code>toast("Marked as unread")</code>, <code>toast.success</code>, <code>.error</code>,{" "}
  125	          <code>.warning</code>, <code>.info</code>, <code>.loading</code>
  126	        </li>
  127	        <li>
  128	          Options: <code>description</code> (one short line), <code>action</code> (
  129	          <code>{"{ label, onClick }"}</code>), <code>icon</code>, <code>duration</code>, <code>id</code>
  130	        </li>
  131	        <li>
  132	          <code>toast.promise(work, {"{ loading, success, error }"})</code> shows a spinner until the
  133	          promise settles; re-using an <code>id</code> replaces a notice in place.
  134	        </li>
  135	        <li>
  136	          Notices last 3.5 seconds (6 with an action or an error); <code>loading</code> stays until
  137	          replaced or dismissed. Nothing expires while the pointer is over them.
  138	        </li>
  139	      </ul>
  140	
  141	      <h2>Try it</h2>
  142	      <p>These raise real notices at the top of the preview.</p>
  143	      <Example title="Live notices" description="Each button calls toast() as app code would.">
  144	        <TryIt />
  145	      </Example>
  146	
  147	      <h2>Tones</h2>
  148	      <div className={styles.grid}>
  149	        {TONES.map(({ title, item }) => (
  150	          <Example key={title} title={title} width={360}>
  151	            <ToasterView items={[item]} inline />
  152	          </Example>
  153	        ))}
  154	      </div>
  155	
  156	      <h2>Content</h2>
  157	      <div className={styles.grid}>
  158	        <Example title="With an action" description="One action at most. Clicking it also dismisses the notice." width={360}>
  159	          <ToasterView items={[withAction]} inline />
  160	        </Example>
  161	        <Example title="Error with Retry" width={360}>
  162	          <ToasterView items={[errorWithAction]} inline />
  163	        </Example>
  164	        <Example title="With a description" width={360}>
  165	          <ToasterView items={[withDescription]} inline />
  166	        </Example>
  167	        <Example title="Custom icon" width={360}>
  168	          <ToasterView items={[customIcon]} inline />
  169	        </Example>
  170	        <Example title="Title too long" description="One line only: the rest is cut off." width={360}>
  171	          <ToasterView items={[longTitle]} inline />
  172	        </Example>
  173	      </div>
  174	
  175	      <h2>Several at once</h2>
  176	      <p>
  177	        Notices stack with the newest in front and up to two older ones peeking out underneath. Tapping
  178	        or hovering the stack fans it out so each one can be read, actioned or swiped away.
  179	      </p>
  180	      <div className={styles.grid}>
  181	        <Example title="Stack, folded" width={420}>
  182	          <ToasterView items={stack} inline />
  183	        </Example>
  184	        <Example title="Stack, fanned out" width={420}>
  185	          <ToasterView items={stack} inline defaultExpanded />
  186	        </Example>
  187	      </div>
  188	
  189	      <h2>Joined to the Dynamic Island</h2>
  190	      <p>
  191	        In the native iPhone app, on a phone with a Dynamic Island, the notice grows out of the camera
  192	        pill instead of floating below the status bar.
  193	      </p>
  194	      <Example title="Dynamic Island" width={420}>
  195	        <div className={styles.phoneTop}>
  196	          <span className={styles.pill} aria-hidden />
  197	          <ToasterView items={[withAction]} inline dynamic islandTop={11} />
  198	        </div>
  199	      </Example>
  200	    </>
  201	  );
  202	}
  203	
