import React, { useEffect, useRef, useState, useId } from 'react';
import { Button, Input } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';

export interface NsInputFileProps {
  value?: File;
  onChange?: (e: any) => void;
}

export function NsInputFile({ onChange, value }: NsInputFileProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<any>(value);
  const { t } = useTranslation();
  const inputId = useId();

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
        id={inputId}
        style={{ display: 'none' }}
        ref={inputRef}
      />
      <label htmlFor={inputId}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          component="span"
        >
          {t('form.fileUpload.selectFile')}
        </Button>
      </label>
      <Box pl={2} component="span">
        {value?.name ? value.name : t('form.fileUpload.noFileSelected')}{' '}
      </Box>
    </div>
  );
}
