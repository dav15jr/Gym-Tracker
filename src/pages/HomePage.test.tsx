import { describe, expect, expectTypeOf, it, test } from "vitest";
import HomePage from "./HomePage"
import { render, screen } from "@testing-library/react";
import { AppProvider} from "../assets/AppContext";
import { MemoryRouter } from "react-router-dom";


describe("Home page render", () => {
    it("render Home header", () => {
        render(
            <MemoryRouter>
            <AppProvider>
            <HomePage /> 
            </AppProvider>
            </MemoryRouter>
        );
        expectTypeOf('div').toHaveProperty;
        expect(screen.getByTestId('home-page'));
        // screen.debug();
    });
});