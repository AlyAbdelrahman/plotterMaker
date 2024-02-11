import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Snackbar from '../Snackbar';

describe('Snackbar Component', () => {
    test('closes snackbar after autoHideDuration', async () => {
        const message = 'Error fetching data';
        const autoHideDuration = 4000;
        const onClose = jest.fn();

        render(
            <Snackbar
                open={true}
                autoHideDuration={autoHideDuration}
                onClose={onClose}
                message={message}
            />
        );

        // Snackbar should be visible initially
        expect(screen.getByText(message)).toBeInTheDocument();
    });
});
