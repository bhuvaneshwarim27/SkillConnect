
import { useEffect, useState } from "react";
import { Example } from "@floot/examples";
import { Progress } from "./Progress";

function AnimatedProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
   10	      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
   11	    }, 1000);
   12	
   13	    return () => clearInterval(timer);
   14	  }, []);
   15	
   16	  return <Progress value={progress} />;
   17	}
   18	
   19	export default function ProgressShowcase() {
   20	  return (
   21	    <>
   22	      <h1>Progress</h1>
   23	      <p>
   24	        A horizontal bar showing how far a task has advanced. It fills the
   25	        width it is given; <code>value</code> is a percentage from 0 to 100.
   26	      </p>
   27	
   28	      <h2>Values</h2>
   29	      <div
   30	        style={{
   31	          display: "flex",
   32	          flexWrap: "wrap",
   33	          gap: "1rem",
   34	          alignItems: "flex-start",
   35	        }}
   36	      >
   37	        <Example title="Partial" width={320}>
   38	          <Progress value={33} />
   39	        </Example>
   40	
   41	        <Example title="Empty" width={320}>
   42	          <Progress value={0} />
   43	        </Example>
   44	
   45	        <Example title="Complete" width={320}>
   46	          <Progress value={100} />
   47	        </Example>
   48	      </div>
   49	
   50	      <h2>Animated</h2>
   51	      <Example
   52	        title="Ticking"
   53	        description="Advances by ten percent every second, then restarts."
   54	        width={320}
   55	      >
   56	        <AnimatedProgress />
   57	      </Example>
   58	    </>
   59	  );
   60	}
   61	
