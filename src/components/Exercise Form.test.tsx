import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppProvider} from "../assets/AppContext";
import Form from "./Exercise Form";


describe("Form render", () => {
    it("render Form", () => {
        render(<Form/>, {wrapper: AppProvider});
        expect(screen.getByTestId('add_exercise_button')).toHaveTextContent("Add Exercise");
        // screen.debug();
    });
});