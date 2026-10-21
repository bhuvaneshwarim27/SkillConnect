
"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import styles from "./Calendar.module.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  mode: "single" | "range";
};
   10	
   11	function Calendar({
   12	  className,
   13	  classNames,
   14	  showOutsideDays = true,
   15	  ...props
   16	}: CalendarProps) {
   17	  return (
   18	    <DayPicker
   19	      showOutsideDays={showOutsideDays}
   20	      className={`${styles.calendar} ${className ?? ""}`}
   21	      classNames={{
   22	        chevron: styles.chevron,
   23	        weekdays: styles.weekdays,
   24	        weekday: styles.weekday,
   25	        today: styles.today,
   26	        selected: styles.selected,
   27	        range_middle: styles.range_middle,
   28	        range_end: styles.range_end,
   29	        outside: styles.outside,
   30	        nav: styles.nav,
   31	        months: styles.months,
   32	        month: styles.month,
   33	        month_grid: styles.month_grid,
   34	        month_caption: styles.month_caption,
   35	        hidden: styles.hidden,
   36	        footer: styles.footer,
   37	        disabled: styles.disabled,
   38	        day: styles.day, // the cell around day button
   39	        day_button: styles.day_button, // the day button
   40	        cell: styles.cell,
   41	        caption_label: styles.caption_label,
   42	        button_previous: styles.button_previous,
   43	        button_next: styles.button_next,
   44	        ...classNames,
   45	      }}
   46	      {...props}
   47	    />
   48	  );
   49	}
   50	Calendar.displayName = "Calendar";
   51	
   52	export { Calendar };
   53	
