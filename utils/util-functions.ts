import { fireEvent, screen } from 'utils/test-util';

export function resetForm() {
    // Simulate a click event on the reset button
    const resetButton = screen.getByRole('button', { name: /reset|clear/i });
    fireEvent.click(resetButton);
}

export function submitForm() {
    // Simulate a click event on the submit button
    const submitButton = screen.getByRole('button', { name: /submit|save/i });
    fireEvent.click(submitButton);
}
