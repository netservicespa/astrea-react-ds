import React, { useEffect, useRef, useState } from 'react';
import { Button, Input } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';

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
  const {t} = useTranslation();

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

  useEffect(() => {
    setSelectedFile(value);
    if (!value && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [value]);

  return (
    <div>
      <Input
        type="file"
        onChange={handleFileSelect}
        disableUnderline
        id="file-input"
        style={{ display: 'none' }}
      />
      <label htmlFor="file-input">
        <Button variant="contained" color="secondary" size="small" component="span">{t('form.fileUpload.selectFile')}</Button>
      </label>
      <Box pl={2} component="span">{value?.name ? value.name : t('form.fileUpload.noFileSelected')} </Box>
    </div>
  );
}
