
import styles from "./Skeleton.module.css"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`${styles.skeleton} ${className ?? ""}`}
   10	      {...props}
   11	    />
   12	  )
   13	}
   14	 
   15	export { Skeleton }
