import { beforeEach, describe, expect, expectTypeOf, it, test } from 'vitest';
import NavBar from './NavBar';
import { fireEvent, render, screen } from '@testing-library/react';
import { AppProvider } from '../assets/AppContext';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Reusable helper function to render NavBar with necessary providers
const renderNavBar = () => {
    render(
        <MemoryRouter>
            <AppProvider>
                <NavBar />
            </AppProvider>
        </MemoryRouter>
    );
};

describe('NavBar', () => {
    beforeEach(() => {
        renderNavBar();
    });
    it('Check that Navbar is rendered with nav', () => {
        expectTypeOf('nav').toHaveProperty('navbar');
        expect(screen.getByTestId('navbar-container')).toHaveClass('navbar');
        // screen.debug();
    });

    // Logo tests
    it('Should render the logo image with correct attributes', () => {
        const logoImage = screen.getByAltText('Logo');

        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('src', '/icons/favicon-32x32.png');
        expect(logoImage).toHaveAttribute('width', '30');
        expect(logoImage).toHaveAttribute('height', '30');
    });

    // Brand text tests
    it('Should display the "PrimeYou" brand text', () => {
        const brandText = screen.getByText('PrimeYou');

        expect(brandText).toBeInTheDocument();
        expect(brandText.closest('a')).toHaveClass('navbar-brand');
    });

    // Navigation link tests
    it('Should render the Home link with correct route', () => {
        const homeLink = screen.getByText('Home');

        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');
        expect(homeLink.closest('a')).toHaveClass('nav-link');
    });

    it('Should render the Progress link with correct route', () => {
        const progressLink = screen.getByText('Progress');

        expect(progressLink).toBeInTheDocument();
        expect(progressLink).toHaveAttribute('href', '/progress');
        expect(progressLink.closest('a')).toHaveClass('nav-link');
    });

    it('Should include the EditProfile component in the navbar', () => {
        const editProfileElement = screen.getByTestId('edit-profile-button');
        expect(editProfileElement).toBeInTheDocument();
        expect(editProfileElement.closest('ul')).toHaveClass('navbar-nav');
    });
    it('Should include the LogOff component in the navbar', () => {
        const logOffElement = screen.getByTestId('log-off-button');
        expect(logOffElement).toBeInTheDocument();
        expect(logOffElement.closest('ul')).toHaveClass('navbar-nav');
    });
    it('Should have a menu toggle button', async () => {

        const toggleButton = screen.getByLabelText('Toggle navigation');
  
        expect(toggleButton).toBeInTheDocument();
        
        // fireEvent.click(toggleButton);
        // expect(navbarCollapse).toHaveClass('show');

        // fireEvent.click(toggleButton);
        // expect(navbarCollapse).not.toHaveClass('show');
    });
});
