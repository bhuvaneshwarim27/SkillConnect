
import { Example } from "@floot/examples";
import { Switch } from "./Switch";

const row = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  alignItems: "flex-start",
} as const;
   10	
   11	const field = {
   12	  display: "flex",
   13	  alignItems: "center",
   14	  gap: "0.5rem",
   15	} as const;
   16	
   17	export default function SwitchShowcase() {
   18	  return (
   19	    <>
   20	      <h1>Switch</h1>
   21	      <p>A toggle that turns a single setting on or off.</p>
   22	
   23	      <h2>States</h2>
   24	      <div style={row}>
   25	        <Example title="Off">
   26	          <div style={field}>
   27	            <Switch id="airplane-mode" />
   28	            <label htmlFor="airplane-mode">Airplane Mode</label>
   29	          </div>
   30	        </Example>
   31	        <Example title="Disabled unchecked">
   32	          <div style={field}>
   33	            <Switch id="disabled-unchecked" disabled />
   34	            <label htmlFor="disabled-unchecked">Disabled Unchecked</label>
   35	          </div>
   36	        </Example>
   37	        <Example title="Disabled checked">
   38	          <div style={field}>
   39	            <Switch id="disabled-checked" disabled defaultChecked />
   40	            <label htmlFor="disabled-checked">Disabled Checked</label>
   41	          </div>
   42	        </Example>
   43	      </div>
   44	    </>
   45	  );
   46	}
   47	
