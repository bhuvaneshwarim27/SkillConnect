
import { Example } from "@floot/examples";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

export default function RadioGroupShowcase() {
  return (
    <>
      <h1>RadioGroup</h1>
      <p>A set of radio options where only one value can be selected at a time.</p>

   10	      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "flex-start" }}>
   11	        <Example title="Single selection">
   12	          <RadioGroup name="size" defaultValue="medium">
   13	            <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
   14	              <RadioGroupItem value="small" id="radio-small" />
   15	              <label htmlFor="radio-small">Small</label>
   16	              <RadioGroupItem value="medium" id="radio-medium" />
   17	              <label htmlFor="radio-medium">Medium</label>
   18	              <RadioGroupItem value="large" id="radio-large" />
   19	              <label htmlFor="radio-large">Large</label>
   20	            </div>
   21	          </RadioGroup>
   22	        </Example>
   23	      </div>
   24	    </>
   25	  );
   26	}
   27	
