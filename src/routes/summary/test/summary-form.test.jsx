import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../summary-form";

test("checkbox is unchecked, button is disabled", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
        name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /confirm order/i });
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
});

test("checking the checkbox enables button, unchecking it disables button", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
        name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /confirm order/i });
    fireEvent.click(checkbox);
    expect(button).toBeEnabled();

    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
});
