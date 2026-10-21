
import { Example } from "@floot/examples";
import { Spinner } from "./Spinner";

export default function SpinnerShowcase() {
  return (
    <>
      <h1>Spinner</h1>
      <p>An indeterminate loading indicator for work with no known duration.</p>

   10	      <h2>Sizes</h2>
   11	      <div
   12	        style={{
   13	          display: "flex",
   14	          flexWrap: "wrap",
   15	          gap: "1rem",
   16	          alignItems: "flex-start",
   17	        }}
   18	      >
   19	        <Example title="Small">
   20	          <Spinner size="sm" />
   21	        </Example>
   22	
   23	        <Example title="Medium">
   24	          <Spinner size="md" />
   25	        </Example>
   26	
   27	        <Example title="Large">
   28	          <Spinner size="lg" />
   29	        </Example>
   30	      </div>
   31	
   32	      <h2>In context</h2>
   33	      <Example title="Loading label">
   34	        <div
   35	          style={{
   36	            display: "inline-flex",
   37	            alignItems: "center",
   38	            gap: "0.5rem",
   39	            padding: "0.25rem 0.75rem",
   40	            background: "var(--color-gray-200)",
   41	            borderRadius: "var(--radius-md)",
   42	            fontSize: "var(--font-size-sm)",
   43	          }}
   44	        >
   45	          <Spinner size="sm" />
   46	          Loading...
   47	        </div>
   48	      </Example>
   49	    </>
   50	  );
   51	}
   52	
