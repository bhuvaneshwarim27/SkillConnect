
import { Example } from "@floot/examples";
import { Separator } from "./Separator";

export default function SeparatorShowcase() {
  return (
    <>
      <h1>Separator</h1>
      <p>A thin rule that divides content, either horizontally or vertically.</p>

   10	      <h2>Orientation</h2>
   11	      <Example title="Horizontal" fullBleed>
   12	        <div>
   13	          <div>Above content</div>
   14	          <Separator />
   15	          <div>Below content</div>
   16	        </div>
   17	      </Example>
   18	
   19	      <Example title="Vertical" fullBleed>
   20	        <div
   21	          style={{
   22	            display: "flex",
   23	            alignItems: "center",
   24	            height: "1.5rem",
   25	            gap: "var(--spacing-sm)",
   26	          }}
   27	        >
   28	          <span>Left</span>
   29	          <Separator orientation="vertical" />
   30	          <span>Right</span>
   31	        </div>
   32	      </Example>
   33	
   34	      <Example title="Multiple vertical" fullBleed>
   35	        <div
   36	          style={{
   37	            display: "flex",
   38	            alignItems: "center",
   39	            height: "1.5rem",
   40	            gap: "var(--spacing-sm)",
   41	          }}
   42	        >
   43	          <span>Item 1</span>
   44	          <Separator orientation="vertical" />
   45	          <span>Item 2</span>
   46	          <Separator orientation="vertical" />
   47	          <span>Item 3</span>
   48	        </div>
   49	      </Example>
   50	
   51	      <h2>Semantics</h2>
   52	      <Example
   53	        title="Non-decorative"
   54	        description="Exposed to assistive technology as a separator instead of being hidden."
   55	        fullBleed
   56	      >
   57	        <div>
   58	          <div>Section 1</div>
   59	          <Separator decorative={false} />
   60	          <div>Section 2</div>
   61	        </div>
   62	      </Example>
   63	    </>
   64	  );
   65	}
   66	
