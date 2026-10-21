
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { Dispatch, SetStateAction, useRef, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import { z, ZodError, ZodIssue, ZodIssueCode } from "zod";
import styles from "./Form.module.css";

/**
 * Core function for setting up form with types.
   10	 * Note: do not pass a generic type argument, instead have it inferred from the schema value
   11	 */
   12	export function useForm<T extends z.ZodType<any, any>>({
   13	  defaultValues = {},
   14	  schema,
   15	}: {
   16	  defaultValues?: Partial<z.infer<T>>;
   17	  schema: T;
   18	}): {
   19	  values: z.infer<T>;
   20	  defaultValues: Partial<z.infer<T>>;
   21	  setValues: Dispatch<SetStateAction<z.infer<T>>>;
   22	  errors: FormErrors;
   23	  validateField: (path: string, options?: { shallow?: boolean }) => void;
   24	  validateForm: () => boolean;
   25	  setFieldError: (path: string, errorMessage: string) => void;
   26	  handleSubmit: (
   27	    onSubmit: (data: z.infer<T>) => void,
   28	  ) => (e: React.FormEvent) => void;
   29	} {
   30	  const [values, setValues] = React.useState<Record<string, any>>(
   31	    defaultValues as Record<string, any>,
   32	  );
   33	  const [errors, setErrors] = React.useState<FormErrors>({});
   34	
   35	  // Manually set an error for a specific field
   36	  const setFieldError = React.useCallback(
   37	    (path: string, errorMessage: string) => {
   38	      setErrors((prev) => {
   39	        return setValueByPath(prev, path, errorMessage);
   40	      });
   41	    },
   42	    [],
   43	  );
   44	
   45	  // Check if an issue is an "extra property" error from strict validation
   46	  const isExtraPropertyError = (issue: ZodIssue): boolean => {
   47	    return issue.code === ZodIssueCode.unrecognized_keys;
   48	  };
   49	
   50	  // full form validation
   51	  const validateForm = React.useCallback((): boolean => {
   52	    if (!schema) return true;
   53	    try {
   54	      // Make the schema strict to detect issues of not including all fields in the schema
   55	      makeStrict(schema).parse(values);
   56	      setErrors({});
   57	      return true;
   58	    } catch (err) {
   59	      if (err instanceof ZodError) {
   60	        // Separate extra property errors from regular validation errors
   61	        const extraPropertyErrors = err.errors.filter(isExtraPropertyError);
   62	        const validationErrors = err.errors.filter(
   63	          (issue) => !isExtraPropertyError(issue),
   64	        );
   65	
   66	        // Extra property errors should be thrown
   67	        if (extraPropertyErrors.length > 0) {
   68	          throw new Error(
   69	            "Extra properties detected in form values:" +
   70	              extraPropertyErrors.map((e) => e.message).join(", ") +
   71	              ". Either update the schema or remove these values",
   72	          );
   73	        }
   74	
   75	        // Only add regular validation errors to the form state
   76	        const tree: any = {};
   77	        validationErrors.forEach((issue: ZodIssue) => {
   78	          const path = issue.path.join(".");
   79	          // Ensure error message is a string
   80	          const errorMessage =
   81	            typeof issue.message === "string"
   82	              ? issue.message
   83	              : String(issue.message);
   84	          // build nested tree
   85	          Object.assign(tree, {}); // ensure tree is an object
   86	          const tmp = setValueByPath(tree, path, errorMessage);
   87	          Object.assign(tree, tmp);
   88	        });
   89	        setErrors(tree);
   90	
   91	        // If there are only extra property errors but no validation errors,
   92	        // throw the error instead of showing it in the form
   93	        if (validationErrors.length === 0 && extraPropertyErrors.length > 0) {
   94	          throw new Error(
   95	            `Form contains extra properties: ${extraPropertyErrors
   96	              .map((e) => e.message)
   97	              .join(", ")}`,
   98	          );
   99	        }
  100	      }
  101	      console.error("Form validation failed", err);
  102	      return false;
  103	    }
  104	  }, [schema, values]);
  105	
  106	  // single-field (path) validation
  107	  // You don't usually need to call this because validation happens automatically.
  108	  const validateField = React.useCallback(
  109	    (path: string, options?: { shallow?: boolean }) => {
  110	      if (!schema) return;
  111	      const result = schema.safeParse(values);
  112	      setErrors((prev: FormErrors) => {
  113	        let next = { ...prev };
  114	
  115	        // For shallow validation, only clear the exact path error
  116	        // For regular validation, clear all errors at/under this path
  117	        if (options?.shallow) {
  118	          // Only delete the specific error at this path, preserving children
  119	          if (getValueByPath(next, path) !== undefined) {
  120	            next = deleteValueByPath(next, path, { shallow: true });
  121	          }
  122	        } else {
  123	          // Clear all errors at/under this path
  124	          next = deleteValueByPath(next, path);
  125	        }
  126	
  127	        if (!result.success) {
  128	          // put back just the validation issues for this segment
  129	          result.error.errors.forEach((issue) => {
  130	            const ip = issue.path.join(".");
  131	
  132	            // For shallow validation, only include errors for the exact path
  133	            // For regular validation, include errors for the path and its children
  134	            const shouldIncludeError = options?.shallow
  135	              ? ip === path
  136	              : ip === path || ip.startsWith(path + ".");
  137	
  138	            if (shouldIncludeError) {
  139	              // Ensure error message is a string
  140	              const errorMessage =
  141	                typeof issue.message === "string"
  142	                  ? issue.message
  143	                  : String(issue.message);
  144	              next = setValueByPath(next, ip, errorMessage);
  145	            }
  146	          });
  147	        }
  148	        return next;
  149	      });
  150	    },
  151	    [schema, values],
  152	  );
  153	
  154	  // submit handler
  155	  type Data = z.infer<T>;
  156	  const handleSubmit = React.useCallback(
  157	    (onSubmit: (data: Data) => void) => {
  158	      return (e: React.FormEvent) => {
  159	        e.preventDefault();
  160	        if (validateForm()) {
  161	          onSubmit(values as Data);
  162	        }
  163	      };
  164	    },
  165	    [validateForm, values],
  166	  );
  167	
  168	  const oldValueRef = useRef(values);
  169	  useEffect(() => {
  170	    const diffKeys: string[] = [];
  171	    for (const key of Object.keys(values)) {
  172	      if (
  173	        values[key] !== oldValueRef.current[key] &&
  174	        Array.isArray(values[key]) &&
  175	        Array.isArray(oldValueRef.current[key]) &&
  176	        values[key].length !== oldValueRef.current[key].length
  177	      ) {
  178	        diffKeys.push(key);
  179	      }
  180	    }
  181	    oldValueRef.current = values;
  182	    for (const k of diffKeys) {
  183	      // Use shallow validation for array length changes
  184	      validateField(k, { shallow: true });
  185	    }
  186	  }, [values, validateField]);
  187	
  188	  return {
  189	    values,
  190	    errors,
  191	    setValues,
  192	    validateField,
  193	    validateForm,
  194	    setFieldError,
  195	    handleSubmit,
  196	    defaultValues,
  197	  };
  198	}
  199	
  200	/**
  201	 * Form contexts provider. Pass the result of useForm as ...props to this.
  202	 */
  203	export function Form<T>(
  204	  props: {
  205	    children: React.ReactNode;
  206	  } & FormContextValue<T>,
  207	) {
  208	  const {
  209	    children,
  210	    values,
  211	    errors,
  212	    setValues,
  213	    validateField,
  214	    validateForm,
  215	    setFieldError,
  216	  } = props;
  217	  return (
  218	    <FormContext.Provider
  219	      value={{
  220	        values,
  221	        errors,
  222	        setValues,
  223	        validateField,
  224	        validateForm,
  225	        setFieldError,
  226	      }}
  227	    >
  228	      {children}
  229	    </FormContext.Provider>
  230	  );
  231	}
  232	
  233	/**
  234	 * A wrapper around each form field. The name for nested field should be dot separated.
  235	 */
  236	export const FormItem = React.forwardRef<
  237	  HTMLDivElement,
  238	  React.HTMLAttributes<HTMLDivElement> & { name: string }
  239	>(({ name, className, ...props }, ref) => {
  240	  const id = React.useId();
  241	  return (
  242	    <FormItemContext.Provider value={{ id, name }}>
  243	      <div
  244	        ref={ref}
  245	        className={`${styles.formItem} ${className || ""}`}
  246	        {...props}
  247	      />
  248	    </FormItemContext.Provider>
  249	  );
  250	});
  251	FormItem.displayName = "FormItem";
  252	
  253	/**
  254	 * A label for a form field. Should be inside FormItem.
  255	 */
  256	export const FormLabel = React.forwardRef<
  257	  HTMLLabelElement,
  258	  React.LabelHTMLAttributes<HTMLLabelElement>
  259	>(({ className, ...props }, ref) => {
  260	  const { formItemId, error } = useFormField();
  261	  return (
  262	    <label
  263	      ref={ref}
  264	      className={`${styles.formLabel} ${error ? styles.error : ""} ${className || ""}`}
  265	      htmlFor={formItemId}
  266	      {...props}
  267	    />
  268	  );
  269	});
  270	FormLabel.displayName = "FormLabel";
  271	
  272	/**
  273	 * Wraps around a form control to provide better accessibility. Should be inside FormItem.
  274	 */
  275	export const FormControl = React.forwardRef<
  276	  any,
  277	  React.ComponentPropsWithoutRef<typeof Slot>
  278	>(({ className, ...props }, ref) => {
  279	  const { formItemId, error, formMessageId, onBlur } = useFormField();
  280	  return (
  281	    <Slot
  282	      ref={ref}
  283	      id={formItemId}
  284	      className={`${styles.formControl} ${error ? styles.error : ""} ${className || ""}`}
  285	      aria-invalid={!!error}
  286	      aria-describedby={error ? formMessageId : undefined}
  287	      onBlur={onBlur}
  288	      {...props}
  289	    />
  290	  );
  291	});
  292	FormControl.displayName = "FormControl";
  293	
  294	/**
  295	 * Provides form description with accessibility and styling. Should be inside FormItem.
  296	 */
  297	export const FormDescription = React.forwardRef<
  298	  HTMLParagraphElement,
  299	  React.HTMLAttributes<HTMLParagraphElement>
  300	>(({ className, ...props }, ref) => {
  301	  const { formDescriptionId } = useFormField();
  302	  return (
  303	    <p
  304	      ref={ref}
  305	      id={formDescriptionId}
  306	      className={`${styles.formDescription} ${className || ""}`}
  307	      {...props}
  308	    />
  309	  );
  310	});
  311	FormDescription.displayName = "FormDescription";
  312	
  313	/**
  314	 * Provides form error message with accessibility and styling. Should be inside FormItem.
  315	 */
  316	export const FormMessage = React.forwardRef<
  317	  HTMLParagraphElement,
  318	  React.HTMLAttributes<HTMLParagraphElement>
  319	>(({ className, children, ...props }, ref) => {
  320	  const { formMessageId, error } = useFormField();
  321	  const body = error ? error.message : children;
  322	  if (!body) return null;
  323	  return (
  324	    <p
  325	      ref={ref}
  326	      id={formMessageId}
  327	      className={`${styles.formMessage} ${className || ""}`}
  328	      {...props}
  329	    >
  330	      {body}
  331	    </p>
  332	  );
  333	});
  334	FormMessage.displayName = "FormMessage";
  335	
  336	// Internal contexts that should not be exposed
  337	
  338	// a nested tree to handle nested forms
  339	type FormErrors = {
  340	  [key: string]: string | FormErrors;
  341	};
  342	
  343	type FormContextValue<T> = {
  344	  values: T;
  345	  errors: FormErrors;
  346	  setValues: React.Dispatch<React.SetStateAction<T>>;
  347	  validateField: (path: string, options?: { shallow?: boolean }) => void;
  348	  validateForm: () => boolean;
  349	  setFieldError: (path: string, errorMessage: string) => void;
  350	};
  351	
  352	const FormContext = React.createContext<FormContextValue<any> | undefined>(
  353	  undefined,
  354	);
  355	
  356	function useFormContext(): FormContextValue<any> {
  357	  const ctx = React.useContext(FormContext);
  358	  if (!ctx) throw new Error("useFormContext must be inside <Form>");
  359	  return ctx;
  360	}
  361	
  362	type FieldCtx = { id: string; name: string };
  363	const FormItemContext = React.createContext<FieldCtx | null>(null);
  364	
  365	function useFormField() {
  366	  const form = useFormContext();
  367	  const ctx = React.useContext(FormItemContext);
  368	  if (!ctx)
  369	    throw new Error(
  370	      "<FormLabel> and <FormControl> must live inside <FormItem>",
  371	    );
  372	
  373	  const { id, name } = ctx;
  374	  const errorValue = getValueByPath(form.errors, name);
  375	  // Ensure error message is a string
  376	  const errorMsg = typeof errorValue === "string" ? errorValue : undefined;
  377	  return {
  378	    id,
  379	    name,
  380	    error: errorMsg ? { message: errorMsg } : undefined,
  381	    formItemId: `${id}-form-item`,
  382	    formDescriptionId: `${id}-form-item-description`,
  383	    formMessageId: `${id}-form-item-message`,
  384	    onBlur: () => form.validateField(name),
  385	    validateShallow: () => form.validateField(name, { shallow: true }),
  386	  };
  387	}
  388	
  389	// Internal helpers. Should not be used externally since these aren't typed.
  390	
  391	function getValueByPath(obj: any, path: string): any {
  392	  const keys = path.split(".");
  393	  let current = obj;
  394	  for (const key of keys) {
  395	    if (current == null) return undefined;
  396	    if (/^\d+$/.test(key) && Array.isArray(current)) {
  397	      current = current[+key];
  398	    } else {
  399	      current = current[key];
  400	    }
  401	  }
  402	  return current;
  403	}
  404	
  405	function setValueByPath(obj: any, path: string, value: any): any {
  406	  const keys = path.split(".");
  407	  const lastKey = keys.pop()!;
  408	  const newObj = { ...obj };
  409	  let pointer = newObj;
  410	
  411	  for (let i = 0; i < keys.length; i++) {
  412	    const key = keys[i];
  413	    const nextKey = keys[i + 1];
  414	    if (pointer[key] == null) {
  415	      pointer[key] = /^\d+$/.test(nextKey) ? [] : {};
  416	    } else if (Array.isArray(pointer[key])) {
  417	      pointer[key] = [...pointer[key]];
  418	    } else if (typeof pointer[key] === "object") {
  419	      pointer[key] = { ...pointer[key] };
  420	    }
  421	    pointer = pointer[key];
  422	  }
  423	
  424	  // set final
  425	  if (/^\d+$/.test(lastKey) && Array.isArray(pointer)) {
  426	    pointer[+lastKey] = value;
  427	  } else {
  428	    pointer[lastKey] = value;
  429	  }
  430	
  431	  return newObj;
  432	}
  433	
  434	// DELETE helper — remove a path (and clean up empty containers)
  435	function deleteValueByPath(
  436	  obj: any,
  437	  path: string,
  438	  options?: { shallow?: boolean },
  439	): any {
  440	  const keys = path.split(".");
  441	  const last = keys.pop()!;
  442	  let pointer = obj;
  443	  const parents: Array<{ parent: any; key: string }> = [];
  444	
  445	  for (const key of keys) {
  446	    if (pointer[key] == null) {
  447	      return obj; // nothing to remove
  448	    }
  449	    parents.push({ parent: pointer, key });
  450	    pointer = pointer[key];
  451	  }
  452	
  453	  // remove the leaf
  454	  if (pointer && typeof pointer === "object" && last in pointer) {
  455	    if (options?.shallow) {
  456	      // For shallow deletion, just remove the specific error message
  457	      // but preserve any nested errors
  458	      if (typeof pointer[last] === "string") {
  459	        delete pointer[last];
  460	      } else if (
  461	        typeof pointer[last] === "object" &&
  462	        !Array.isArray(pointer[last])
  463	      ) {
  464	        // If it's an object but not an array, we need to keep its children
  465	        // but remove any direct error on this path
  466	        if ("message" in pointer[last]) {
  467	          delete pointer[last].message;
  468	        }
  469	      }
  470	    } else {
  471	      // For deep deletion, remove the entire path and its children
  472	      delete pointer[last];
  473	    }
  474	  }
  475	
  476	  // Only prune empty containers if we're not in shallow mode
  477	  if (!options?.shallow) {
  478	    // climb back and prune empty objects/arrays
  479	    for (let i = parents.length - 1; i >= 0; i--) {
  480	      const { parent, key } = parents[i];
  481	      const val = parent[key];
  482	      const isEmptyObj =
  483	        val && !Array.isArray(val) && Object.keys(val).length === 0;
  484	      const isEmptyArr = Array.isArray(val) && val.length === 0;
  485	      if (isEmptyObj || isEmptyArr) {
  486	        delete parent[key];
  487	      }
  488	    }
  489	  }
  490	
  491	  return obj;
  492	}
  493	
  494	function makeStrict(schema: z.ZodSchema) {
  495	  if (schema instanceof z.ZodObject) {
  496	    return schema.strict();
  497	  }
  498	  return schema;
  499	}
  500	
