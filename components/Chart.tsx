
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import styles from "./Chart.module.css"

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
   10	    icon?: React.ComponentType
   11	    color?: string;
   12	  }
   13	}
   14	
   15	type ChartContextProps = {
   16	  config: ChartConfig
   17	}
   18	
   19	const ChartContext = React.createContext<ChartContextProps | null>(null)
   20	
   21	function useChart() {
   22	  const context = React.useContext(ChartContext)
   23	
   24	  if (!context) {
   25	    throw new Error("useChart must be used within a <ChartContainer />")
   26	  }
   27	
   28	  return context
   29	}
   30	
   31	const ChartContainer = React.forwardRef<
   32	  HTMLDivElement,
   33	  React.ComponentProps<"div"> & {
   34	    config: ChartConfig
   35	    children: React.ComponentProps<
   36	      typeof RechartsPrimitive.ResponsiveContainer
   37	    >["children"]
   38	  }
   39	>(({ id, className, children, config, ...props }, ref) => {
   40	  const uniqueId = React.useId()
   41	  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`
   42	
   43	  return (
   44	    <ChartContext.Provider value={{ config }}>
   45	      <div
   46	        data-chart={chartId}
   47	        ref={ref}
   48	        className={`${styles.container} ${className ?? ""}`}
   49	        {...props}
   50	      >
   51	        <ChartStyle id={chartId} config={config} />
   52	        <RechartsPrimitive.ResponsiveContainer>
   53	          {children}
   54	        </RechartsPrimitive.ResponsiveContainer>
   55	      </div>
   56	    </ChartContext.Provider>
   57	  )
   58	})
   59	ChartContainer.displayName = "Chart"
   60	
   61	const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
   62	  const colorConfig = Object.entries(config).filter(
   63	    ([_, config]) => config.color
   64	  )
   65	
   66	  if (!colorConfig.length) {
   67	    return null
   68	  }
   69	
   70	  return (
   71	    <style
   72	      dangerouslySetInnerHTML={{
   73	        __html: `
   74	[data-chart=${id}] {
   75	${colorConfig
   76	  .map(([key, itemConfig]) => {
   77	    const color = itemConfig.color
   78	    return color ? `  --color-${key}: ${color};` : null
   79	  })
   80	  .join("\n")}
   81	}
   82	`
   83	      }}
   84	    />
   85	  )
   86	}
   87	
   88	const ChartTooltip = RechartsPrimitive.Tooltip
   89	
   90	const ChartTooltipContent = React.forwardRef<
   91	  HTMLDivElement,
   92	  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
   93	    React.ComponentProps<"div"> & {
   94	      hideLabel?: boolean
   95	      hideIndicator?: boolean
   96	      indicator?: "line" | "dot" | "dashed"
   97	      nameKey?: string
   98	      labelKey?: string
   99	    }
  100	>(
  101	  (
  102	    {
  103	      active,
  104	      payload,
  105	      className,
  106	      indicator = "dot",
  107	      hideLabel = false,
  108	      hideIndicator = false,
  109	      label,
  110	      labelFormatter,
  111	      labelClassName,
  112	      formatter,
  113	      color,
  114	      nameKey,
  115	      labelKey,
  116	    },
  117	    ref
  118	  ) => {
  119	    const { config } = useChart()
  120	
  121	    const tooltipLabel = React.useMemo(() => {
  122	      if (hideLabel || !payload?.length) {
  123	        return null
  124	      }
  125	
  126	      const [item] = payload
  127	      const key = `${labelKey || item.dataKey || item.name || "value"}`
  128	      const itemConfig = getPayloadConfigFromPayload(config, item, key)
  129	      const value =
  130	        !labelKey && typeof label === "string"
  131	          ? config[label as keyof typeof config]?.label || label
  132	          : itemConfig?.label
  133	
  134	      if (labelFormatter) {
  135	        return (
  136	          <div className={`${styles.tooltipLabel} ${labelClassName ?? ""}`}>
  137	            {labelFormatter(value, payload)}
  138	          </div>
  139	        )
  140	      }
  141	
  142	      if (!value) {
  143	        return null
  144	      }
  145	
  146	      return <div className={`${styles.tooltipLabel} ${labelClassName ?? ""}`}>{value}</div>
  147	    }, [
  148	      label,
  149	      labelFormatter,
  150	      payload,
  151	      hideLabel,
  152	      labelClassName,
  153	      config,
  154	      labelKey,
  155	    ])
  156	
  157	    if (!active || !payload?.length) {
  158	      return null
  159	    }
  160	
  161	    const nestLabel = payload.length === 1 && indicator !== "dot"
  162	
  163	    return (
  164	      <div
  165	        ref={ref}
  166	        className={`${styles.tooltip} ${className ?? ""}`}
  167	      >
  168	        {!nestLabel ? tooltipLabel : null}
  169	        <div className={styles.tooltipItems}>
  170	          {payload.map((item, index) => {
  171	            const key = `${nameKey || item.name || item.dataKey || "value"}`
  172	            const itemConfig = getPayloadConfigFromPayload(config, item, key)
  173	            const indicatorColor = color || item.payload.fill || item.color
  174	
  175	            return (
  176	              <div
  177	                key={item.dataKey}
  178	                className={`${styles.tooltipItem} ${className ?? ""}`}
  179	              >
  180	                {formatter && item?.value !== undefined && item.name ? (
  181	                  formatter(item.value, item.name, item, index, item.payload)
  182	                ) : (
  183	                  <>
  184	                    {itemConfig?.icon ? (
  185	                      <itemConfig.icon />
  186	                    ) : (
  187	                      !hideIndicator && (
  188	                        <div
  189	                          className={`${styles.tooltipItemIndicator} ${styles["tooltipItemIndicator-" + (nestLabel && indicator === "dashed" ? "nested-dashed" : indicator)]}`} // dot, line, dashed
  190	                          style={
  191	                            {
  192	                              "--color-bg": indicatorColor,
  193	                              "--color-border": indicatorColor,
  194	                            } as React.CSSProperties
  195	                          }
  196	                        />
  197	                      )
  198	                    )}
  199	                    <div
  200	                      className={`${styles.tooltipItemLabel} ${nestLabel ? styles["tooltipItemLabel-nested"] : styles["tooltipItemLabel-center"]}`}
  201	                    >
  202	                      <div className={styles.tooltipItemLabelContent}>
  203	                        {nestLabel ? tooltipLabel : null}
  204	                        <span className={styles.tooltipItemLabelText}>
  205	                          {itemConfig?.label || item.name}
  206	                        </span>
  207	                      </div>
  208	                      {item.value && (
  209	                        <span className={`${styles.tooltipItemValue}`}>
  210	                          {item.value.toLocaleString()}
  211	                        </span>
  212	                      )}
  213	                    </div>
  214	                  </>
  215	                )}
  216	              </div>
  217	            )
  218	          })}
  219	        </div>
  220	      </div>
  221	    )
  222	  }
  223	)
  224	ChartTooltipContent.displayName = "ChartTooltip"
  225	
  226	const ChartLegend = RechartsPrimitive.Legend
  227	
  228	const ChartLegendContent = React.forwardRef<
  229	  HTMLDivElement,
  230	  React.ComponentProps<"div"> &
  231	    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
  232	      hideIcon?: boolean
  233	      nameKey?: string
  234	    }
  235	>(
  236	  (
  237	    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
  238	    ref
  239	  ) => {
  240	    const { config } = useChart()
  241	
  242	    if (!payload?.length) {
  243	      return null
  244	    }
  245	
  246	    return (
  247	      <div
  248	        ref={ref}
  249	        className={`${styles.legend} ${styles["legend-" + verticalAlign]} ${className ?? ""}`}
  250	      >
  251	        {payload.map((item) => {
  252	          const key = `${nameKey || item.dataKey || "value"}`
  253	          const itemConfig = getPayloadConfigFromPayload(config, item, key)
  254	
  255	          return (
  256	            <div
  257	              key={item.value}
  258	              className={`${styles.legendItem} ${className ?? ""}`}
  259	            >
  260	              {itemConfig?.icon && !hideIcon ? (
  261	                <itemConfig.icon />
  262	              ) : (
  263	                <div
  264	                  className={`${styles.legendItemIcon}`}
  265	                  style={{
  266	                    backgroundColor: item.color,
  267	                  }}
  268	                />
  269	              )}
  270	              {itemConfig?.label}
  271	            </div>
  272	          )
  273	        })}
  274	      </div>
  275	    )
  276	  }
  277	)
  278	ChartLegendContent.displayName = "ChartLegend"
  279	
  280	// Helper to extract item config from a payload.
  281	function getPayloadConfigFromPayload(
  282	  config: ChartConfig,
  283	  payload: unknown,
  284	  key: string
  285	) {
  286	  if (typeof payload !== "object" || payload === null) {
  287	    return undefined
  288	  }
  289	
  290	  const payloadPayload =
  291	    "payload" in payload &&
  292	    typeof payload.payload === "object" &&
  293	    payload.payload !== null
  294	      ? payload.payload
  295	      : undefined
  296	
  297	  let configLabelKey: string = key
  298	
  299	  if (
  300	    key in payload &&
  301	    typeof payload[key as keyof typeof payload] === "string"
  302	  ) {
  303	    configLabelKey = payload[key as keyof typeof payload] as string
  304	  } else if (
  305	    payloadPayload &&
  306	    key in payloadPayload &&
  307	    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  308	  ) {
  309	    configLabelKey = payloadPayload[
  310	      key as keyof typeof payloadPayload
  311	    ] as string
  312	  }
  313	
  314	  return configLabelKey in config
  315	    ? config[configLabelKey]
  316	    : config[key as keyof typeof config]
  317	}
  318	
  319	export {
  320	  ChartContainer,
  321	  ChartTooltip,
  322	  ChartTooltipContent,
  323	  ChartLegend,
  324	  ChartLegendContent,
  325	}
  326	
