import { beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import LoginPage from './LoginPage';
import { render, screen } from '@testing-library/react';
import { AppProvider } from '../assets/AppContext';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
/* eslint @typescript-eslint/no-var-requires: "off" */
const renderLoginPage = () => {
    render(
        <MemoryRouter>
            <AppProvider>
                <LoginPage />
            </AppProvider>
        </MemoryRouter>
    );
};
describe('Login page tests', () => {
    beforeEach(() => {
        renderLoginPage();
    });
    it('render login header', () => {
        expect(screen.getByTestId('login-h1-text')).toHaveTextContent(
            'PrimeYou'
        );
        // screen.debug();
    });
    it('should render the login form with email and password inputs', () => {
        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Password:');
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        expect(emailInput).toHaveAttribute('type', 'email');
        expect(passwordInput).toHaveAttribute('type', 'password');
    });
    it('should render the login form with log in and register buttons', () => {
        const LogInButton = screen.getByLabelText('Log In');
        const RegisterButton = screen.getByLabelText('Register');
        expect(LogInButton).toBeInTheDocument();
        expect(RegisterButton).toBeInTheDocument();

        expect(LogInButton).toHaveAttribute('type', 'submit');
        expect(RegisterButton).toHaveAttribute('type', 'submit');
    });
    it('should render the "Forgot Password" link and modal', () => {
        const forgotPasswordLink = screen.getByText('Forgot Password ?');
        expect(forgotPasswordLink).toBeInTheDocument();
        expect(forgotPasswordLink).toHaveAttribute(
            'data-bs-target',
            '#logOffModal'
        );

        // const modal = screen.getByRole('dialog');
        // expect(modal).toBeInTheDocument();
        // expect(modal).toHaveAttribute('id', 'logOffModal');

        // const modalTitle = screen.getByText('Forgotten Your Password?');
        // expect(modalTitle).toBeInTheDocument();

        // const modalBody = screen.getByText(
        //     'Would you like us to send you a Password Reset Email?'
        // );
        // expect(modalBody).toBeInTheDocument();

        // const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        // expect(cancelButton).toBeInTheDocument();

        // const sendEmailButton = screen.getByRole('button', {
        //     name: 'Yes, Send Email',
        // });
        // expect(sendEmailButton).toBeInTheDocument();
    });

    // it('should display an error message when login fails due to incorrect credentials', async () => {
    //     const mockSignInWithEmailAndPassword = vi
    //         .fn()
    //         .mockRejectedValue({ code: 'auth/wrong-password' });
    //     vi.mock('firebase/auth', () => ({
    //         signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
    //     }));
    //     vi.spyOn(window, 'alert').mockImplementation(() => {});

    //     const emailInput = screen.getByLabelText('Email:');
    //     const passwordInput = screen.getByLabelText('Password:');
    //     const loginButton = screen.getByRole('button', { name: 'Log In' });

    //     await userEvent.type(emailInput, 'test@example.com');
    //     await userEvent.type(passwordInput, 'wrongpassword');
    //     await userEvent.click(loginButton);

    //     expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
    //         expect.anything(),
    //         'test@example.com',
    //         'wrongpassword'
    //     );
    //     expect(window.alert).toHaveBeenCalledWith(
    //         'Wrong Password, please try again.'
    //     );
    // });
    // it('should display an error message when login fails due to incorrect credentials', async () => {
    //     const mockSignInWithEmailAndPassword = vi
    //         .fn()
    //         .mockRejectedValue({ code: 'auth/wrong-password' });
    //     vi.spyOn(
    //         // eslint-disable-next-line no-undef
    //         require('firebase/auth'),
    //         'signInWithEmailAndPassword'
    //     ).mockImplementation(mockSignInWithEmailAndPassword);
    //     vi.spyOn(window, 'alert').mockImplementation(() => {});

    //     const emailInput = screen.getByLabelText('Email:');
    //     const passwordInput = screen.getByLabelText('Password:');
    //     const loginButton = screen.getByRole('button', { name: 'Log In' });

    //     await userEvent.type(emailInput, 'test@example.com');
    //     await userEvent.type(passwordInput, 'wrongpassword');
    //     await userEvent.click(loginButton);

    //     expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
    //         expect.anything(),
    //         'test@example.com',
    //         'wrongpassword'
    //     );
    //     expect(window.alert).toHaveBeenCalledWith(
    //         'Wrong Password, please try again.'
    //     );
    // });
});
