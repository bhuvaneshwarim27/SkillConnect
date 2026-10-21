
import { CalendarDays, MessageCircle } from "lucide-react";
import { Example } from "@floot/examples";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

export default function HoverCardShowcase() {
  return (
    <>
      <h1>HoverCard</h1>
   10	      <p>
   11	        A card anchored to a link or control that previews more detail about it
   12	        on hover.
   13	      </p>
   14	
   15	      <h2>Examples</h2>
   16	      <div
   17	        style={{
   18	          display: "flex",
   19	          flexWrap: "wrap",
   20	          gap: "1rem",
   21	          alignItems: "flex-start",
   22	        }}
   23	      >
   24	        <Example title="User profile" width={420}>
   25	          <div style={{ minHeight: 135 }}>
   26	            <HoverCard open>
   27	              <HoverCardTrigger asChild>
   28	                <a
   29	                  href="#"
   30	                  style={{
   31	                    textDecoration: "none",
   32	                    color: "var(--color-primary)",
   33	                  }}
   34	                >
   35	                  @sarah_designer
   36	                </a>
   37	              </HoverCardTrigger>
   38	              <HoverCardContent side="bottom" align="start">
   39	                <div style={{ display: "flex", gap: "var(--spacing-sm)" }}>
   40	                  <Avatar>
   41	                    <AvatarImage src="https://picsum.photos/id/64/100" />
   42	                    <AvatarFallback>SD</AvatarFallback>
   43	                  </Avatar>
   44	                  <div>
   45	                    <div
   46	                      style={{
   47	                        fontSize: "var(--font-size-md)",
   48	                        fontWeight: "var(--font-weight-bold)",
   49	                        marginBottom: "var(--spacing-xxs)",
   50	                      }}
   51	                    >
   52	                      Sarah Designer
   53	                    </div>
   54	                    <div
   55	                      style={{
   56	                        fontSize: "var(--font-size-sm)",
   57	                        color: "var(--color-text-secondary)",
   58	                        marginBottom: "var(--spacing-xs)",
   59	                      }}
   60	                    >
   61	                      UI/UX Designer &amp; Creative Director
   62	                    </div>
   63	                    <div
   64	                      style={{
   65	                        display: "flex",
   66	                        gap: "var(--spacing-sm)",
   67	                        alignItems: "center",
   68	                      }}
   69	                    >
   70	                      <div
   71	                        style={{
   72	                          display: "flex",
   73	                          alignItems: "center",
   74	                          gap: "var(--spacing-xxs)",
   75	                        }}
   76	                      >
   77	                        <CalendarDays size={14} />
   78	                        <span style={{ fontSize: "var(--font-size-xs)" }}>
   79	                          Joined Dec 2023
   80	                        </span>
   81	                      </div>
   82	                      <div
   83	                        style={{
   84	                          display: "flex",
   85	                          alignItems: "center",
   86	                          gap: "var(--spacing-xxs)",
   87	                        }}
   88	                      >
   89	                        <MessageCircle size={14} />
   90	                        <span style={{ fontSize: "var(--font-size-xs)" }}>
   91	                          1.2K posts
   92	                        </span>
   93	                      </div>
   94	                    </div>
   95	                  </div>
   96	                </div>
   97	              </HoverCardContent>
   98	            </HoverCard>
   99	          </div>
  100	        </Example>
  101	      </div>
  102	    </>
  103	  );
  104	}
  105	
