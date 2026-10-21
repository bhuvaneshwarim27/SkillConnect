
import { Example, Stage } from "@floot/examples";
import { Button } from "./Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
   10	} from "./Sheet";
   11	
   12	export default function SheetShowcase() {
   13	  return (
   14	    <>
   15	      <h1>Sheet</h1>
   16	      <p>
   17	        A panel anchored to one edge of the screen, for secondary content and
   18	        settings. <code>side</code> picks the edge: <code>right</code> (the
   19	        default), <code>left</code>, <code>top</code> or <code>bottom</code>.
   20	      </p>
   21	
   22	      <h2>Sides</h2>
   23	      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
   24	        <Example title="Right" description="The default side">
   25	          <Stage height={440}>
   26	            {(container) => (
   27	              <Sheet open modal={false}>
   28	                <SheetContent container={container}>
   29	                  <SheetHeader>
   30	                    <SheetTitle>Sheet Title</SheetTitle>
   31	                    <SheetDescription>
   32	                      This is a basic sheet that slides in from the right side.
   33	                    </SheetDescription>
   34	                  </SheetHeader>
   35	                  <div style={{ padding: "1rem" }}>
   36	                    <p>Sheet content goes here</p>
   37	                  </div>
   38	                </SheetContent>
   39	              </Sheet>
   40	            )}
   41	          </Stage>
   42	        </Example>
   43	
   44	        <Example
   45	          title="Left with footer"
   46	          description="A SheetFooter pinned below the content"
   47	        >
   48	          <Stage height={440}>
   49	            {(container) => (
   50	              <Sheet open modal={false}>
   51	                <SheetContent side="left" container={container}>
   52	                  <SheetHeader>
   53	                    <SheetTitle>Settings</SheetTitle>
   54	                    <SheetDescription>
   55	                      Manage your account settings and preferences.
   56	                    </SheetDescription>
   57	                  </SheetHeader>
   58	                  <div style={{ padding: "1rem" }}>
   59	                    <p>Content area</p>
   60	                  </div>
   61	                  <SheetFooter>
   62	                    <Button variant="outline">Cancel</Button>
   63	                    <Button>Save Changes</Button>
   64	                  </SheetFooter>
   65	                </SheetContent>
   66	              </Sheet>
   67	            )}
   68	          </Stage>
   69	        </Example>
   70	
   71	        <Example title="Bottom">
   72	          <Stage height={440}>
   73	            {(container) => (
   74	              <Sheet open modal={false}>
   75	                <SheetContent side="bottom" container={container}>
   76	                  <SheetHeader>
   77	                    <SheetTitle>Bottom Sheet</SheetTitle>
   78	                    <SheetDescription>
   79	                      This sheet slides up from the bottom of the screen.
   80	                    </SheetDescription>
   81	                  </SheetHeader>
   82	                  <div style={{ padding: "1rem" }}>
   83	                    <p>Bottom sheet content</p>
   84	                  </div>
   85	                </SheetContent>
   86	              </Sheet>
   87	            )}
   88	          </Stage>
   89	        </Example>
   90	      </div>
   91	    </>
   92	  );
   93	}
   94	
