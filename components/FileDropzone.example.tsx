
import { Example } from "@floot/examples";
import { FileDropzone } from "./FileDropzone";
import { ImageIcon, FileText, Upload, FileArchive } from "lucide-react";

export default function FileDropzoneShowcase() {
  return (
    <>
      <h1>FileDropzone</h1>
      <p>
   10	        A click-or-drop upload target. It validates the dropped files against{" "}
   11	        <code>accept</code>, <code>maxFiles</code> and <code>maxSize</code>, and
   12	        shows a dismissible error when they do not pass.
   13	      </p>
   14	
   15	      <h2>Configurations</h2>
   16	      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
   17	        <Example
   18	          width={520}
   19	          title="Images"
   20	          description="Restricted to JPG and PNG, up to 10MB."
   21	        >
   22	          <FileDropzone
   23	            icon={<ImageIcon size={48} />}
   24	            title="Drop images here"
   25	            subtitle="PNG, JPG up to 10MB"
   26	            accept=".jpg,.jpeg,.png"
   27	            maxSize={10 * 1024 * 1024}
   28	            onFilesSelected={() => {}}
   29	          />
   30	        </Example>
   31	
   32	        <Example
   33	          width={520}
   34	          title="Documents"
   35	          description="Restricted to PDF and Word files, up to 25MB."
   36	        >
   37	          <FileDropzone
   38	            icon={<FileText size={48} />}
   39	            title="Drop documents here"
   40	            subtitle="PDF, DOC up to 25MB"
   41	            accept=".pdf,.doc,.docx"
   42	            maxSize={25 * 1024 * 1024}
   43	            onFilesSelected={() => {}}
   44	          />
   45	        </Example>
   46	
   47	        <Example
   48	          width={520}
   49	          title="Multiple files"
   50	          description="A maxFiles above one allows a multi-file selection; the title accepts any node."
   51	        >
   52	          <FileDropzone
   53	            maxFiles={5}
   54	            icon={<FileArchive size={48} />}
   55	            title={
   56	              <span
   57	                style={{
   58	                  display: "flex",
   59	                  alignItems: "center",
   60	                  gap: "var(--spacing-xs)",
   61	                }}
   62	              >
   63	                <Upload size={20} />
   64	                Bulk Upload
   65	              </span>
   66	            }
   67	            subtitle="Upload up to 5 files of any type"
   68	            onFilesSelected={() => {}}
   69	          />
   70	        </Example>
   71	      </div>
   72	
   73	      <h2>States</h2>
   74	      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
   75	        <Example
   76	          width={520}
   77	          title="Disabled"
   78	          description="The input is inert and drops are ignored."
   79	        >
   80	          <FileDropzone
   81	            disabled
   82	            title="Disabled State"
   83	            subtitle="This upload zone is inactive"
   84	            onFilesSelected={() => {}}
   85	          />
   86	        </Example>
   87	      </div>
   88	    </>
   89	  );
   90	}
   91	
