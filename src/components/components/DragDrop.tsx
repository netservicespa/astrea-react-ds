import * as React from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { Box, Button, MenuItem, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { ValidatedSelect } from './form/fields/ValidatedSelect';
import { required } from './form/validators';

export interface DragDropProps {
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
}

export function DragDrop({
  value,
  onChange,
  loadText,
  multiple,
  attachmentTypes,
  validationFile,
  displayForm,
  onFileLoaded,
}: DragDropProps) {
  const theme = useTheme();
  const [images, setImages] = React.useState<File[]>(value ?? []);
  const [showCarica, setShowCarica] = React.useState<boolean | undefined>(
    displayForm
  );

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
    [images]
  );

  const removeImage = (index: number) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    onUpdate([...newArr]);
  };

  const { t } = useTranslation();

  function usePrevious(value: any) {
    const ref = React.useRef();
    React.useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  let messageI = t('notifiche.messageStandard.messageI');
  let messageD = t('notifiche.messageStandard.messageD');

  const prevAmount = usePrevious(images.length);

  React.useEffect(() => {
    if (prevAmount != undefined) {
      if (!multiple) {
        messageI = t('notifiche.attoPrincipale.caricaFile');
        messageD = t('notifiche.attoPrincipale.eliminaFile');
      } else {
        messageI = t('notifiche.allegato.caricaAllegato');
        messageD = t('notifiche.allegato.eliminaAllegato');
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
            <div
              style={{ margin: '0 25px 0 25px' }}
              {...getRootProps({ className: 'dropzone' })}
            >
              <Box
                mt={3}
                mb={2}
                p={5}
                sx={{
                  minHeight: '300px',
                  border: !isDragActive
                    ? '1px dashed grey'
                    : '1px dashed #308A7D',
                  background: '#F0F0F0',
                }}
                display={!multiple && images.length != 0 ? 'none' : ''}
              >
                <input {...getInputProps()} />
                <Box sx={{ textAlign: 'center' }}>
                  <FileUploadIcon color="disabled" sx={{ fontSize: 50 }} />
                </Box>
                {isDragActive ? (
                  <Box textAlign={'center'} padding={'0 5px 0 5px'}>
                    <input {...getInputProps()} />
                    {t('dragDrop.labels.releaseFile')}
                  </Box>
                ) : (
                  <Box textAlign={'center'}>
                    {t('dragDrop.labels.textDrag')}
                  </Box>
                )}
              </Box>
              <Box
                display={!multiple && images.length != 0 ? 'none' : ''}
                mb={2}
                textAlign={'center'}
              >
                <Button sx={{ width: '100%' }} variant="contained">
                  {t('dragDrop.labels.loadFromFile')}
                </Button>
              </Box>
            </div>
          )}
          <Box>
            <Typography component="h2" variant="h2" margin={3} padding={0}>
              {loadText}
            </Typography>
          </Box>

          {images.length <= 0 ? (
            <Box>
              <Typography
                component="h6"
                variant="h6"
                margin={3}
                padding={0}
                style={{ fontWeight: 700 }}
              >
                {t('dragDrop.uploadedFile')}
              </Typography>
              <Typography component="h6" variant="h6" margin={3} padding={0}>
                {t('dragDrop.noFile')}
              </Typography>
            </Box>
          ) : null}

          <Box margin={3} padding={0}>
            {!multiple &&
              images.map((image, index) => {
                return (
                  <Box key={image.name}>
                    <Box
                      p={3}
                      pt={0}
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Box
                        p={2}
                        border={(theme as any).custom.borders[0]}
                        sx={{ width: '90%', display: 'flex' }}
                      >
                        <InsertDriveFileIcon sx={{ color: '#308A7D' }} />
                        <Box pl={2}>{image.name}</Box>
                      </Box>
                      <Box
                        p={1}
                        sx={{
                          display: 'flex',
                          backgroundColor: '#f7e1e0',
                          width: '10%',
                          cursor: 'pointer',
                        }}
                        onClick={() => removeImage(index)}
                      >
                        <DeleteOutlineIcon
                          sx={{ marginLeft: 1, color: 'red', margin: 'auto' }}
                        />
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
                    p={3}
                    pb={1}
                    pt={0}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Box
                      p={2}
                      border={(theme as any).custom.borders[0]}
                      sx={{ width: '90%' }}
                    >
                      <Box display={'flex'}>
                        <InsertDriveFileIcon sx={{ color: '#308A7D' }} />
                        <Box pl={2}>{image.name}</Box>
                      </Box>
                      <Box sx={{ display: 'flex' }} mt={2}>
                        {attachmentTypes ? (
                          <ValidatedSelect
                            validate={required}
                            defaultValue={attachmentTypes[0].codice}
                            errorMessage={
                              t(
                                'dragDrop.errors.tipoAllegatoRequired'
                              ) as string
                            }
                            name={`tipoAllegato_${index}`}
                            fullWidth
                          >
                            {attachmentTypes &&
                              attachmentTypes.map((att) => (
                                <MenuItem key={att.id!} value={att.codice!}>
                                  {att.descrizione}
                                </MenuItem>
                              ))}
                          </ValidatedSelect>
                        ) : (
                          <></>
                        )}
                      </Box>
                    </Box>
                    <Box
                      p={1}
                      onClick={() => removeImage(index)}
                      sx={{
                        display: 'flex',
                        backgroundColor: '#f7e1e0',
                        width: '10%',
                        cursor: 'pointer',
                      }}
                    >
                      <DeleteOutlineIcon
                        sx={{ marginLeft: 1, color: 'red', margin: 'auto' }}
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
