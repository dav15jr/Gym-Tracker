import { describe, expect, expectTypeOf, it } from "vitest";
import LoginPage from "./LoginPage"
import { render, screen } from "@testing-library/react";
import { useAppContext } from "../assets/AppContext";
describe("Login page render", () => {
    it("render login header", () => {
        render(<LoginPage /> , {wrapper: useAppContext});
        // expect(screen.getByTestId('login-h1-text')).toHaveTextContent("PrimeYou");
        expectTypeOf('button').toHaveProperty;
    });
});