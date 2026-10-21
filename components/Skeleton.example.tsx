
import { Example } from "@floot/examples";
import { Skeleton } from "./Skeleton";

export default function SkeletonShowcase() {
  return (
    <>
      <h1>Skeleton</h1>
      <p>
        A placeholder block that stands in for content while it is loading. Size
   10	        and shape come from the <code>style</code> or <code>className</code> you
   11	        pass.
   12	      </p>
   13	
   14	      <h2>Usage</h2>
   15	      <div
   16	        style={{
   17	          display: "flex",
   18	          flexWrap: "wrap",
   19	          gap: "1rem",
   20	          alignItems: "flex-start",
   21	        }}
   22	      >
   23	        <Example title="Text lines">
   24	          <div
   25	            style={{
   26	              display: "flex",
   27	              flexDirection: "column",
   28	              gap: "var(--spacing-sm)",
   29	            }}
   30	          >
   31	            <Skeleton style={{ width: "200px", height: "2rem" }} />
   32	            <Skeleton style={{ width: "160px", height: "1rem" }} />
   33	            <Skeleton style={{ width: "180px", height: "1rem" }} />
   34	          </div>
   35	        </Example>
   36	
   37	        <Example title="Profile">
   38	          <div
   39	            style={{
   40	              display: "flex",
   41	              gap: "var(--spacing-sm)",
   42	              alignItems: "center",
   43	            }}
   44	          >
   45	            <Skeleton
   46	              style={{ width: "4rem", height: "4rem", borderRadius: "50%" }}
   47	            />
   48	            <div
   49	              style={{
   50	                display: "flex",
   51	                flexDirection: "column",
   52	                gap: "var(--spacing-xs)",
   53	              }}
   54	            >
   55	              <Skeleton style={{ width: "150px", height: "1.5rem" }} />
   56	              <Skeleton style={{ width: "100px", height: "1rem" }} />
   57	            </div>
   58	          </div>
   59	        </Example>
   60	      </div>
   61	    </>
   62	  );
   63	}
   64	
