
import { Example } from "@floot/examples";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./Resizable";

export default function ResizableShowcase() {
  return (
   10	    <>
   11	      <h1>Resizable</h1>
   12	      <p>
   13	        Panels split by a draggable handle. A <code>ResizablePanelGroup</code>{" "}
   14	        runs horizontally or vertically, and groups can be nested inside a panel
   15	        to build a layout.
   16	      </p>
   17	
   18	      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
   19	        <Example
   20	          fullBleed
   21	          title="Horizontal"
   22	          description="Two panels side by side, divided by a vertical handle."
   23	        >
   24	          <ResizablePanelGroup direction="horizontal" style={{ height: "200px" }}>
   25	            <ResizablePanel>Left Panel Content</ResizablePanel>
   26	            <ResizableHandle />
   27	            <ResizablePanel>Right Panel Content</ResizablePanel>
   28	          </ResizablePanelGroup>
   29	        </Example>
   30	
   31	        <Example
   32	          fullBleed
   33	          title="Vertical"
   34	          description="Two stacked panels, divided by a horizontal handle."
   35	        >
   36	          <ResizablePanelGroup direction="vertical" style={{ height: "200px" }}>
   37	            <ResizablePanel>Top Panel Content</ResizablePanel>
   38	            <ResizableHandle />
   39	            <ResizablePanel>Bottom Panel Content</ResizablePanel>
   40	          </ResizablePanelGroup>
   41	        </Example>
   42	
   43	        <Example
   44	          fullBleed
   45	          title="Nested"
   46	          description="A vertical group inside the middle panel of a horizontal one."
   47	        >
   48	          <ResizablePanelGroup direction="horizontal" style={{ height: "200px" }}>
   49	            <ResizablePanel>Navigation Panel</ResizablePanel>
   50	            <ResizableHandle />
   51	            <ResizablePanel>
   52	              <ResizablePanelGroup direction="vertical">
   53	                <ResizablePanel>Main Content</ResizablePanel>
   54	                <ResizableHandle />
   55	                <ResizablePanel>Details Panel</ResizablePanel>
   56	              </ResizablePanelGroup>
   57	            </ResizablePanel>
   58	            <ResizableHandle />
   59	            <ResizablePanel>Preview Panel</ResizablePanel>
   60	          </ResizablePanelGroup>
   61	        </Example>
   62	      </div>
   63	    </>
   64	  );
   65	}
   66	
