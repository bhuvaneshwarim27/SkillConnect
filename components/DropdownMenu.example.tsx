
import { useState } from "react";
import {
  ChevronDown,
  Cloud,
  Github,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
   10	  PlusCircle,
   11	  Settings,
   12	  User,
   13	} from "lucide-react";
   14	import { Example } from "@floot/examples";
   15	import {
   16	  DropdownMenu,
   17	  DropdownMenuCheckboxItem,
   18	  DropdownMenuContent,
   19	  DropdownMenuGroup,
   20	  DropdownMenuItem,
   21	  DropdownMenuLabel,
   22	  DropdownMenuRadioGroup,
   23	  DropdownMenuRadioItem,
   24	  DropdownMenuSeparator,
   25	  DropdownMenuShortcut,
   26	  DropdownMenuSub,
   27	  DropdownMenuSubContent,
   28	  DropdownMenuSubTrigger,
   29	  DropdownMenuTrigger,
   30	} from "./DropdownMenu";
   31	import { Button } from "./Button";
   32	
   33	function AccountMenu() {
   34	  const [showStatusBar, setShowStatusBar] = useState(true);
   35	  const [showActivityBar, setShowActivityBar] = useState(false);
   36	  const [showPanel, setShowPanel] = useState(false);
   37	  const [position, setPosition] = useState("bottom");
   38	
   39	  return (
   40	    <DropdownMenu open modal={false}>
   41	      <DropdownMenuTrigger asChild>
   42	        <Button>
   43	          Options
   44	          <ChevronDown size={16} />
   45	        </Button>
   46	      </DropdownMenuTrigger>
   47	      <DropdownMenuContent>
   48	        <DropdownMenuLabel>My Account</DropdownMenuLabel>
   49	        <DropdownMenuSeparator />
   50	        <DropdownMenuGroup>
   51	          <DropdownMenuItem>
   52	            <User size={16} style={{ marginRight: 8 }} />
   53	            Profile
   54	            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
   55	          </DropdownMenuItem>
   56	          <DropdownMenuItem>
   57	            <Settings size={16} style={{ marginRight: 8 }} />
   58	            Settings
   59	            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
   60	          </DropdownMenuItem>
   61	        </DropdownMenuGroup>
   62	        <DropdownMenuSeparator />
   63	        <DropdownMenuGroup>
   64	          <DropdownMenuItem>
   65	            <MessageSquare size={16} style={{ marginRight: 8 }} />
   66	            Messages
   67	          </DropdownMenuItem>
   68	          <DropdownMenuItem>
   69	            <Mail size={16} style={{ marginRight: 8 }} />
   70	            Email
   71	          </DropdownMenuItem>
   72	        </DropdownMenuGroup>
   73	        <DropdownMenuSeparator />
   74	        <DropdownMenuGroup>
   75	          <DropdownMenuSub>
   76	            <DropdownMenuSubTrigger>
   77	              <Cloud size={16} style={{ marginRight: 8 }} />
   78	              Workspace
   79	            </DropdownMenuSubTrigger>
   80	            <DropdownMenuSubContent>
   81	              <DropdownMenuItem>
   82	                <PlusCircle size={16} style={{ marginRight: 8 }} />
   83	                Create New...
   84	              </DropdownMenuItem>
   85	              <DropdownMenuSeparator />
   86	              <DropdownMenuCheckboxItem
   87	                checked={showStatusBar}
   88	                onCheckedChange={setShowStatusBar}
   89	              >
   90	                Status Bar
   91	              </DropdownMenuCheckboxItem>
   92	              <DropdownMenuCheckboxItem
   93	                checked={showActivityBar}
   94	                onCheckedChange={setShowActivityBar}
   95	              >
   96	                Activity Bar
   97	              </DropdownMenuCheckboxItem>
   98	              <DropdownMenuCheckboxItem
   99	                checked={showPanel}
  100	                onCheckedChange={setShowPanel}
  101	              >
  102	                Panel
  103	              </DropdownMenuCheckboxItem>
  104	              <DropdownMenuSeparator />
  105	              <DropdownMenuLabel>Position</DropdownMenuLabel>
  106	              <DropdownMenuRadioGroup
  107	                value={position}
  108	                onValueChange={setPosition}
  109	              >
  110	                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
  111	                <DropdownMenuRadioItem value="bottom">
  112	                  Bottom
  113	                </DropdownMenuRadioItem>
  114	                <DropdownMenuRadioItem value="right">
  115	                  Right
  116	                </DropdownMenuRadioItem>
  117	              </DropdownMenuRadioGroup>
  118	            </DropdownMenuSubContent>
  119	          </DropdownMenuSub>
  120	          <DropdownMenuItem>
  121	            <Github size={16} style={{ marginRight: 8 }} />
  122	            GitHub
  123	          </DropdownMenuItem>
  124	          <DropdownMenuItem>
  125	            <LifeBuoy size={16} style={{ marginRight: 8 }} />
  126	            Support
  127	          </DropdownMenuItem>
  128	        </DropdownMenuGroup>
  129	        <DropdownMenuSeparator />
  130	        <DropdownMenuItem>
  131	          <LogOut size={16} style={{ marginRight: 8 }} />
  132	          Log out
  133	          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
  134	        </DropdownMenuItem>
  135	      </DropdownMenuContent>
  136	    </DropdownMenu>
  137	  );
  138	}
  139	
  140	export default function DropdownMenuShowcase() {
  141	  return (
  142	    <>
  143	      <h1>DropdownMenu</h1>
  144	      <p>
  145	        A menu anchored to a button, with items, groups, shortcuts, checkbox and
  146	        radio items, and nested submenus.
  147	      </p>
  148	
  149	      <h2>Examples</h2>
  150	      <div
  151	        style={{
  152	          display: "flex",
  153	          flexWrap: "wrap",
  154	          gap: "1rem",
  155	          alignItems: "flex-start",
  156	        }}
  157	      >
  158	        <Example
  159	          title="Account menu"
  160	          description="Groups, shortcuts, and a submenu holding checkbox and radio items."
  161	          width={420}
  162	        >
  163	          <div style={{ minHeight: 440 }}>
  164	            <AccountMenu />
  165	          </div>
  166	        </Example>
  167	      </div>
  168	    </>
  169	  );
  170	}
  171	
