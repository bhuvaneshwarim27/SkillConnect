
import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from './Button';
import styles from './FileDropzone.module.css';

export interface FileDropzoneProps {
  className?: string;
  accept?: string;
  maxFiles?: number;
   10	  maxSize?: number; // in bytes
   11	  onFilesSelected?: (files: File[]) => void;
   12	  disabled?: boolean;
   13	  icon?: React.ReactNode;
   14	  title?: React.ReactNode;
   15	  subtitle?: React.ReactNode;
   16	}
   17	
   18	export const FileDropzone: React.FC<FileDropzoneProps> = ({
   19	  className = '',
   20	  accept,
   21	  maxFiles = 1,
   22	  maxSize,
   23	  onFilesSelected,
   24	  disabled = false,
   25	  icon = <Upload size={48} />,
   26	  title = "Click to upload or drag and drop",
   27	  subtitle,
   28	}) => {
   29	  const [isDragging, setIsDragging] = useState(false);
   30	  const [error, setError] = useState<string | null>(null);
   31	  
   32	  const handleDrag = useCallback((e: React.DragEvent) => {
   33	    e.preventDefault();
   34	    e.stopPropagation();
   35	    
   36	    if (disabled) return;
   37	    
   38	    if (e.type === "dragenter" || e.type === "dragover") {
   39	      setIsDragging(true);
   40	    } else if (e.type === "dragleave") {
   41	      setIsDragging(false);
   42	    }
   43	  }, [disabled]);
   44	
   45	  const validateFiles = useCallback((fileList: FileList | null): File[] => {
   46	    if (!fileList) return [];
   47	    
   48	    const files = Array.from(fileList);
   49	    
   50	    if (files.length > maxFiles) {
   51	      setError(`Maximum ${maxFiles} file${maxFiles === 1 ? '' : 's'} allowed`);
   52	      return [];
   53	    }
   54	
   55	    if (accept) {
   56	      const acceptedTypes = accept.split(',').map(type => type.trim());
   57	      const invalidFiles = files.filter(file => 
   58	        !acceptedTypes.some(type => {
   59	          if (type.startsWith('.')) {
   60	            return file.name.toLowerCase().endsWith(type.toLowerCase());
   61	          }
   62	          return file.type.match(new RegExp(type.replace('*', '.*')));
   63	        })
   64	      );
   65	      
   66	      if (invalidFiles.length > 0) {
   67	        setError(`Invalid file type. Accepted: ${accept}`);
   68	        return [];
   69	      }
   70	    }
   71	
   72	    if (maxSize) {
   73	      const oversizedFiles = files.filter(file => file.size > maxSize);
   74	      if (oversizedFiles.length > 0) {
   75	        setError(`File size exceeds ${Math.round(maxSize/1024/1024)}MB limit`);
   76	        return [];
   77	      }
   78	    }
   79	
   80	    setError(null);
   81	    return files;
   82	  }, [accept, maxFiles, maxSize]);
   83	
   84	  const handleDrop = useCallback((e: React.DragEvent) => {
   85	    e.preventDefault();
   86	    e.stopPropagation();
   87	    
   88	    if (disabled) return;
   89	    
   90	    setIsDragging(false);
   91	    
   92	    const files = validateFiles(e.dataTransfer.files);
   93	    if (files.length > 0 && onFilesSelected) {
   94	      onFilesSelected(files);
   95	    }
   96	  }, [disabled, validateFiles, onFilesSelected]);
   97	
   98	  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
   99	    if (disabled) return;
  100	    
  101	    const files = validateFiles(e.target.files);
  102	    if (files.length > 0 && onFilesSelected) {
  103	      onFilesSelected(files);
  104	    }
  105	    // Reset input value to allow selecting the same file again
  106	    e.target.value = '';
  107	  }, [disabled, validateFiles, onFilesSelected]);
  108	
  109	  const clearError = useCallback(() => {
  110	    setError(null);
  111	  }, []);
  112	
  113	  const defaultSubtitle = (accept || maxFiles > 1) && (
  114	    <>
  115	      {accept && `Accepted types: ${accept}`}
  116	      {maxFiles > 1 && ` (Up to ${maxFiles} files)`}
  117	    </>
  118	  );
  119	
  120	  return (
  121	    <div className={`${styles.container} ${className ?? ""}`}>
  122	      <label
  123	        className={`
  124	          ${styles.dropzone}
  125	          ${isDragging ? styles.dragging : ''}
  126	          ${disabled ? styles.disabled : ''}
  127	        `}
  128	        onDragEnter={handleDrag}
  129	        onDragLeave={handleDrag}
  130	        onDragOver={handleDrag}
  131	        onDrop={handleDrop}
  132	      >
  133	        <input
  134	          type="file"
  135	          onChange={handleFileInput}
  136	          accept={accept}
  137	          multiple={maxFiles > 1}
  138	          disabled={disabled}
  139	          aria-label="File upload"
  140	        />
  141	        
  142	        <span className={styles.icon}>{icon}</span>
  143	        <span className={styles.title}>{title}</span>
  144	        {(subtitle || defaultSubtitle) && (
  145	          <span className={styles.subtitle}>{subtitle || defaultSubtitle}</span>
  146	        )}
  147	      </label>
  148	
  149	      {error && (
  150	        <div className={styles.error} role="alert">
  151	          <span>{error}</span>
  152	          <Button
  153	            variant="ghost"
  154	            size="icon-sm"
  155	            onClick={clearError}
  156	            aria-label="Clear error"
  157	          >
  158	            <X size={16} />
  159	          </Button>
  160	        </div>
  161	      )}
  162	    </div>
  163	  );
  164	};
