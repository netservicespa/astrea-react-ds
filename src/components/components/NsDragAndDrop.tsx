import * as React from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { Box, Button, FormLabel, MenuItem, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import { NsSelect } from './form/fields/NsSelect';
import { required } from './form/validators';
import { NsTooltip } from './NsTooltip';

export interface NsDragAndDropProps {
    value?: File[];
    onChange?: (e: any[]) => void;
    loadText?: string;
    buttonStatus?: boolean;
    /** Callback invocato al caricamento di un nuovo file */
    onFileLoaded?: () => void;
    /** Se true, supporta il caricamento di file multipli */
    multiple?: boolean;
    attachmentTypes?: {
        codice: string | null;
        descrizione: string | null;
        id: string | null;
    }[];
    validationFile?: Accept;
    displayForm?: boolean;
    name?: string;
    defaultValue?: any;
    iconFileColor?: string | null;
}

export function NsDragAndDrop({
    value,
    onChange,
    loadText,
    multiple,
    attachmentTypes,
    validationFile,
    displayForm,
    onFileLoaded,
    iconFileColor,
}: NsDragAndDropProps) {
    const theme = useTheme();
    const [images, setImages] = React.useState<File[]>(value ?? []);
    const [showCarica, setShowCarica] = React.useState<boolean | undefined>(displayForm);
    const iconColor = iconFileColor ?? theme.palette.primary.main;
    const deleteBoxSize = 56;
    React.useEffect(() => {
        setShowCarica(displayForm);
    }, [displayForm]);

    const onUpdate = (value: File[]) => {
        if (value.length == 0) {
            setShowCarica(true);
        }
        setImages(value);
        onChange!(value);
    };

    const onDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            const array: File[] = [...images];
            const uniqueFiles: File[] = [];

            acceptedFiles.forEach((file: File) => {
                if (!array.some((e: File) => e.name === file.name)) {
                    uniqueFiles.push(file);
                }
            });

            onUpdate([...array, ...uniqueFiles]);
        },
        [images],
    );

    const removeImage = (index: number) => {
        const newArr = [...images];
        newArr.splice(index, 1);
        onUpdate([...newArr]);
    };

    const { t } = useTranslation();

    function usePrevious(value: any) {
        const ref = React.useRef(null);
        React.useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    let messageI = t('dragDrop.messageStandard.messageI');
    let messageD = t('dragDrop.messageStandard.messageD');

    const prevAmount = usePrevious(images.length);

    React.useEffect(() => {
        if (prevAmount != undefined) {
            if (!multiple) {
                messageI = t('dragDrop.chargeFile');
                messageD = t('dragDrop.deleteFile');
            } else {
                messageI = t('dragDrop.attachment.chargeAttachment');
                messageD = t('dragDrop.attachment.deleteAttachment');
            }
            if (prevAmount < images.length) {
                if (onFileLoaded) {
                    onFileLoaded();
                }
            }
            if (prevAmount > images.length) {
                if (onFileLoaded) {
                    onFileLoaded();
                }
            }
        }
    }, [images]);

    const { getRootProps, isDragActive, getInputProps } = useDropzone({
        onDrop,
        accept: validationFile,
        multiple: multiple,
    });

    return (
        <>
            {
                <div>
                    {showCarica && (
                        <Box
                            {...getRootProps({ className: 'dropzone' })}
                            sx={{
                                mt: 0,
                                mb: 0,
                                ml: 0,
                                mr: 0,
                            }}
                        >
                            <Box
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    p: 5,
                                    display: !multiple && images.length != 0 ? 'none' : '',
                                    minHeight: '300px',
                                    border: !isDragActive ? '1px dashed grey' : '1px dashed #308A7D',
                                    background: '#F0F0F0',
                                }}
                            >
                                <input {...getInputProps()} />
                                <Box sx={{ textAlign: 'center' }}>
                                    <FileUploadIcon color="disabled" sx={{ fontSize: 50 }} />
                                </Box>
                                {isDragActive ? (
                                    <Box
                                        sx={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        <input {...getInputProps()} />
                                        {t('dragDrop.labels.releaseFile')}
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        {t('dragDrop.labels.textDrag')}
                                    </Box>
                                )}
                            </Box>
                            <Box
                                sx={{
                                    display: !multiple && images.length != 0 ? 'none' : '',
                                    mb: 2,
                                    textAlign: 'center',
                                }}
                            >
                                <Button sx={{ width: '100%' }} variant="contained">
                                    {t('dragDrop.labels.loadFromFile')}
                                </Button>
                            </Box>
                        </Box>
                    )}
                    <Box>
                        <Typography
                            component="h2"
                            variant="h2"
                            sx={{
                                margin: 0,
                                padding: 0,
                            }}
                        >
                            {loadText}
                        </Typography>
                    </Box>

                    {images.length <= 0 ? (
                        <Box>
                            <Typography
                                variant="h6"
                                style={{ fontWeight: 600 }}
                                sx={{
                                    margin: 0,
                                    padding: 0,
                                }}
                            >
                                {t('dragDrop.uploadedFile')}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    margin: 0,
                                    padding: 0,
                                }}
                            >
                                {t('dragDrop.noFile')}
                            </Typography>
                        </Box>
                    ) : null}

                    <Box
                        sx={{
                            margin: 0,
                            padding: 0,
                        }}
                    >
                        {!multiple &&
                            images.map((image, index) => {
                                return (
                                    <Box key={image.name}>
                                        <Typography
                                            variant="h6"
                                            style={{ fontWeight: 600 }}
                                            sx={{
                                                margin: 0,
                                                padding: 0,
                                                pb: 1,
                                            }}
                                        >
                                            {t('dragDrop.uploadedFile')}
                                        </Typography>
                                        <Box
                                            sx={{
                                                p: 0,
                                                pt: 0,
                                                display: 'flex',
                                                alignItems: 'stretch',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    p: 1.5,
                                                    border: (theme as any).custom.borders[0],
                                                    flex: 1,
                                                    minWidth: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <ListAltSharpIcon
                                                    sx={{ color: iconColor, ml: 3, flexShrink: 0, fontSize: 28 }}
                                                />
                                                <NsTooltip placement="top" title={image.name}>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            pl: 3,
                                                            minWidth: 0,
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                            fontSize: '1.1rem',
                                                            lineHeight: 1.4,
                                                        }}
                                                    >
                                                        {image.name}
                                                    </Typography>
                                                </NsTooltip>
                                            </Box>
                                            <Box
                                                onClick={() => removeImage(index)}
                                                sx={{
                                                    width: `${deleteBoxSize}px`,
                                                    height: `${deleteBoxSize}px`,
                                                    flexShrink: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#f7e1e0',
                                                    cursor: 'pointer',
                                                    borderBottom: '3px solid',
                                                    borderColor: '#B72438',
                                                }}
                                            >
                                                <DeleteOutlineIcon sx={{ color: '#B72438', fontSize: 28 }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                );
                            })}
                    </Box>

                    {multiple &&
                        images.map((image, index) => {
                            return (
                                <Box key={index}>
                                    <Box
                                        sx={{
                                            p: 0,
                                            pb: 2,
                                            pt: 0,
                                            display: 'flex',
                                            alignItems: 'stretch',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                p: 1.5,
                                                border: (theme as any).custom.borders[0],
                                                flex: 1,
                                                minWidth: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    minWidth: 0,
                                                }}
                                            >
                                                <ListAltSharpIcon
                                                    sx={{
                                                        color: iconColor,
                                                        ml: 3,
                                                        flexShrink: 0,
                                                        fontSize: 28,
                                                    }}
                                                />
                                                <NsTooltip placement="top" title={image.name}>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            pl: 3,
                                                            minWidth: 0,
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                            fontSize: '1.1rem',
                                                            lineHeight: 1.4,
                                                        }}
                                                    >
                                                        {image.name}
                                                    </Typography>
                                                </NsTooltip>
                                            </Box>
                                            <Box
                                                sx={{
                                                    mt: 2,
                                                    display: 'flex',
                                                }}
                                            >
                                                {attachmentTypes ? (
                                                    <NsSelect
                                                        validate={required}
                                                        defaultValue={attachmentTypes[0].codice}
                                                        errorMessage={
                                                            t('dragDrop.errors.tipoAllegatoRequired') as string
                                                        }
                                                        name={`tipoAllegato_${index}`}
                                                        fullWidth
                                                        variant={'filled'}
                                                    >
                                                        {attachmentTypes &&
                                                            attachmentTypes.map((att) => (
                                                                <MenuItem key={att.id!} value={att.codice!}>
                                                                    {att.descrizione}
                                                                </MenuItem>
                                                            ))}
                                                    </NsSelect>
                                                ) : (
                                                    <></>
                                                )}
                                            </Box>
                                        </Box>
                                        <Box
                                            onClick={() => removeImage(index)}
                                            sx={{
                                                width: `${deleteBoxSize}px`,
                                                height: `${deleteBoxSize}px`,
                                                flexShrink: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#f7e1e0',
                                                cursor: 'pointer',
                                                borderBottom: '3px solid',
                                                borderColor: '#B72438',
                                            }}
                                        >
                                            <DeleteOutlineIcon
                                                sx={{
                                                    color: '#B72438',
                                                    fontSize: 28,
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })}
                </div>
            }
        </>
    );
}
