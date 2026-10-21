
import { Example } from "@floot/examples";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

export default function TabsShowcase() {
  return (
    <>
      <h1>Tabs</h1>
      <p>
        A set of layered sections where only one panel is visible at a time.
   10	      </p>
   11	
   12	      <h2>Examples</h2>
   13	      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
   14	        <Example title="Basic" fullBleed>
   15	          <Tabs defaultValue="tab1">
   16	            <TabsList>
   17	              <TabsTrigger value="tab1">Account</TabsTrigger>
   18	              <TabsTrigger value="tab2">Settings</TabsTrigger>
   19	              <TabsTrigger value="tab3">Profile</TabsTrigger>
   20	            </TabsList>
   21	            <TabsContent value="tab1">
   22	              Account settings and preferences
   23	            </TabsContent>
   24	            <TabsContent value="tab2">System configuration options</TabsContent>
   25	            <TabsContent value="tab3">User profile information</TabsContent>
   26	          </Tabs>
   27	        </Example>
   28	
   29	        <Example title="Many tabs" fullBleed>
   30	          <Tabs defaultValue="code">
   31	            <TabsList>
   32	              <TabsTrigger value="code">Code</TabsTrigger>
   33	              <TabsTrigger value="preview">Preview</TabsTrigger>
   34	              <TabsTrigger value="tests">Tests</TabsTrigger>
   35	              <TabsTrigger value="deployment">Deployment</TabsTrigger>
   36	            </TabsList>
   37	            <TabsContent value="code">Source code editor</TabsContent>
   38	            <TabsContent value="preview">
   39	              Live preview of the application
   40	            </TabsContent>
   41	            <TabsContent value="tests">Test suite results</TabsContent>
   42	            <TabsContent value="deployment">
   43	              Deployment configuration
   44	            </TabsContent>
   45	          </Tabs>
   46	        </Example>
   47	
   48	        <Example title="Disabled tab" fullBleed>
   49	          <Tabs defaultValue="active">
   50	            <TabsList>
   51	              <TabsTrigger value="active">Active</TabsTrigger>
   52	              <TabsTrigger value="pending">Pending</TabsTrigger>
   53	              <TabsTrigger value="completed" disabled>
   54	                Completed
   55	              </TabsTrigger>
   56	            </TabsList>
   57	            <TabsContent value="active">Active items list</TabsContent>
   58	            <TabsContent value="pending">Pending items list</TabsContent>
   59	            <TabsContent value="completed">Completed items list</TabsContent>
   60	          </Tabs>
   61	        </Example>
   62	      </div>
   63	    </>
   64	  );
   65	}
   66	
