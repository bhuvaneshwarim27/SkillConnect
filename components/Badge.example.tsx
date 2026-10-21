
import { Example } from "@floot/examples";
import { Badge } from "./Badge";

export default function BadgeShowcase() {
  return (
    <>
      <h1>Badge</h1>
      <p>A small inline label for status, category, or count.</p>

   10	      <h2>Variants</h2>
   11	      <div
   12	        style={{
   13	          display: "flex",
   14	          flexWrap: "wrap",
   15	          gap: "1rem",
   16	          alignItems: "flex-start",
   17	        }}
   18	      >
   19	        <Example title="Primary">
   20	          <Badge>Active</Badge>
   21	        </Example>
   22	
   23	        <Example title="Secondary">
   24	          <Badge variant="secondary">Premium</Badge>
   25	        </Example>
   26	
   27	        <Example title="Outline">
   28	          <Badge variant="outline">Draft</Badge>
   29	        </Example>
   30	
   31	        <Example title="Destructive">
   32	          <Badge variant="destructive">Expired</Badge>
   33	        </Example>
   34	
   35	        <Example title="Success">
   36	          <Badge variant="success">Completed</Badge>
   37	        </Example>
   38	
   39	        <Example title="Warning">
   40	          <Badge variant="warning">Caution</Badge>
   41	        </Example>
   42	      </div>
   43	    </>
   44	  );
   45	}
   46	
