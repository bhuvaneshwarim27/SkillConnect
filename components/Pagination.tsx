
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import styles from "./Pagination.module.css"
import buttonStyles from "./Button.module.css"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
   10	    className={`${styles.root} ${className ?? ""}`}
   11	    {...props}
   12	  />
   13	)
   14	Pagination.displayName = "Pagination"
   15	
   16	const PaginationContent = React.forwardRef<
   17	  HTMLUListElement,
   18	  React.ComponentProps<"ul">
   19	>(({ className, ...props }, ref) => (
   20	  <ul
   21	    ref={ref}
   22	    className={`${styles.content} ${className ?? ""}`}
   23	    {...props}
   24	  />
   25	))
   26	PaginationContent.displayName = "PaginationContent"
   27	
   28	const PaginationItem = React.forwardRef<
   29	  HTMLLIElement,
   30	  React.ComponentProps<"li">
   31	>(({ className, ...props }, ref) => (
   32	  <li ref={ref} className={`${styles.item} ${className ?? ""}`} {...props} />
   33	))
   34	PaginationItem.displayName = "PaginationItem"
   35	
   36	type PaginationLinkProps = {
   37	  isActive?: boolean
   38	} &
   39	  React.ComponentProps<"a">
   40	
   41	const PaginationLink = ({
   42	  className,
   43	  isActive,
   44	  ...props
   45	}: PaginationLinkProps) => (
   46	  <a
   47	    aria-current={isActive ? "page" : undefined}
   48	    className={`${buttonStyles.button} ${styles.link} ${isActive ? styles.active : ""} ${className ?? ""}`}
   49	    {...props}
   50	  />
   51	)
   52	PaginationLink.displayName = "PaginationLink"
   53	
   54	const PaginationPrevious = ({
   55	  className,
   56	  ...props
   57	}: React.ComponentProps<typeof PaginationLink>) => (
   58	  <PaginationLink
   59	    aria-label="Go to previous page"
   60	    className={`${styles.link} ${className ?? ""}`}
   61	    {...props}
   62	  >
   63	    <ChevronLeft className={styles.icon} />
   64	    <span>Previous</span>
   65	  </PaginationLink>
   66	)
   67	PaginationPrevious.displayName = "PaginationPrevious"
   68	
   69	const PaginationNext = ({
   70	  className,
   71	  ...props
   72	}: React.ComponentProps<typeof PaginationLink>) => (
   73	  <PaginationLink
   74	    aria-label="Go to next page"
   75	    className={`${styles.link} ${className ?? ""}`}
   76	    {...props}
   77	  >
   78	    <span>Next</span>
   79	    <ChevronRight className={styles.icon} />
   80	  </PaginationLink>
   81	)
   82	PaginationNext.displayName = "PaginationNext"
   83	
   84	const PaginationEllipsis = ({
   85	  className,
   86	  ...props
   87	}: React.ComponentProps<"span">) => (
   88	  <span
   89	    aria-hidden
   90	    className={`${styles.ellipsis} ${className ?? ""}`}
   91	    {...props}
   92	  >
   93	    <MoreHorizontal className={styles.icon} />
   94	  </span>
   95	)
   96	PaginationEllipsis.displayName = "PaginationEllipsis"
   97	
   98	export {
   99	  Pagination,
  100	  PaginationContent,
  101	  PaginationEllipsis,
  102	  PaginationItem,
  103	  PaginationLink,
  104	  PaginationNext,
  105	  PaginationPrevious,
  106	}
  107	
