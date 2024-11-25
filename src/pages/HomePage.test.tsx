import { describe, expect, expectTypeOf, it, test } from "vitest";
import HomePage from "./HomePage"
import { render, screen } from "@testing-library/react";
import { useAppContext} from "../assets/AppContext";


describe("Home page render", () => {
    it("render Home header", () => {
        render(<HomePage/>, {wrapper: useAppContext});
        expectTypeOf('div').toHaveProperty;
        // expect(screen.getByTestId('home-page'));
    });
});