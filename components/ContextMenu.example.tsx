
import { Example } from "@floot/examples";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
   10	  ContextMenuSub,
   11	  ContextMenuSubContent,
   12	  ContextMenuSubTrigger,
   13	  ContextMenuTrigger,
   14	} from "./ContextMenu";
   15	
   16	export default function ContextMenuShowcase() {
   17	  return (
   18	    <>
   19	      <h1>ContextMenu</h1>
   20	      <p>
   21	        A menu that opens where the pointer is when an area is right-clicked,
   22	        with items, shortcuts, checkbox items, and nested submenus.
   23	      </p>
   24	
   25	      <h2>Examples</h2>
   26	      <div
   27	        style={{
   28	          display: "flex",
   29	          flexWrap: "wrap",
   30	          gap: "1rem",
   31	          alignItems: "flex-start",
   32	        }}
   33	      >
   34	        <Example title="File actions">
   35	          <ContextMenu modal={false}>
   36	            <ContextMenuTrigger>
   37	              <div
   38	                style={{
   39	                  padding: "var(--spacing-xl)",
   40	                  border: "1px solid var(--color-border)",
   41	                  borderRadius: "var(--radius-md)",
   42	                  color: "var(--color-text-primary)",
   43	                }}
   44	              >
   45	                Right click here
   46	              </div>
   47	            </ContextMenuTrigger>
   48	            <ContextMenuContent>
   49	              <ContextMenuLabel>File Operations</ContextMenuLabel>
   50	              <ContextMenuItem>
   51	                New File
   52	                <ContextMenuShortcut>⌘N</ContextMenuShortcut>
   53	              </ContextMenuItem>
   54	              <ContextMenuItem>
   55	                Open
   56	                <ContextMenuShortcut>⌘O</ContextMenuShortcut>
   57	              </ContextMenuItem>
   58	              <ContextMenuSeparator />
   59	              <ContextMenuLabel>View Options</ContextMenuLabel>
   60	              <ContextMenuCheckboxItem checked>
   61	                Show Hidden Files
   62	              </ContextMenuCheckboxItem>
   63	              <ContextMenuCheckboxItem>Show Path Bar</ContextMenuCheckboxItem>
   64	              <ContextMenuSeparator />
   65	              <ContextMenuSub>
   66	                <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
   67	                <ContextMenuSubContent>
   68	                  <ContextMenuItem>Copy Link</ContextMenuItem>
   69	                  <ContextMenuItem>Email</ContextMenuItem>
   70	                  <ContextMenuItem>Message</ContextMenuItem>
   71	                </ContextMenuSubContent>
   72	              </ContextMenuSub>
   73	            </ContextMenuContent>
   74	          </ContextMenu>
   75	        </Example>
   76	      </div>
   77	    </>
   78	  );
   79	}
   80	
