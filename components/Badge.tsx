
import styles from "./Badge.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "primary"
    | "destructive"
    | "outline"
    | "secondary"
    | "success"
   10	    | "warning";
   11	}
   12	
   13	export const Badge = ({
   14	  variant = "primary",
   15	  className,
   16	  children,
   17	  ...props
   18	}: Props) => {
   19	  return (
   20	    <div
   21	      className={`${styles.badge} ${styles[variant]} ${className || ""}`}
   22	      {...props}
   23	    >
   24	      {children}
   25	    </div>
   26	  );
   27	};
   28	
