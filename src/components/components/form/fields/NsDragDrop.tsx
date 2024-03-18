import { useFormField } from 'relay-forms';
import uniqueId from '../../../../util/uniqueId';
import React, { useCallback, useMemo } from 'react';
import { composeValidators, NsInput } from '../validators';
import { NsDragAndDrop, NsDragAndDropProps } from '../../NsDragAndDrop';

export type NsDragDropProps = NsInput<
  Omit<NsDragAndDropProps, 'value'>,
  File[]
>;

/**
 * Componente per l'upload di file, con dropzone e integrazione con relay-forms.
 * Supporta la validazione tramite i campi validate.
 */
export const NsDragDrop: React.FC<NsDragDropProps> = ({
  name,
  defaultValue,
  loadText,
  buttonStatus,
  validationFile,
  displayForm,
  disabled,
  validate,
  onFileLoaded,
  errorMessage,
  ...rest
}) => {
  const key = useMemo(() => name || uniqueId('v_drag-'), [name]);

  const validateCallback = useCallback(
    (v: File[]) => composeValidators(validate, errorMessage)(v),
    [validate, errorMessage]
  );

  const [{ value }, setValue] = useFormField({
    key,
    initialValue: defaultValue as File[],
    validate: validateCallback,
  });

  const setValueCallback = useCallback(
    (event: any) => {
      setValue(event);
    },
    [setValue]
  );

  React.useEffect(() => {
    if (disabled) {
      setValue(defaultValue as File[]);
    }
  }, [disabled]);

  return (
    <>
      <NsDragAndDrop
        {...rest}
        name={name}
        value={value}
        onChange={setValueCallback}
        onFileLoaded={onFileLoaded}
        loadText={loadText}
        buttonStatus={buttonStatus}
        validationFile={validationFile}
        displayForm={displayForm}
      />
    </>
  );
};
