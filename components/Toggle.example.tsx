
import { Example } from "@floot/examples";
import { Toggle } from "./Toggle";
import { Star, Bell, Heart } from "lucide-react";

const row = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  alignItems: "flex-start",
   10	} as const;
   11	
   12	export default function ToggleShowcase() {
   13	  return (
   14	    <>
   15	      <h1>Toggle</h1>
   16	      <p>A two-state button that stays pressed while it is on.</p>
   17	
   18	      <h2>Icon only</h2>
   19	      <div style={row}>
   20	        <Example title="Small icon">
   21	          <Toggle size="sm">
   22	            <Star size={14} />
   23	          </Toggle>
   24	        </Example>
   25	        <Example title="Medium icon">
   26	          <Toggle>
   27	            <Bell size={16} />
   28	          </Toggle>
   29	        </Example>
   30	        <Example title="Large icon">
   31	          <Toggle size="lg">
   32	            <Heart size={20} />
   33	          </Toggle>
   34	        </Example>
   35	      </div>
   36	
   37	      <h2>Text and icon</h2>
   38	      <div style={row}>
   39	        <Example title="Outline medium">
   40	          <Toggle variant="outline">
   41	            <Bell size={16} /> <span>Notifications</span>
   42	          </Toggle>
   43	        </Example>
   44	        <Example title="Outline large">
   45	          <Toggle size="lg" variant="outline">
   46	            <Heart size={20} /> <span>Favorite</span>
   47	          </Toggle>
   48	        </Example>
   49	      </div>
   50	
   51	      <h2>Text only</h2>
   52	      <div style={row}>
   53	        <Example title="Small text">
   54	          <Toggle size="sm">
   55	            <span>Pin</span>
   56	          </Toggle>
   57	        </Example>
   58	        <Example title="Medium text">
   59	          <Toggle>
   60	            <span>Default</span>
   61	          </Toggle>
   62	        </Example>
   63	        <Example title="Large text">
   64	          <Toggle size="lg">
   65	            <span>Large</span>
   66	          </Toggle>
   67	        </Example>
   68	      </div>
   69	    </>
   70	  );
   71	}
   72	
