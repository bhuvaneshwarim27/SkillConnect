
import { Example } from "@floot/examples";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";

export default function AvatarShowcase() {
  return (
    <>
      <h1>Avatar</h1>
      <p>
        A small circular image representing a user, with initials shown when the
   10	        image is unavailable.
   11	      </p>
   12	
   13	      <h2>States</h2>
   14	      <div
   15	        style={{
   16	          display: "flex",
   17	          flexWrap: "wrap",
   18	          gap: "1rem",
   19	          alignItems: "flex-start",
   20	        }}
   21	      >
   22	        <Example title="With image">
   23	          <Avatar>
   24	            <AvatarImage src="https://github.com/yyjhao.png" alt="User avatar" />
   25	            <AvatarFallback>CN</AvatarFallback>
   26	          </Avatar>
   27	        </Example>
   28	
   29	        <Example title="Fallback only">
   30	          <Avatar>
   31	            <AvatarFallback>JD</AvatarFallback>
   32	          </Avatar>
   33	        </Example>
   34	
   35	        <Example title="Broken image" description="Falls back to initials.">
   36	          <Avatar>
   37	            <AvatarImage src="https://invalid.url/image.jpg" alt="Broken image" />
   38	            <AvatarFallback>EM</AvatarFallback>
   39	          </Avatar>
   40	        </Example>
   41	      </div>
   42	    </>
   43	  );
   44	}
   45	
