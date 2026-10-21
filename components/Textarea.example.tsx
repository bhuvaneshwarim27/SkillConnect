
import { Example } from "@floot/examples";
import { Textarea } from "./Textarea";

const row = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  alignItems: "flex-start",
} as const;
   10	
   11	export default function TextareaShowcase() {
   12	  return (
   13	    <>
   14	      <h1>Textarea</h1>
   15	      <p>A multi-line text field for longer free-form input.</p>
   16	
   17	      <h2>Variants</h2>
   18	      <div style={row}>
   19	        <Example title="Default">
   20	          <Textarea placeholder="Enter your description..." />
   21	        </Example>
   22	        <Example title="Clear">
   23	          <Textarea placeholder="Clear textarea" rows={4} variant="clear" />
   24	        </Example>
   25	      </div>
   26	
   27	      <h2>Options</h2>
   28	      <div style={row}>
   29	        <Example title="Non-resizable">
   30	          <Textarea placeholder="This textarea cannot be resized" disableResize />
   31	        </Example>
   32	        <Example title="Multiline">
   33	          <Textarea placeholder="Multiline textarea" rows={10} />
   34	        </Example>
   35	      </div>
   36	
   37	      <h2>States</h2>
   38	      <div style={row}>
   39	        <Example title="Disabled">
   40	          <Textarea placeholder="Disabled textarea" disabled />
   41	        </Example>
   42	      </div>
   43	    </>
   44	  );
   45	}
   46	
