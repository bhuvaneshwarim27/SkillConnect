
import { useState } from "react";
import { Example } from "@floot/examples";
import { Calendar } from "./Calendar";
import { Button } from "./Button";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";

const disabledDays = [
  new Date(2024, 0, 10),
  { from: new Date(2024, 0, 15), to: new Date(2024, 0, 18) },
   10	];
   11	
   12	function SingleDateCalendar() {
   13	  const [date, setDate] = useState<Date>();
   14	  return <Calendar mode="single" selected={date} onSelect={setDate} />;
   15	}
   16	
   17	function RangeCalendar() {
   18	  const [dateRange, setDateRange] = useState<{
   19	    from: Date | undefined;
   20	    to?: Date;
   21	  }>();
   22	  return <Calendar mode="range" selected={dateRange} onSelect={setDateRange} />;
   23	}
   24	
   25	function DatePicker() {
   26	  const [date, setDate] = useState<Date | undefined>(undefined);
   27	  return (
   28	    <Popover open modal={false}>
   29	      <PopoverTrigger asChild>
   30	        <Button variant="outline" style={{ minWidth: "8rem" }}>
   31	          {date ? date.toLocaleDateString() : "Select Date"}
   32	        </Button>
   33	      </PopoverTrigger>
   34	      <PopoverContent removeBackgroundAndPadding>
   35	        <Calendar
   36	          mode="single"
   37	          selected={date}
   38	          onSelect={(d: Date | undefined) => {
   39	            setDate(d);
   40	          }}
   41	        />
   42	      </PopoverContent>
   43	    </Popover>
   44	  );
   45	}
   46	
   47	export default function CalendarShowcase() {
   48	  return (
   49	    <>
   50	      <h1>Calendar</h1>
   51	      <p>
   52	        A date grid built on react-day-picker. It selects a single day or a
   53	        range, can block out dates, and can show more than one month at a time.
   54	      </p>
   55	
   56	      <h2>Modes</h2>
   57	      <div
   58	        style={{
   59	          display: "flex",
   60	          flexWrap: "wrap",
   61	          gap: "1rem",
   62	          alignItems: "flex-start",
   63	        }}
   64	      >
   65	        <Example
   66	          title="Single"
   67	          description="One selected day at a time."
   68	          width={340}
   69	        >
   70	          <SingleDateCalendar />
   71	        </Example>
   72	
   73	        <Example
   74	          title="Range"
   75	          description="A start and end day, with the days between them highlighted."
   76	          width={340}
   77	        >
   78	          <RangeCalendar />
   79	        </Example>
   80	
   81	        <Example
   82	          title="Disabled dates"
   83	          description="Individual days and date ranges can be blocked out; a footer explains why."
   84	          width={340}
   85	        >
   86	          <Calendar
   87	            mode="single"
   88	            disabled={disabledDays}
   89	            defaultMonth={new Date(2024, 0)}
   90	            footer="Some dates are disabled"
   91	          />
   92	        </Example>
   93	      </div>
   94	
   95	      <h2>Multiple months</h2>
   96	      <Example
   97	        title="Two months"
   98	        description="Days outside each month are hidden."
   99	        width={760}
  100	      >
  101	        <Calendar mode="single" numberOfMonths={2} showOutsideDays={false} />
  102	      </Example>
  103	
  104	      <h2>In a popover</h2>
  105	      <Example
  106	        title="Date picker"
  107	        description="A button trigger that opens the calendar in a popover."
  108	        width={340}
  109	      >
  110	        <div style={{ minHeight: 400 }}>
  111	          <DatePicker />
  112	        </div>
  113	      </Example>
  114	    </>
  115	  );
  116	}
  117	
