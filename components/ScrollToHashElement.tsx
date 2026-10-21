
import { useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToHashElement = () => {
  let location = useLocation();

  let hashElement = useMemo(() => {
    let hash = location.hash;
    const removeHashCharacter = (str: string) => {
   10	      const result = str.slice(1);
   11	      return result;
   12	    };
   13	
   14	    if (hash) {
   15	      let element = document.getElementById(removeHashCharacter(hash));
   16	      return element;
   17	    } else {
   18	      return null;
   19	    }
   20	  }, [location]);
   21	
   22	  useEffect(() => {
   23	    if (hashElement) {
   24	      hashElement.scrollIntoView({
   25	        behavior: "smooth",
   26	        // block: "end",
   27	        inline: "nearest",
   28	      });
   29	    }
   30	  }, [hashElement]);
   31	
   32	  return null;
   33	};
   34	
