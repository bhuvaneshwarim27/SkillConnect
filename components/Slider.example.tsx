
import { Example } from "@floot/examples";
import { Slider } from "./Slider";

const row = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  alignItems: "flex-start",
} as const;
   10	
   11	export default function SliderShowcase() {
   12	  return (
   13	    <>
   14	      <h1>Slider</h1>
   15	      <p>A draggable track for picking a number, or a range of numbers, between a minimum and a maximum.</p>
   16	
   17	      <h2>Values</h2>
   18	      <div style={row}>
   19	        <Example title="Single value">
   20	          <Slider defaultValue={[50]} max={100} step={1} />
   21	        </Example>
   22	        <Example title="Stepped">
   23	          <Slider defaultValue={[40]} max={100} step={10} />
   24	        </Example>
   25	        <Example title="Range">
   26	          <Slider defaultValue={[20, 80]} max={100} step={1} />
   27	        </Example>
   28	      </div>
   29	
   30	      <h2>States</h2>
   31	      <div style={row}>
   32	        <Example title="Disabled">
   33	          <Slider defaultValue={[60]} max={100} step={1} disabled />
   34	        </Example>
   35	      </div>
   36	    </>
   37	  );
   38	}
   39	
