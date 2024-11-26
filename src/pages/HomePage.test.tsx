import { describe, expect, expectTypeOf, it} from "vitest";
import HomePage from "./HomePage"
import { render, screen } from "@testing-library/react";
import { AppProvider} from "../assets/AppContext";
import { MemoryRouter } from "react-router-dom";


describe("Home page Rendering", () => {
    it("Check that home page renders with navbar", () => {
        render(
            <MemoryRouter>
            <AppProvider>
            <HomePage /> 
            </AppProvider>
            </MemoryRouter>
        );
        expect(screen.getByTestId('home-page'));
        expect(screen.getByTestId("navbar-container")).toBeInTheDocument();
        // screen.debug();
    });
});