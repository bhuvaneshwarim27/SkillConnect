
import { useEffect, useState } from "react";
import * as z from "zod";
import { X, Plus } from "lucide-react";
import { Example } from "@floot/examples";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
   10	  FormDescription,
   11	  FormMessage,
   12	  useForm,
   13	} from "./Form";
   14	import { Input } from "./Input";
   15	import { Button } from "./Button";
   16	import { Textarea } from "./Textarea";
   17	
   18	const formSchema = z.object({
   19	  username: z.string().min(2, {
   20	    message: "Username must be at least 2 characters.",
   21	  }),
   22	  email: z.string().email({
   23	    message: "Please enter a valid email address.",
   24	  }),
   25	  bio: z.string().max(160, {
   26	    message: "Bio must not be longer than 160 characters.",
   27	  }),
   28	});
   29	
   30	function BasicForm() {
   31	  // no need to provide the generic type - just infer from the schema directly.
   32	  const form = useForm({
   33	    defaultValues: {
   34	      username: "",
   35	      email: "",
   36	      bio: "",
   37	    },
   38	    schema: formSchema,
   39	  });
   40	
   41	  const [prefilledPerson, setPrefilledPerson] = useState<string | null>(null);
   42	
   43	  const setValues = form.setValues;
   44	
   45	  useEffect(() => {
   46	    if (prefilledPerson === "alice") {
   47	      setValues({
   48	        username: "alice",
   49	        email: "alice@example.com",
   50	        bio: "Hi my name is Alice",
   51	      });
   52	    } else if (prefilledPerson === "bob") {
   53	      setValues({
   54	        username: "bob",
   55	        email: "bob@example.com",
   56	        bio: "Hi my name is Bob",
   57	      });
   58	    }
   59	    // Note: when trying to set the form value in useEffect,
   60	    // use setValue as the dependency and not form, otherwise
   61	    // we will run into an infinite loop since form is updated when
   62	    // value is set
   63	  }, [prefilledPerson, setValues]);
   64	
   65	  return (
   66	    <Form {...form}>
   67	      <div style={{ display: "flex", gap: "var(--spacing-2)" }}>
   68	        <Button
   69	          variant={prefilledPerson === "alice" ? "primary" : "outline"}
   70	          onClick={() => setPrefilledPerson("alice")}
   71	        >
   72	          Alice
   73	        </Button>
   74	        <Button
   75	          variant={prefilledPerson === "bob" ? "primary" : "outline"}
   76	          onClick={() => setPrefilledPerson("bob")}
   77	        >
   78	          Bob
   79	        </Button>
   80	      </div>
   81	      <form onSubmit={form.handleSubmit(() => {})} style={{ width: "100%" }}>
   82	        <FormItem name="username">
   83	          <FormLabel>Username</FormLabel>
   84	          <FormControl>
   85	            <Input
   86	              placeholder="Enter username"
   87	              value={form.values.username}
   88	              onChange={(e) => {
   89	                form.setValues((prev) => ({
   90	                  ...prev,
   91	                  username: e.target.value,
   92	                }));
   93	              }}
   94	            />
   95	          </FormControl>
   96	          <FormDescription>This is your public display name.</FormDescription>
   97	          <FormMessage />
   98	        </FormItem>
   99	        <FormItem name="email">
  100	          <FormLabel>Email</FormLabel>
  101	          <FormControl>
  102	            <Input
  103	              type="email"
  104	              placeholder="Enter email"
  105	              value={form.values.email}
  106	              onChange={(e) =>
  107	                form.setValues((prev) => ({ ...prev, email: e.target.value }))
  108	              }
  109	            />
  110	          </FormControl>
  111	          <FormMessage />
  112	        </FormItem>
  113	        <FormItem name="bio">
  114	          <FormLabel>Bio</FormLabel>
  115	          <FormControl>
  116	            <Textarea
  117	              placeholder="Tell us about yourself"
  118	              value={form.values.bio}
  119	              onChange={(e) => {
  120	                form.setValues((prev) => ({ ...prev, bio: e.target.value }));
  121	              }}
  122	            />
  123	          </FormControl>
  124	          <FormDescription>
  125	            Brief description for your profile. Max 160 characters.
  126	          </FormDescription>
  127	          <FormMessage />
  128	        </FormItem>
  129	        <Button type="submit" style={{ marginTop: "var(--spacing-4)" }}>
  130	          Submit
  131	        </Button>
  132	      </form>
  133	    </Form>
  134	  );
  135	}
  136	
  137	const nestedFormSchema = z.object({
  138	  name: z.string().min(2, { message: "Name is required" }),
  139	  tags: z.array(z.string().min(1, { message: "Tag cannot be empty" })),
  140	  addresses: z
  141	    .array(
  142	      z.object({
  143	        street: z.string().min(1, { message: "Street is required" }),
  144	        city: z.string().min(1, { message: "City is required" }),
  145	        zip: z.string().min(1, { message: "Zip code is required" }),
  146	      }),
  147	    )
  148	    .min(1, "At least one address"),
  149	});
  150	
  151	function NestedForm() {
  152	  const form = useForm({
  153	    defaultValues: {
  154	      name: "",
  155	      tags: [""],
  156	      addresses: [{ street: "", city: "", zip: "" }],
  157	    },
  158	    schema: nestedFormSchema,
  159	  });
  160	
  161	  const addTag = () => {
  162	    form.setValues((prev) => {
  163	      return {
  164	        ...prev,
  165	        tags: [...prev.tags, ""],
  166	      };
  167	    });
  168	  };
  169	
  170	  const removeTag = (index: number) => {
  171	    form.setValues((prev) => {
  172	      const updatedTags = [...prev.tags];
  173	      updatedTags.splice(index, 1);
  174	      return {
  175	        ...prev,
  176	        tags: updatedTags,
  177	      };
  178	    });
  179	  };
  180	
  181	  const updateTag = (index: number, value: string) => {
  182	    form.setValues((prev) => {
  183	      const updatedTags = [...prev.tags];
  184	      updatedTags[index] = value;
  185	      return {
  186	        ...prev,
  187	        tags: updatedTags,
  188	      };
  189	    });
  190	  };
  191	
  192	  const addAddress = () => {
  193	    form.setValues((prev) => {
  194	      return {
  195	        ...prev,
  196	        addresses: [...prev.addresses, { street: "", city: "", zip: "" }],
  197	      };
  198	    });
  199	  };
  200	
  201	  const removeAddress = (index: number) => {
  202	    form.setValues((prev) => {
  203	      const updatedAddresses = [...prev.addresses];
  204	      updatedAddresses.splice(index, 1);
  205	      return {
  206	        ...prev,
  207	        addresses: updatedAddresses,
  208	      };
  209	    });
  210	  };
  211	
  212	  const updateAddress = (index: number, field: string, value: string) => {
  213	    form.setValues((prev) => {
  214	      const updatedAddresses = [...prev.addresses];
  215	      updatedAddresses[index] = {
  216	        ...updatedAddresses[index],
  217	        [field]: value,
  218	      };
  219	      return {
  220	        ...prev,
  221	        addresses: updatedAddresses,
  222	      };
  223	    });
  224	  };
  225	
  226	  return (
  227	    <Form {...form}>
  228	      <form
  229	        onSubmit={form.handleSubmit(() => {})}
  230	        style={{
  231	          display: "flex",
  232	          flexDirection: "column",
  233	          gap: "var(--spacing-4)",
  234	        }}
  235	      >
  236	        <FormItem name="name">
  237	          <FormLabel>Name</FormLabel>
  238	          <FormControl>
  239	            <Input
  240	              placeholder="Enter name"
  241	              value={form.values.name}
  242	              onChange={(e) =>
  243	                form.setValues((prev) => ({ ...prev, name: e.target.value }))
  244	              }
  245	            />
  246	          </FormControl>
  247	          <FormMessage />
  248	        </FormItem>
  249	
  250	        {/* Wrap nested field in FormItem at every level */}
  251	        <FormItem name="tags">
  252	          <FormLabel>Tags</FormLabel>
  253	          {/* Though note that only the user input field should be wrapped in FormControl, not array fields */}
  254	          {form.values.tags.map((tag, index) => (
  255	            <FormItem key={index} name={`tags.${index}`}>
  256	              <div
  257	                style={{
  258	                  display: "flex",
  259	                  gap: "var(--spacing-2)",
  260	                }}
  261	              >
  262	                <FormControl>
  263	                  <Input
  264	                    value={tag}
  265	                    onChange={(e) => updateTag(index, e.target.value)}
  266	                    onBlur={() => form.validateField(`tags.${index}`)}
  267	                    placeholder="Enter tag"
  268	                  />
  269	                </FormControl>
  270	                <Button
  271	                  type="button"
  272	                  variant="ghost"
  273	                  size="icon-md"
  274	                  onClick={() => removeTag(index)}
  275	                  aria-label="Remove tag"
  276	                >
  277	                  <X size={16} />
  278	                </Button>
  279	              </div>
  280	              <FormMessage />
  281	            </FormItem>
  282	          ))}
  283	          <Button
  284	            type="button"
  285	            variant="outline"
  286	            onClick={addTag}
  287	            style={{ marginTop: "var(--spacing-1)" }}
  288	          >
  289	            <Plus size={16} /> Add Tag
  290	          </Button>
  291	          {/* Provide FormMessage for nested field at every level so that we capture array level errors like min(1) */}
  292	          <FormMessage />
  293	        </FormItem>
  294	
  295	        <FormItem name="addresses">
  296	          <FormLabel>Addresses</FormLabel>
  297	          {form.values.addresses.map((address, index) => (
  298	            <FormItem
  299	              key={index}
  300	              name={`addresses.${index}`}
  301	              style={{
  302	                border: "1px solid var(--border)",
  303	                borderRadius: "var(--radius)",
  304	                padding: "var(--spacing-3)",
  305	                marginBottom: "var(--spacing-3)",
  306	              }}
  307	            >
  308	              <div
  309	                style={{
  310	                  display: "flex",
  311	                  justifyContent: "space-between",
  312	                  marginBottom: "var(--spacing-2)",
  313	                }}
  314	              >
  315	                <h4 style={{ margin: 0 }}>Address {index + 1}</h4>
  316	                <Button
  317	                  type="button"
  318	                  variant="ghost"
  319	                  size="icon-sm"
  320	                  onClick={() => removeAddress(index)}
  321	                  aria-label="Remove address"
  322	                >
  323	                  <X size={16} />
  324	                </Button>
  325	              </div>
  326	
  327	              <FormItem name={`addresses.${index}.street`}>
  328	                <FormLabel>Street</FormLabel>
  329	                <FormControl>
  330	                  <Input
  331	                    value={address.street}
  332	                    onChange={(e) =>
  333	                      updateAddress(index, "street", e.target.value)
  334	                    }
  335	                    onBlur={() =>
  336	                      form.validateField(`addresses.${index}.street`)
  337	                    }
  338	                    placeholder="Enter street"
  339	                  />
  340	                </FormControl>
  341	                <FormMessage />
  342	              </FormItem>
  343	
  344	              <div style={{ display: "flex", gap: "var(--spacing-2)" }}>
  345	                <div style={{ flex: 1 }}>
  346	                  <FormItem name={`addresses.${index}.city`}>
  347	                    <FormLabel>City</FormLabel>
  348	                    <FormControl>
  349	                      <Input
  350	                        value={address.city}
  351	                        onChange={(e) =>
  352	                          updateAddress(index, "city", e.target.value)
  353	                        }
  354	                        onBlur={() =>
  355	                          form.validateField(`addresses.${index}.city`)
  356	                        }
  357	                        placeholder="Enter city"
  358	                      />
  359	                    </FormControl>
  360	                    <FormMessage />
  361	                  </FormItem>
  362	                </div>
  363	                <div style={{ width: "30%" }}>
  364	                  <FormItem name={`addresses.${index}.zip`}>
  365	                    <FormLabel>Zip Code</FormLabel>
  366	                    <FormControl>
  367	                      <Input
  368	                        value={address.zip}
  369	                        onChange={(e) =>
  370	                          updateAddress(index, "zip", e.target.value)
  371	                        }
  372	                        onBlur={() =>
  373	                          form.validateField(`addresses.${index}.zip`)
  374	                        }
  375	                        placeholder="Enter zip"
  376	                      />
  377	                    </FormControl>
  378	                    <FormMessage />
  379	                  </FormItem>
  380	                </div>
  381	              </div>
  382	              <FormMessage />
  383	            </FormItem>
  384	          ))}
  385	          <Button type="button" variant="outline" onClick={addAddress}>
  386	            <Plus size={16} /> Add Address
  387	          </Button>
  388	          <FormMessage />
  389	        </FormItem>
  390	
  391	        <Button type="submit" style={{ marginTop: "var(--spacing-4)" }}>
  392	          Submit
  393	        </Button>
  394	      </form>
  395	    </Form>
  396	  );
  397	}
  398	
  399	export default function FormShowcase() {
  400	  return (
  401	    <>
  402	      <h1>Form</h1>
  403	      <p>
  404	        Field primitives driven by <code>useForm</code>, which holds the values
  405	        and validates them against a Zod schema.{" "}
  406	        <code>FormItem</code> names a field, and <code>FormLabel</code>,{" "}
  407	        <code>FormControl</code>, <code>FormDescription</code> and{" "}
  408	        <code>FormMessage</code> wire up labelling, errors and descriptions for
  409	        it.
  410	      </p>
  411	
  412	      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
  413	        <Example
  414	          width={520}
  415	          title="Basic"
  416	          description="Text, email and textarea fields validated on blur and on submit. The two buttons prefill the whole form."
  417	        >
  418	          <BasicForm />
  419	        </Example>
  420	
  421	        <Example
  422	          width={520}
  423	          title="Nested fields"
  424	          description="Dot-separated names address array entries and nested objects, with a message at every level."
  425	        >
  426	          <NestedForm />
  427	        </Example>
  428	      </div>
  429	    </>
  430	  );
  431	}
  432	
