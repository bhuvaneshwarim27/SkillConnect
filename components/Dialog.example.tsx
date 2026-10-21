
import { useState } from "react";
import { Example, Stage } from "@floot/examples";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
   10	  DialogFooter,
   11	} from "./Dialog";
   12	import { Button } from "./Button";
   13	import { Input } from "./Input";
   14	
   15	const fieldColumn = {
   16	  display: "flex",
   17	  flexDirection: "column",
   18	  gap: "var(--spacing-2)",
   19	} as const;
   20	
   21	const labelStyle = { fontSize: "0.875rem", fontWeight: 500 } as const;
   22	
   23	function EditProfileDialog({ container }: { container: HTMLElement | null }) {
   24	  const [name, setName] = useState("Jane Doe");
   25	  const [email, setEmail] = useState("jane.doe@example.com");
   26	
   27	  return (
   28	    <Dialog open modal={false}>
   29	      <DialogContent container={container}>
   30	        <DialogHeader>
   31	          <DialogTitle>Edit Profile</DialogTitle>
   32	          <DialogDescription>
   33	            Update your profile information below. Click Save when you're done
   34	            to apply the changes to your account.
   35	          </DialogDescription>
   36	        </DialogHeader>
   37	        <div
   38	          style={{
   39	            display: "flex",
   40	            flexDirection: "column",
   41	            gap: "var(--spacing-4)",
   42	          }}
   43	        >
   44	          <div style={fieldColumn}>
   45	            <label htmlFor="profile-name" style={labelStyle}>
   46	              Full Name
   47	            </label>
   48	            <Input
   49	              id="profile-name"
   50	              value={name}
   51	              onChange={(e) => setName(e.target.value)}
   52	              placeholder="Enter your full name"
   53	            />
   54	          </div>
   55	          <div style={fieldColumn}>
   56	            <label htmlFor="profile-email" style={labelStyle}>
   57	              Email Address
   58	            </label>
   59	            <Input
   60	              id="profile-email"
   61	              type="email"
   62	              value={email}
   63	              onChange={(e) => setEmail(e.target.value)}
   64	              placeholder="Enter your email"
   65	            />
   66	          </div>
   67	        </div>
   68	        <DialogFooter>
   69	          <DialogClose asChild>
   70	            <Button variant="secondary">Cancel</Button>
   71	          </DialogClose>
   72	          <Button>Save Changes</Button>
   73	        </DialogFooter>
   74	      </DialogContent>
   75	    </Dialog>
   76	  );
   77	}
   78	
   79	export default function DialogShowcase() {
   80	  return (
   81	    <>
   82	      <h1>Dialog</h1>
   83	      <p>
   84	        A window layered over the page for a focused task or confirmation. It
   85	        dims the page behind it, traps focus, and closes on{" "}
   86	        <code>Escape</code> or the corner button.
   87	      </p>
   88	      <p>
   89	        <code>DialogHeader</code>, <code>DialogFooter</code> and the
   90	        title/description parts are optional slots — the content below is the
   91	        same component with and without a body between them.
   92	      </p>
   93	
   94	      <h2>Examples</h2>
   95	      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
   96	        <Example
   97	          title="Basic"
   98	          description="Title, description and a pair of footer actions"
   99	        >
  100	          <Stage height={420}>
  101	            {(container) => (
  102	              <Dialog open modal={false}>
  103	                <DialogContent container={container}>
  104	                  <DialogHeader>
  105	                    <DialogTitle>Basic Dialog</DialogTitle>
  106	                    <DialogDescription>
  107	                      This is a basic dialog with a title, description, and
  108	                      footer buttons.
  109	                    </DialogDescription>
  110	                  </DialogHeader>
  111	                  <DialogFooter>
  112	                    <Button variant="secondary">Cancel</Button>
  113	                    <Button>Confirm</Button>
  114	                  </DialogFooter>
  115	                </DialogContent>
  116	              </Dialog>
  117	            )}
  118	          </Stage>
  119	        </Example>
  120	
  121	        <Example
  122	          title="Edit profile"
  123	          description="Form fields between the header and the footer"
  124	        >
  125	          <Stage height={520}>
  126	            {(container) => <EditProfileDialog container={container} />}
  127	          </Stage>
  128	        </Example>
  129	      </div>
  130	    </>
  131	  );
  132	}
  133	
