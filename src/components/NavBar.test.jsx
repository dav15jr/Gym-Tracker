import { describe,  expect,  expectTypeOf,  it } from "vitest";
import NavBar from "./NavBar";
import { render, screen } from "@testing-library/react";
import { useAppContext } from "../assets/AppContext";


describe("Navbar render", () => {
    it("render Navbar", () => {
        render(<NavBar/>, {wrapper: useAppContext});
        expectTypeOf('nav').toHaveProperty('navbar');
        // expect(screen.getByTestId('navbar-container')).toHaveProperty('navbar');
        // screen.debug();
    });
});