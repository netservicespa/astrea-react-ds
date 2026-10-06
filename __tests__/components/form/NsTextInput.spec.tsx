import React from 'react';
import { describe, expect, test, vi, type Mock } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@test/utils/test-util';
import { resetForm, submitForm } from '@test/utils/util-functions';
import { NsForm, NsTextInput, required } from '@/index';

describe('NsTextInput', () => {
    test('renders without errors', () => {
        renderForm(vi.fn());
        expect(screen.getByLabelText(fieldLabel)).toBeInTheDocument();
    });

    test('when the form is submitted, the field value is received as parameter', () => {
        const onSubmitMock = vi.fn();
        renderForm(onSubmitMock);

        const inputElement = screen.getByLabelText(fieldLabel);
        fireEvent.change(inputElement, { target: { value } });
        submitForm();

        expect(onSubmitMock).toHaveBeenCalledWith(
            expect.objectContaining({ testName: value }),
        );
    });

    test('when an invalid form is submitted, an error is shown', async () => {
        const onSubmitMock = vi.fn();
        renderForm(onSubmitMock);
        submitForm();

        await waitFor(() => {
            expect(screen.getByText((text) => text.endsWith(errorMsg))).toBeInTheDocument();
        });
        expect(onSubmitMock).not.toHaveBeenCalled();
    });

    test('when the form is reset, the field value is cleared', () => {
        const onSubmitMock = vi.fn();
        renderForm(onSubmitMock);

        const inputElement = screen.getByLabelText(fieldLabel);
        fireEvent.change(inputElement, { target: { value } });
        expect(inputElement).toHaveValue(value);
        resetForm();
        expect(inputElement).toHaveValue('');
    });

    test('when the form is reset, the error message is cleared', async () => {
        const onSubmitMock = vi.fn();
        renderForm(onSubmitMock);
        submitForm();

        await waitFor(() => {
            expect(screen.getByText((text) => text.endsWith(errorMsg))).toBeInTheDocument();
        });

        resetForm();
        await waitFor(() => {
            expect(screen.queryByText((text) => text.endsWith(errorMsg))).toBeNull();
        });
    });

    test('when the form is reset, the onReset callback is called', () => {
        const onResetMock = vi.fn();
        renderForm(vi.fn(), onResetMock);

        resetForm();
        expect(onResetMock).toHaveBeenCalled();
    });
});

const fieldLabel = 'Test Label';
const fieldName = 'testName';
const errorMsg = 'Field is required';
const value = 'New Value';

const renderForm = (onSubmitMock: Mock, onResetMock?: Mock) =>
    render(
        <NsForm onSubmit={onSubmitMock} onReset={onResetMock}>
            <NsTextInput
                name={fieldName}
                label={fieldLabel}
                validate={required}
                errorMessage={errorMsg}
                disabled={false}
                onChange={onSubmitMock}
            />
        </NsForm>,
    );
