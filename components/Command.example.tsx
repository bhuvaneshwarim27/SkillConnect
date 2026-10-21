
import { useState } from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";
   10	import { Example } from "@floot/examples";
   11	import {
   12	  Command,
   13	  CommandDialog,
   14	  CommandEmpty,
   15	  CommandGroup,
   16	  CommandInput,
   17	  CommandItem,
   18	  CommandList,
   19	  CommandSeparator,
   20	  CommandShortcut,
   21	} from "./Command";
   22	import { Button } from "./Button";
   23	import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
   24	
   25	function CommandMenuDialog() {
   26	  const [open, setOpen] = useState(false);
   27	
   28	  return (
   29	    <>
   30	      <Button onClick={() => setOpen(true)}>Open Command Menu</Button>
   31	      <CommandDialog open={open} onOpenChange={setOpen}>
   32	        <CommandInput placeholder="Type a command or search..." />
   33	        <CommandList>
   34	          <CommandEmpty>No results found.</CommandEmpty>
   35	          <CommandGroup heading="Suggestions">
   36	            <CommandItem>
   37	              <Calendar />
   38	              <span>Calendar</span>
   39	              <CommandShortcut>⌘C</CommandShortcut>
   40	            </CommandItem>
   41	            <CommandItem>
   42	              <Smile />
   43	              <span>Search Emoji</span>
   44	              <CommandShortcut>⌘E</CommandShortcut>
   45	            </CommandItem>
   46	            <CommandItem>
   47	              <Calculator />
   48	              <span>Calculator</span>
   49	              <CommandShortcut>⌘K</CommandShortcut>
   50	            </CommandItem>
   51	          </CommandGroup>
   52	          <CommandSeparator />
   53	          <CommandGroup heading="Settings">
   54	            <CommandItem>
   55	              <User />
   56	              <span>Profile</span>
   57	              <CommandShortcut>⌘P</CommandShortcut>
   58	            </CommandItem>
   59	            <CommandItem>
   60	              <CreditCard />
   61	              <span>Billing</span>
   62	              <CommandShortcut>⌘B</CommandShortcut>
   63	            </CommandItem>
   64	            <CommandItem>
   65	              <Settings />
   66	              <span>Settings</span>
   67	              <CommandShortcut>⌘S</CommandShortcut>
   68	            </CommandItem>
   69	          </CommandGroup>
   70	        </CommandList>
   71	      </CommandDialog>
   72	    </>
   73	  );
   74	}
   75	
   76	const frameworks = ["React", "Vue", "Angular", "Svelte"];
   77	
   78	function CommandCombobox() {
   79	  const [open, setOpen] = useState(true);
   80	  const [selected, setSelected] = useState("");
   81	
   82	  return (
   83	    <Popover open={open} onOpenChange={setOpen} modal={false}>
   84	      <PopoverTrigger asChild>
   85	        <Button variant="outline">
   86	          {selected ? selected : "Select a framework"}
   87	        </Button>
   88	      </PopoverTrigger>
   89	      <PopoverContent removeBackgroundAndPadding side="bottom" align="start">
   90	        <Command>
   91	          <CommandInput placeholder="Search framework..." />
   92	          <CommandList>
   93	            <CommandEmpty>No frameworks found.</CommandEmpty>
   94	            <CommandGroup>
   95	              {frameworks.map((framework) => (
   96	                <CommandItem
   97	                  key={framework}
   98	                  onSelect={() => {
   99	                    setSelected(framework);
  100	                    setOpen(false);
  101	                  }}
  102	                >
  103	                  {framework}
  104	                </CommandItem>
  105	              ))}
  106	            </CommandGroup>
  107	          </CommandList>
  108	        </Command>
  109	      </PopoverContent>
  110	    </Popover>
  111	  );
  112	}
  113	
  114	export default function CommandShowcase() {
  115	  return (
  116	    <>
  117	      <h1>Command</h1>
  118	      <p>
  119	        A filterable list of commands or options, driven by a search input. It
  120	        can sit in a dialog as a command palette or inside a popover as a
  121	        combobox.
  122	      </p>
  123	
  124	      <h2>Examples</h2>
  125	      <div
  126	        style={{
  127	          display: "flex",
  128	          flexDirection: "column",
  129	          gap: "1rem",
  130	          alignItems: "flex-start",
  131	        }}
  132	      >
  133	        <Example title="Command palette" width={520}>
  134	          <CommandMenuDialog />
  135	        </Example>
  136	
  137	        <Example title="Combobox" width={520}>
  138	          <div style={{ minHeight: 270 }}>
  139	            <CommandCombobox />
  140	          </div>
  141	        </Example>
  142	      </div>
  143	    </>
  144	  );
  145	}
  146	
