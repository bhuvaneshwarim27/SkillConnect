
import { Bell } from "lucide-react";
import { Example } from "@floot/examples";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Button } from "./Button";

export default function PopoverShowcase() {
  return (
    <>
      <h1>Popover</h1>
   10	      <p>
   11	        A floating panel anchored to a trigger, holding rich content such as
   12	        text, controls, or a card. <code>removeBackgroundAndPadding</code> drops
   13	        the default panel chrome so the content can supply its own.
   14	      </p>
   15	
   16	      <h2>Examples</h2>
   17	      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
   18	        <Example
   19	          title="Basic"
   20	          description="The default panel, with its own surface and padding."
   21	          width={420}
   22	        >
   23	          <div style={{ minHeight: 130 }}>
   24	            <Popover open modal={false}>
   25	              <PopoverTrigger asChild>
   26	                <Button>Click me</Button>
   27	              </PopoverTrigger>
   28	              <PopoverContent side="bottom" align="start">
   29	                <p style={{ margin: 0 }}>
   30	                  This is a basic popover with simple text content.
   31	                </p>
   32	              </PopoverContent>
   33	            </Popover>
   34	          </div>
   35	        </Example>
   36	
   37	        <Example
   38	          title="Custom card"
   39	          description="Panel chrome removed, so the content draws its own surface."
   40	          width={420}
   41	        >
   42	          <div style={{ minHeight: 110 }}>
   43	            <Popover open modal={false}>
   44	              <PopoverTrigger asChild>
   45	                <Button variant="ghost" size="icon">
   46	                  <Bell size={16} />
   47	                </Button>
   48	              </PopoverTrigger>
   49	              <PopoverContent
   50	                side="bottom"
   51	                align="start"
   52	                removeBackgroundAndPadding
   53	              >
   54	                <div
   55	                  style={{
   56	                    background: "var(--surface)",
   57	                    padding: "var(--spacing-3)",
   58	                    border: "1px solid var(--border)",
   59	                  }}
   60	                >
   61	                  Card
   62	                </div>
   63	              </PopoverContent>
   64	            </Popover>
   65	          </div>
   66	        </Example>
   67	      </div>
   68	    </>
   69	  );
   70	}
   71	
