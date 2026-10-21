
import { Example } from "@floot/examples";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
   10	  AlignJustify,
   11	} from "lucide-react";
   12	
   13	const row = {
   14	  display: "flex",
   15	  flexWrap: "wrap",
   16	  gap: "1rem",
   17	  alignItems: "flex-start",
   18	} as const;
   19	
   20	export default function ToggleGroupShowcase() {
   21	  return (
   22	    <>
   23	      <h1>ToggleGroup</h1>
   24	      <p>A row of toggle buttons that share a selection, sized and styled as one unit.</p>
   25	
   26	      <h2>Variants</h2>
   27	      <div style={row}>
   28	        <Example title="Default with icons">
   29	          <ToggleGroup type="single" size="md">
   30	            <ToggleGroupItem value="bold" aria-label="Toggle bold">
   31	              <Bold size={16} />
   32	            </ToggleGroupItem>
   33	            <ToggleGroupItem value="italic" aria-label="Toggle italic">
   34	              <Italic size={16} />
   35	            </ToggleGroupItem>
   36	            <ToggleGroupItem value="underline" aria-label="Toggle underline">
   37	              <Underline size={16} />
   38	            </ToggleGroupItem>
   39	          </ToggleGroup>
   40	        </Example>
   41	        <Example title="Outline with selection">
   42	          <ToggleGroup type="single" defaultValue="left" size="lg" variant="outline">
   43	            <ToggleGroupItem value="left" aria-label="Align left">
   44	              <AlignLeft size={20} />
   45	            </ToggleGroupItem>
   46	            <ToggleGroupItem value="center" aria-label="Align center">
   47	              <AlignCenter size={20} />
   48	            </ToggleGroupItem>
   49	            <ToggleGroupItem value="right" aria-label="Align right">
   50	              <AlignRight size={20} />
   51	            </ToggleGroupItem>
   52	            <ToggleGroupItem value="justify" aria-label="Justify">
   53	              <AlignJustify size={20} />
   54	            </ToggleGroupItem>
   55	          </ToggleGroup>
   56	        </Example>
   57	      </div>
   58	
   59	      <h2>States</h2>
   60	      <div style={row}>
   61	        <Example title="Text with disabled item">
   62	          <ToggleGroup type="single" defaultValue="1" size="sm">
   63	            <ToggleGroupItem value="1">Option 1</ToggleGroupItem>
   64	            <ToggleGroupItem value="2">Option 2</ToggleGroupItem>
   65	            <ToggleGroupItem value="3" disabled>
   66	              Disabled
   67	            </ToggleGroupItem>
   68	          </ToggleGroup>
   69	        </Example>
   70	      </div>
   71	    </>
   72	  );
   73	}
   74	
