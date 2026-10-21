
import { Example } from "@floot/examples";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
   10	  SelectValue,
   11	} from "./Select";
   12	
   13	export default function SelectShowcase() {
   14	  return (
   15	    <>
   16	      <h1>Select</h1>
   17	      <p>
   18	        A trigger that opens a list of options and shows the chosen one. Open a
   19	        trigger to see its options.
   20	      </p>
   21	
   22	      <h2>Examples</h2>
   23	      <div
   24	        style={{
   25	          display: "flex",
   26	          flexWrap: "wrap",
   27	          gap: "1rem",
   28	          alignItems: "flex-start",
   29	        }}
   30	      >
   31	        <Example title="Basic" width={260}>
   32	          <Select>
   33	            <SelectTrigger>
   34	              <SelectValue placeholder="Select a fruit" />
   35	            </SelectTrigger>
   36	            <SelectContent>
   37	              <SelectGroup>
   38	                <SelectItem value="apple">Apple</SelectItem>
   39	                <SelectItem value="banana">Banana</SelectItem>
   40	                <SelectItem value="orange">Orange</SelectItem>
   41	              </SelectGroup>
   42	            </SelectContent>
   43	          </Select>
   44	        </Example>
   45	
   46	        <Example title="Items with markers" width={260}>
   47	          <Select>
   48	            <SelectTrigger>
   49	              <SelectValue placeholder="Select a fruit" />
   50	            </SelectTrigger>
   51	            <SelectContent>
   52	              <SelectGroup>
   53	                <SelectItem value="apple">
   54	                  <div
   55	                    style={{
   56	                      display: "flex",
   57	                      alignItems: "center",
   58	                      gap: "var(--spacing-2)",
   59	                    }}
   60	                  >
   61	                    <div
   62	                      style={{
   63	                        background: "red",
   64	                        height: "var(--spacing-2)",
   65	                        width: "var(--spacing-2)",
   66	                        borderRadius: "var(--spacing-2)",
   67	                      }}
   68	                    />
   69	                    Apple
   70	                  </div>
   71	                </SelectItem>
   72	                <SelectItem value="banana">
   73	                  <div
   74	                    style={{
   75	                      display: "flex",
   76	                      alignItems: "center",
   77	                      gap: "var(--spacing-2)",
   78	                    }}
   79	                  >
   80	                    <div
   81	                      style={{
   82	                        background: "yellow",
   83	                        height: "var(--spacing-2)",
   84	                        width: "var(--spacing-2)",
   85	                        borderRadius: "var(--spacing-2)",
   86	                      }}
   87	                    />
   88	                    Banana
   89	                  </div>
   90	                </SelectItem>
   91	                <SelectItem value="orange">
   92	                  <div
   93	                    style={{
   94	                      display: "flex",
   95	                      alignItems: "center",
   96	                      gap: "var(--spacing-2)",
   97	                    }}
   98	                  >
   99	                    <div
  100	                      style={{
  101	                        background: "orange",
  102	                        height: "var(--spacing-2)",
  103	                        width: "var(--spacing-2)",
  104	                        borderRadius: "var(--spacing-2)",
  105	                      }}
  106	                    />
  107	                    Orange
  108	                  </div>
  109	                </SelectItem>
  110	              </SelectGroup>
  111	            </SelectContent>
  112	          </Select>
  113	        </Example>
  114	
  115	        <Example title="Groups and labels" width={260}>
  116	          <Select>
  117	            <SelectTrigger>
  118	              <SelectValue placeholder="Select a food" />
  119	            </SelectTrigger>
  120	            <SelectContent>
  121	              <SelectGroup>
  122	                <SelectLabel>Fruits</SelectLabel>
  123	                <SelectItem value="apple">Apple</SelectItem>
  124	                <SelectItem value="banana">Banana</SelectItem>
  125	              </SelectGroup>
  126	              <SelectSeparator />
  127	              <SelectGroup>
  128	                <SelectLabel>Vegetables</SelectLabel>
  129	                <SelectItem value="carrot">Carrot</SelectItem>
  130	                <SelectItem value="potato">Potato</SelectItem>
  131	              </SelectGroup>
  132	            </SelectContent>
  133	          </Select>
  134	        </Example>
  135	
  136	        <Example title="Disabled" width={260}>
  137	          <Select disabled>
  138	            <SelectTrigger>
  139	              <SelectValue placeholder="Disabled select" />
  140	            </SelectTrigger>
  141	            <SelectContent>
  142	              <SelectGroup>
  143	                <SelectItem value="1">Option 1</SelectItem>
  144	                <SelectItem value="2">Option 2</SelectItem>
  145	              </SelectGroup>
  146	            </SelectContent>
  147	          </Select>
  148	        </Example>
  149	
  150	        <Example title="Long options" width={260}>
  151	          <Select>
  152	            <SelectTrigger>
  153	              <SelectValue placeholder="Select a long option" />
  154	            </SelectTrigger>
  155	            <SelectContent>
  156	              <SelectGroup>
  157	                <SelectItem value="1">
  158	                  This is a very long option that should be truncated
  159	                </SelectItem>
  160	                <SelectItem value="2">
  161	                  Another long option that demonstrates width handling
  162	                </SelectItem>
  163	                <SelectItem value="3">Short option</SelectItem>
  164	              </SelectGroup>
  165	            </SelectContent>
  166	          </Select>
  167	        </Example>
  168	      </div>
  169	    </>
  170	  );
  171	}
  172	
