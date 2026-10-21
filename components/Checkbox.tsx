
import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Checkbox.module.css';
import { Check } from 'lucide-react';
export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={styles.checkboxWrapper}>
   10	        <input
   11	          {...props}
   12	          type="checkbox"
   13	          ref={ref}
   14	          className={`${styles.checkbox} ${className || ''}`}
   15	        />
   16	        <Check className={styles.checkmark} aria-hidden="true" />
   17	      </div>
   18	    );
   19	  }
   20	);
   21	
   22	Checkbox.displayName = 'Checkbox';
   23	
