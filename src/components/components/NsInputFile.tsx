import React, { useEffect, useId, useMemo, useRef } from 'react';
import { Button, Input, InputProps } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import uniqueId from '../../util/uniqueId';

export interface NsInputFileProps extends Omit<InputProps, 'type' | 'value' | 'onChange' | 'defaultValue'> {
    value?: File;
    onChange?: (file: File) => void;
}

export function NsInputFile({ name, value, onChange, ...rest }: NsInputFileProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { t } = useTranslation();
    const key = useMemo(() => name ?? uniqueId('v_select-'), [name]);

    // Function to handle file selection
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if (onChange && file !== null) {
            onChange(file as File);
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
                id={key}
                name={name}
                style={{ display: 'none' }}
                ref={inputRef}
                {...rest}
            />
            <label htmlFor={key}>
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
