
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
   10	  YAxis,
   11	} from "recharts";
   12	import { Example } from "@floot/examples";
   13	import {
   14	  ChartContainer,
   15	  ChartLegend,
   16	  ChartLegendContent,
   17	  ChartTooltip,
   18	  ChartTooltipContent,
   19	} from "./Chart";
   20	
   21	const timeSeriesData = [
   22	  { name: "Jan", value: 400, value2: 240, value3: 320 },
   23	  { name: "Feb", value: 300, value2: 139, value3: 221 },
   24	  { name: "Mar", value: 200, value2: 980, value3: 590 },
   25	  { name: "Apr", value: 278, value2: 390, value3: 480 },
   26	  { name: "May", value: 189, value2: 480, value3: 380 },
   27	];
   28	
   29	const categoryData = [
   30	  { name: "Category A", value: 400, value2: 240 },
   31	  { name: "Category B", value: 300, value2: 139 },
   32	  { name: "Category C", value: 200, value2: 980 },
   33	  { name: "Category D", value: 278, value2: 390 },
   34	];
   35	
   36	const singleLineConfig = {
   37	  value: {
   38	    label: "Sales",
   39	    color: "var(--primary)",
   40	  },
   41	};
   42	
   43	const multiLineConfig = {
   44	  value: {
   45	    label: "Sales",
   46	    color: "var(--primary)",
   47	  },
   48	  value2: {
   49	    label: "Revenue",
   50	    color: "var(--secondary)",
   51	  },
   52	  value3: {
   53	    label: "Profit",
   54	    color: "var(--success)",
   55	  },
   56	};
   57	
   58	const areaConfig = {
   59	  value: {
   60	    label: "Traffic",
   61	    color: "var(--info)",
   62	  },
   63	};
   64	
   65	const barConfig = {
   66	  value: {
   67	    label: "Users",
   68	    color: "var(--chart-color-5)",
   69	  },
   70	  value2: {
   71	    label: "Active Users",
   72	    color: "var(--chart-color-3)",
   73	  },
   74	};
   75	
   76	export default function ChartShowcase() {
   77	  return (
   78	    <>
   79	      <h1>Chart</h1>
   80	      <p>
   81	        A themed wrapper around Recharts. <code>ChartContainer</code> takes a
   82	        config that maps each data key to a label and a color, exposed to the
   83	        chart as <code>--color-&lt;key&gt;</code>.
   84	      </p>
   85	
   86	      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
   87	        <Example
   88	          width={640}
   89	          title="Line"
   90	          description="A single series with grid, axes, and tooltip."
   91	        >
   92	          <ChartContainer config={singleLineConfig}>
   93	            <LineChart data={timeSeriesData}>
   94	              <CartesianGrid strokeDasharray="3 3" />
   95	              <XAxis dataKey="name" />
   96	              <YAxis />
   97	              <ChartTooltip content={<ChartTooltipContent />} />
   98	              <Line
   99	                type="monotone"
  100	                dataKey="value"
  101	                stroke="var(--color-value)"
  102	                strokeWidth={2}
  103	                dot={{ fill: "var(--color-value)" }}
  104	              />
  105	            </LineChart>
  106	          </ChartContainer>
  107	        </Example>
  108	
  109	        <Example
  110	          width={640}
  111	          title="Multi-line with legend"
  112	          description="Three series, a line indicator in the tooltip, and the legend on top."
  113	        >
  114	          <ChartContainer config={multiLineConfig}>
  115	            <LineChart data={timeSeriesData}>
  116	              <CartesianGrid strokeDasharray="3 3" />
  117	              <XAxis dataKey="name" />
  118	              <YAxis />
  119	              <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
  120	              <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
  121	              <Line
  122	                type="monotone"
  123	                dataKey="value"
  124	                stroke="var(--color-value)"
  125	                strokeWidth={2}
  126	                dot={{ fill: "var(--color-value)" }}
  127	              />
  128	              <Line
  129	                type="monotone"
  130	                dataKey="value2"
  131	                stroke="var(--color-value2)"
  132	                strokeWidth={2}
  133	                dot={{ fill: "var(--color-value2)" }}
  134	              />
  135	              <Line
  136	                type="monotone"
  137	                dataKey="value3"
  138	                stroke="var(--color-value3)"
  139	                strokeWidth={2}
  140	                dot={{ fill: "var(--color-value3)" }}
  141	              />
  142	            </LineChart>
  143	          </ChartContainer>
  144	        </Example>
  145	
  146	        <Example
  147	          width={640}
  148	          title="Area"
  149	          description="A filled series with a dashed tooltip indicator."
  150	        >
  151	          <ChartContainer config={areaConfig}>
  152	            <AreaChart data={timeSeriesData}>
  153	              <CartesianGrid strokeDasharray="3 3" />
  154	              <XAxis dataKey="name" />
  155	              <YAxis />
  156	              <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
  157	              <Area
  158	                type="monotone"
  159	                dataKey="value"
  160	                stroke="var(--color-value)"
  161	                fill="var(--color-value)"
  162	                fillOpacity={0.3}
  163	                dot={{ fill: "var(--color-value)" }}
  164	              />
  165	            </AreaChart>
  166	          </ChartContainer>
  167	        </Example>
  168	
  169	        <Example
  170	          width={640}
  171	          title="Bar"
  172	          description="Two grouped series over categorical data, with the legend below."
  173	        >
  174	          <ChartContainer config={barConfig}>
  175	            <BarChart data={categoryData}>
  176	              <CartesianGrid strokeDasharray="3 3" />
  177	              <XAxis dataKey="name" />
  178	              <YAxis />
  179	              <ChartTooltip content={<ChartTooltipContent />} />
  180	              <ChartLegend content={<ChartLegendContent />} />
  181	              <Bar dataKey="value" fill="var(--color-value)" />
  182	              <Bar dataKey="value2" fill="var(--color-value2)" />
  183	            </BarChart>
  184	          </ChartContainer>
  185	        </Example>
  186	      </div>
  187	    </>
  188	  );
  189	}
  190	
