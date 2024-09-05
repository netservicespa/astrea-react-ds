import React from 'react';
import { fireEvent, render, screen, waitFor } from 'utils/test-util';
import { NsForm, NsTextInput, required } from 'src/index';
import '@testing-library/jest-dom';
import { resetForm, submitForm } from 'utils/util-functions';

describe('NsTextInput', () => {
    test('renders without errors', () => {
        renderForm(jest.fn());
        // Assert that the component renders without throwing any errors
        expect(screen.getByLabelText(fieldLabel)).toBeInTheDocument();
    });

    test('when the form is submitted, the field value is received as parameter', () => {
        const onSubmitMock = jest.fn();
        renderForm(onSubmitMock);

        const inputElement = screen.getByLabelText(fieldLabel);

        // Simulate a change event on the input element and submit
        fireEvent.change(inputElement, { target: { value } });
        submitForm();

        // Assert that the onSubmit callback has been called with the correct value
        expect(onSubmitMock).toHaveBeenCalledWith(
            expect.objectContaining({ testName: value }),
        );
    });

    test('when an invalid form is submitted, an error is shown', async () => {
        const onSubmitMock = jest.fn();
        renderForm(onSubmitMock);

        submitForm();

        // Assert that the error message is shown
        // and the onSubmit callback has not been called
        await waitFor(() => {
            expect(screen.getByText((t) => t.endsWith(errorMsg))).toBeInTheDocument();
        });
        expect(onSubmitMock).not.toHaveBeenCalled();
    });

    test('when the form is reset, the field value is cleared', () => {
        const onSubmitMock = jest.fn();
        renderForm(onSubmitMock);

        const inputElement = screen.getByLabelText(fieldLabel);

        // Simulate a change event on the input element, then reset the form
        fireEvent.change(inputElement, { target: { value } });
        expect(inputElement).toHaveValue(value);
        resetForm();

        // Assert that the input value has been cleared
        expect(inputElement).toHaveValue('');
    });

    test('when the form is reset, the error message is cleared', async () => {
        const onSubmitMock = jest.fn();
        renderForm(onSubmitMock);

        // Simulate a click event on the submit button
        submitForm();

        // Assert that the error message is shown
        await waitFor(() => {
            expect(screen.getByText((t) => t.endsWith(errorMsg))).toBeInTheDocument();
        });

        resetForm();
        // Assert that the error message is cleared
        await waitFor(() => {
            expect(screen.queryByText((t) => t.endsWith(errorMsg))).toBeNull();
        });
    });

    test('when the form is reset, the onReset callback is called', () => {
        const onResetMock = jest.fn();
        renderForm(jest.fn(), onResetMock);

        resetForm();
        // Assert that the onSubmit callback has not been called
        expect(onResetMock).toHaveBeenCalled();
    });
});

// Test constants
const fieldLabel = 'Test Label';
const fieldName = 'testName';
const errorMsg = 'Field is required';
const value = 'New Value';

// Test renderer
const renderForm = (onSubmitMock: jest.Mock, onResetMock?: jest.Mock) =>
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
