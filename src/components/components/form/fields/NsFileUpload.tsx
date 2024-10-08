import React, { useCallback, useMemo } from 'react';
import uniqueId from '../../../../util/uniqueId';
import { composeValidators } from '../validators';
import { useFormField } from 'relay-forms';
import { NsInputFile } from '../../NsInputFile';

/**
 * Ns File Upload Component
 * @author vadim.chilinciuc
 *
 */
export const NsFileUpload = ({
    name,
    defaultValue,
    displayForm,
    disabled,
    validate,
    onFileLoaded,
    onChange,
    errorMessage,
    ...rest
}: any) => {
    const key = useMemo(() => name || uniqueId('file_upload-'), [name]);

    const validateCallback = useCallback(
        (v: File) => composeValidators(validate, errorMessage)(v),
        [validate, errorMessage],
    );

    const [{ value }, setValue] = useFormField({
        key,
        initialValue: defaultValue as File,
        validateOnChange: true,
        validate: validateCallback,
    });

    const setValueCallback = useCallback(
        (event: any) => {
            setValue(event);
            onChange(event);
        },
        [setValue],
    );

    React.useEffect(() => {
        if (disabled) {
            setValue(defaultValue as File);
        }
    }, [disabled]);

    React.useEffect(() => {
        setValue(defaultValue as File);
    }, [defaultValue]);

    return (
        <div>
            <NsInputFile
                {...rest}
                name={name}
                value={value}
                onChange={setValueCallback}
            />
        </div>
    );
};
