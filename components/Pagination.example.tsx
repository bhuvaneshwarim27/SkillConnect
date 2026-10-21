
import { Example } from "@floot/examples";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
   10	} from "./Pagination";
   11	
   12	export default function PaginationShowcase() {
   13	  return (
   14	    <>
   15	      <h1>Pagination</h1>
   16	      <p>
   17	        Navigation for moving between pages of a long list or result set.
   18	      </p>
   19	
   20	      <h2>Examples</h2>
   21	      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
   22	        <Example title="Basic" width={520}>
   23	          <Pagination>
   24	            <PaginationContent>
   25	              <PaginationItem>
   26	                <PaginationPrevious href="#" />
   27	              </PaginationItem>
   28	              <PaginationItem>
   29	                <PaginationLink href="#" isActive>
   30	                  1
   31	                </PaginationLink>
   32	              </PaginationItem>
   33	              <PaginationItem>
   34	                <PaginationLink href="#">2</PaginationLink>
   35	              </PaginationItem>
   36	              <PaginationItem>
   37	                <PaginationLink href="#">3</PaginationLink>
   38	              </PaginationItem>
   39	              <PaginationItem>
   40	                <PaginationNext href="#" />
   41	              </PaginationItem>
   42	            </PaginationContent>
   43	          </Pagination>
   44	        </Example>
   45	
   46	        <Example title="With ellipsis" width={520}>
   47	          <Pagination>
   48	            <PaginationContent>
   49	              <PaginationItem>
   50	                <PaginationPrevious href="#" />
   51	              </PaginationItem>
   52	              <PaginationItem>
   53	                <PaginationLink href="#">1</PaginationLink>
   54	              </PaginationItem>
   55	              <PaginationItem>
   56	                <PaginationEllipsis />
   57	              </PaginationItem>
   58	              <PaginationItem>
   59	                <PaginationLink href="#">4</PaginationLink>
   60	              </PaginationItem>
   61	              <PaginationItem>
   62	                <PaginationLink href="#" isActive>
   63	                  5
   64	                </PaginationLink>
   65	              </PaginationItem>
   66	              <PaginationItem>
   67	                <PaginationLink href="#">6</PaginationLink>
   68	              </PaginationItem>
   69	              <PaginationItem>
   70	                <PaginationEllipsis />
   71	              </PaginationItem>
   72	              <PaginationItem>
   73	                <PaginationLink href="#">10</PaginationLink>
   74	              </PaginationItem>
   75	              <PaginationItem>
   76	                <PaginationNext href="#" />
   77	              </PaginationItem>
   78	            </PaginationContent>
   79	          </Pagination>
   80	        </Example>
   81	
   82	        <Example title="Compact" width={520}>
   83	          <Pagination>
   84	            <PaginationContent>
   85	              <PaginationItem>
   86	                <PaginationPrevious href="#" />
   87	              </PaginationItem>
   88	              <PaginationItem>
   89	                <PaginationLink href="#" isActive>
   90	                  5
   91	                </PaginationLink>
   92	              </PaginationItem>
   93	              <PaginationItem>
   94	                <PaginationNext href="#" />
   95	              </PaginationItem>
   96	            </PaginationContent>
   97	          </Pagination>
   98	        </Example>
   99	      </div>
  100	    </>
  101	  );
  102	}
  103	
