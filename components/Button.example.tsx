
import { Example } from "@floot/examples";
import { Button } from "./Button";
import { StarIcon, SendIcon, TrashIcon, PlusIcon, MenuIcon } from "lucide-react";

const row = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  alignItems: "flex-start",
   10	} as const;
   11	
   12	export default function ButtonShowcase() {
   13	  return (
   14	    <>
   15	      <h1>Button</h1>
   16	      <p>A clickable control that triggers an action, available in several visual variants and sizes.</p>
   17	
   18	      <h2>Variants</h2>
   19	      <div style={row}>
   20	        <Example title="Primary">
   21	          <Button>Primary</Button>
   22	        </Example>
   23	        <Example title="Secondary">
   24	          <Button variant="secondary">Secondary</Button>
   25	        </Example>
   26	        <Example title="Outline">
   27	          <Button variant="outline">Outline</Button>
   28	        </Example>
   29	        <Example title="Ghost">
   30	          <Button variant="ghost">Ghost</Button>
   31	        </Example>
   32	        <Example title="Link">
   33	          <Button variant="link">Link</Button>
   34	        </Example>
   35	        <Example title="Destructive">
   36	          <Button variant="destructive">Destructive</Button>
   37	        </Example>
   38	      </div>
   39	
   40	      <h2>Sizes</h2>
   41	      <div style={row}>
   42	        <Example title="Small">
   43	          <Button size="sm">Small</Button>
   44	        </Example>
   45	        <Example title="Medium">
   46	          <Button size="md">Medium</Button>
   47	        </Example>
   48	        <Example title="Large">
   49	          <Button size="lg">Large</Button>
   50	        </Example>
   51	      </div>
   52	
   53	      <h2>Icon buttons</h2>
   54	      <div style={row}>
   55	        <Example title="Icon small">
   56	          <Button size="icon-sm">
   57	            <StarIcon size={14} />
   58	          </Button>
   59	        </Example>
   60	        <Example title="Icon medium">
   61	          <Button size="icon-md">
   62	            <SendIcon size={16} />
   63	          </Button>
   64	        </Example>
   65	        <Example title="Icon large">
   66	          <Button size="icon-lg">
   67	            <PlusIcon size={20} />
   68	          </Button>
   69	        </Example>
   70	        <Example title="Icon outline">
   71	          <Button variant="outline" size="icon-md">
   72	            <MenuIcon size={16} />
   73	          </Button>
   74	        </Example>
   75	        <Example title="Icon destructive">
   76	          <Button variant="destructive" size="icon-md">
   77	            <TrashIcon size={16} />
   78	          </Button>
   79	        </Example>
   80	      </div>
   81	
   82	      <h2>With icons</h2>
   83	      <div style={row}>
   84	        <Example title="Star">
   85	          <Button>
   86	            <StarIcon size={16} /> Star
   87	          </Button>
   88	        </Example>
   89	        <Example title="Send">
   90	          <Button variant="secondary">
   91	            <SendIcon size={16} /> Send
   92	          </Button>
   93	        </Example>
   94	        <Example title="Delete">
   95	          <Button variant="destructive">
   96	            <TrashIcon size={16} /> Delete
   97	          </Button>
   98	        </Example>
   99	      </div>
  100	
  101	      <h2>States</h2>
  102	      <div style={row}>
  103	        <Example title="Normal">
  104	          <Button>Normal</Button>
  105	        </Example>
  106	        <Example title="Disabled">
  107	          <Button disabled>Disabled</Button>
  108	        </Example>
  109	      </div>
  110	    </>
  111	  );
  112	}
  113	
