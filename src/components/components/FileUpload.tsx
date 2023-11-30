import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@mui/material';

/**
 * File Upload Component
 * @author vadim.chilinciuc
 *
 */

export interface FileUploadProps {
  value?: File;
  onChange?: (e: any) => void;
}

export function FileUpload({ onChange, value }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<any>(value);

  // Function to handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);

    if (onChange) {
      onChange(file);
    }
  };

  if (!value) {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  useEffect(() => {
    inputRef.current = document.querySelector('#file-input');
  }, []);

  return (
    <div>
      <Input
        type="file"
        onChange={handleFileSelect}
        disableUnderline
        id="file-input"
      />
    </div>
  );
}
