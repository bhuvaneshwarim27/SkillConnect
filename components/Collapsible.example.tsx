
import { Example } from "@floot/examples";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./Collapsible";
import { Button } from "./Button";

export default function CollapsibleShowcase() {
   10	  return (
   11	    <>
   12	      <h1>Collapsible</h1>
   13	      <p>
   14	        A single section of content that expands and collapses from its own
   15	        trigger.
   16	      </p>
   17	
   18	      <h2>Usage</h2>
   19	      <Example title="Basic" width={480}>
   20	        <Collapsible>
   21	          <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
   22	          <CollapsibleContent>
   23	            This is the collapsible content that will be shown when triggered.
   24	          </CollapsibleContent>
   25	        </Collapsible>
   26	      </Example>
   27	
   28	      <Example
   29	        title="Separate trigger"
   30	        description="The trigger renders as a button beside a non-clickable title."
   31	        width={480}
   32	      >
   33	        <Collapsible>
   34	          <div style={{ display: "flex", alignItems: "center" }}>
   35	            <div style={{ flex: 1 }}>Non clickable title</div>
   36	            <CollapsibleTrigger asChild>
   37	              <Button size="sm" variant="ghost">
   38	                Toggle
   39	              </Button>
   40	            </CollapsibleTrigger>
   41	          </div>
   42	          <CollapsibleContent>
   43	            This is the collapsible content that will be shown when triggered.
   44	          </CollapsibleContent>
   45	        </Collapsible>
   46	      </Example>
   47	    </>
   48	  );
   49	}
   50	
