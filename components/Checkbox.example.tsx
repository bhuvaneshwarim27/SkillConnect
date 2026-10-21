
import { useState } from "react";
import { Example } from "@floot/examples";
import { Checkbox } from "./Checkbox";

const row = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  alignItems: "flex-start",
   10	} as const;
   11	
   12	const field = {
   13	  display: "flex",
   14	  alignItems: "center",
   15	  gap: "0.5rem",
   16	} as const;
   17	
   18	function ControlledCheckboxExample() {
   19	  const [isChecked, setIsChecked] = useState(false);
   20	
   21	  return (
   22	    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
   23	      <div style={field}>
   24	        <Checkbox
   25	          id="controlled"
   26	          checked={isChecked}
   27	          onChange={(e) => setIsChecked(e.target.checked)}
   28	        />
   29	        <label htmlFor="controlled">Controlled checkbox</label>
   30	      </div>
   31	      <div style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>
   32	        Checked: {isChecked ? "true" : "false"}
   33	      </div>
   34	    </div>
   35	  );
   36	}
   37	
   38	export default function CheckboxShowcase() {
   39	  return (
   40	    <>
   41	      <h1>Checkbox</h1>
   42	      <p>A square control for toggling a single option on or off.</p>
   43	
   44	      <h2>States</h2>
   45	      <div style={row}>
   46	        <Example title="Unchecked">
   47	          <div style={field}>
   48	            <Checkbox id="basic" />
   49	            <label htmlFor="basic">Basic checkbox</label>
   50	          </div>
   51	        </Example>
   52	        <Example title="Checked">
   53	          <div style={field}>
   54	            <Checkbox id="checked" defaultChecked />
   55	            <label htmlFor="checked">Checked by default</label>
   56	          </div>
   57	        </Example>
   58	        <Example title="Disabled">
   59	          <div style={field}>
   60	            <Checkbox id="disabled" disabled />
   61	            <label htmlFor="disabled">Disabled</label>
   62	          </div>
   63	        </Example>
   64	        <Example title="Disabled checked">
   65	          <div style={field}>
   66	            <Checkbox id="disabledChecked" disabled defaultChecked />
   67	            <label htmlFor="disabledChecked">Disabled checked</label>
   68	          </div>
   69	        </Example>
   70	      </div>
   71	
   72	      <h2>Controlled</h2>
   73	      <div style={row}>
   74	        <Example title="Controlled">
   75	          <ControlledCheckboxExample />
   76	        </Example>
   77	      </div>
   78	    </>
   79	  );
   80	}
   81	
