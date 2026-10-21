
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeModeProvider } from "../helpers/themeMode";
import { TooltipProvider } from "./Tooltip";
import { Toaster } from "./Toaster";
import { ScrollToHashElement } from "./ScrollToHashElement";

const queryClient = new QueryClient({
  defaultOptions: {
   10	    queries: {
   11	      staleTime: 60 * 1000, // 1 minute “fresh” window
   12	    },
   13	  },
   14	});
   15	
   16	export const GlobalContextProviders = ({
   17	  children,
   18	}: {
   19	  children: ReactNode;
   20	}) => {
   21	  return (
   22	    <QueryClientProvider client={queryClient}>
   23	      <ThemeModeProvider>
   24	        <ScrollToHashElement />
   25	        <TooltipProvider>
   26	          {children}
   27	          {/* Renders every toast(...) from helpers/toast. Mounted once, here. */}
   28	          <Toaster />
   29	        </TooltipProvider>
   30	      </ThemeModeProvider>
   31	    </QueryClientProvider>
   32	  );
   33	};
   34	
