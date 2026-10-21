
import { Example } from "@floot/examples";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

export default function AccordionShowcase() {
   10	  return (
   11	    <>
   12	      <h1>Accordion</h1>
   13	      <p>
   14	        A vertically stacked set of headings that each reveal a section of
   15	        content.
   16	      </p>
   17	
   18	      <h2>Usage</h2>
   19	      <Example title="Collapsible" width={560}>
   20	        <Accordion type="single" collapsible>
   21	          <AccordionItem value="item-1">
   22	            <AccordionTrigger>What is an accordion?</AccordionTrigger>
   23	            <AccordionContent>
   24	              An accordion is a vertically stacked set of interactive headings
   25	              that each reveal a section of content.
   26	            </AccordionContent>
   27	          </AccordionItem>
   28	        </Accordion>
   29	      </Example>
   30	
   31	      <Example title="Multiple items" width={560}>
   32	        <Accordion type="single">
   33	          <AccordionItem value="item-1">
   34	            <AccordionTrigger>First Section</AccordionTrigger>
   35	            <AccordionContent>
   36	              This is the first section's content. Multiple sections can be open
   37	              at once.
   38	            </AccordionContent>
   39	          </AccordionItem>
   40	          <AccordionItem value="item-2">
   41	            <AccordionTrigger>Second Section</AccordionTrigger>
   42	            <AccordionContent>
   43	              This is the second section's content. Try opening both sections at
   44	              the same time.
   45	            </AccordionContent>
   46	          </AccordionItem>
   47	          <AccordionItem value="item-3">
   48	            <AccordionTrigger>Third Section</AccordionTrigger>
   49	            <AccordionContent>
   50	              This is the third section's content. The animation is smooth and
   51	              natural.
   52	            </AccordionContent>
   53	          </AccordionItem>
   54	        </Accordion>
   55	      </Example>
   56	
   57	      <h2>States</h2>
   58	      <Example title="Disabled item" width={560}>
   59	        <Accordion type="single">
   60	          <AccordionItem value="item-1">
   61	            <AccordionTrigger>Available Section</AccordionTrigger>
   62	            <AccordionContent>
   63	              This section can be expanded and collapsed.
   64	            </AccordionContent>
   65	          </AccordionItem>
   66	          <AccordionItem value="item-2">
   67	            <AccordionTrigger disabled>Disabled Section</AccordionTrigger>
   68	            <AccordionContent>
   69	              This content won't be accessible.
   70	            </AccordionContent>
   71	          </AccordionItem>
   72	        </Accordion>
   73	      </Example>
   74	    </>
   75	  );
   76	}
   77	
