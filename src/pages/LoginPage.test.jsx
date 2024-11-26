import { describe, expect, expectTypeOf, it } from 'vitest';
import LoginPage from './LoginPage';
import { render, screen } from '@testing-library/react';
import { AppProvider } from '../assets/AppContext';
import { MemoryRouter } from 'react-router-dom';
describe('Login page render', () => {
    it('render login header', () => {
        render(
            <MemoryRouter>
                <AppProvider>
                    <LoginPage />
                </AppProvider>
            </MemoryRouter>
        );
        expect(screen.getByTestId('login-h1-text')).toHaveTextContent(
            'PrimeYou'
        );
        expectTypeOf('button');
        // screen.debug();
    });
});

