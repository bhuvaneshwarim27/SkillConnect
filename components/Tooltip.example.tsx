
import { AlertCircle, Info, Settings } from "lucide-react";
import { Example } from "@floot/examples";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import { Button } from "./Button";

export default function TooltipShowcase() {
  return (
    <>
      <h1>Tooltip</h1>
   10	      <p>
   11	        A short label that appears next to a control to explain what it does. It
   12	        opens on hover or keyboard focus and is anchored to its trigger — the
   13	        examples below are held open so the label is visible at rest.
   14	      </p>
   15	
   16	      <h2>Examples</h2>
   17	      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
   18	        <Example title="Information" width={420}>
   19	          <div style={{ minHeight: 40 }}>
   20	            <Tooltip open>
   21	              <TooltipTrigger asChild>
   22	                <Button variant="ghost" size="icon-sm">
   23	                  <Info size={16} />
   24	                </Button>
   25	              </TooltipTrigger>
   26	              <TooltipContent side="right">
   27	                Helpful information tooltip
   28	              </TooltipContent>
   29	            </Tooltip>
   30	          </div>
   31	        </Example>
   32	
   33	        <Example title="Settings" width={420}>
   34	          <div style={{ minHeight: 40 }}>
   35	            <Tooltip open>
   36	              <TooltipTrigger asChild>
   37	                <Button variant="ghost" size="icon-sm">
   38	                  <Settings size={16} />
   39	                </Button>
   40	              </TooltipTrigger>
   41	              <TooltipContent side="right">Configure settings</TooltipContent>
   42	            </Tooltip>
   43	          </div>
   44	        </Example>
   45	
   46	        <Example title="Warning" width={420}>
   47	          <div style={{ minHeight: 40 }}>
   48	            <Tooltip open>
   49	              <TooltipTrigger asChild>
   50	                <Button variant="ghost" size="icon-sm">
   51	                  <AlertCircle size={16} />
   52	                </Button>
   53	              </TooltipTrigger>
   54	              <TooltipContent side="right">
   55	                Warning: This action cannot be undone
   56	              </TooltipContent>
   57	            </Tooltip>
   58	          </div>
   59	        </Example>
   60	
   61	        <Example
   62	          title="Longer content"
   63	          description="The content wraps at the tooltip's maximum width."
   64	          width={420}
   65	        >
   66	          <div style={{ minHeight: 150 }}>
   67	            <Tooltip open>
   68	              <TooltipTrigger asChild>
   69	                <Button variant="link">Hover for more details</Button>
   70	              </TooltipTrigger>
   71	              <TooltipContent side="bottom" align="start">
   72	                This is a longer tooltip that explains more detailed information
   73	                about the feature or action being described.
   74	              </TooltipContent>
   75	            </Tooltip>
   76	          </div>
   77	        </Example>
   78	      </div>
   79	    </>
   80	  );
   81	}
   82	
