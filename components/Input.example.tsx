
import { Example } from "@floot/examples";
import { Search } from "lucide-react";
import { Input } from "./Input";

const row = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  alignItems: "flex-start",
   10	} as const;
   11	
   12	function SearchInputExample() {
   13	  return (
   14	    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
   15	      <Search
   16	        size={18}
   17	        style={{
   18	          position: "absolute",
   19	          left: "var(--spacing-3)",
   20	          color: "var(--muted-foreground)",
   21	          pointerEvents: "none",
   22	        }}
   23	      />
   24	      <Input
   25	        type="search"
   26	        placeholder="Search..."
   27	        style={{ paddingLeft: "calc(var(--spacing-3) * 2 + 18px)" }}
   28	      />
   29	    </div>
   30	  );
   31	}
   32	
   33	export default function InputShowcase() {
   34	  return (
   35	    <>
   36	      <h1>Input</h1>
   37	      <p>A single-line text field for collecting short values.</p>
   38	
   39	      <h2>States</h2>
   40	      <div style={row}>
   41	        <Example title="Placeholder">
   42	          <Input placeholder="Placeholder text" />
   43	        </Example>
   44	        <Example title="Hover" forceState="hover">
   45	          <Input placeholder="Hover over me" />
   46	        </Example>
   47	        <Example title="Filled">
   48	          <Input defaultValue="Filled value" />
   49	        </Example>
   50	        <Example title="Disabled">
   51	          <Input defaultValue="Disabled" disabled />
   52	        </Example>
   53	        <Example title="Read-only">
   54	          <Input defaultValue="Read-only" readOnly />
   55	        </Example>
   56	      </div>
   57	
   58	      <h2>Types</h2>
   59	      <div style={row}>
   60	        <Example title="Text">
   61	          <Input type="text" placeholder="Text" />
   62	        </Example>
   63	        <Example title="Password">
   64	          <Input type="password" placeholder="Password" />
   65	        </Example>
   66	        <Example title="Email">
   67	          <Input type="email" placeholder="Email" />
   68	        </Example>
   69	        <Example title="Number">
   70	          <Input type="number" placeholder="Number" />
   71	        </Example>
   72	        <Example title="Search">
   73	          <Input type="search" placeholder="Search" />
   74	        </Example>
   75	      </div>
   76	
   77	      <h2>With an icon</h2>
   78	      <div style={row}>
   79	        <Example title="Search with icon">
   80	          <SearchInputExample />
   81	        </Example>
   82	      </div>
   83	    </>
   84	  );
   85	}
   86	
