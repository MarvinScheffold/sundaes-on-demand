import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../summary-form";

test("checkbox is unchecked, button is disabled", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
        name: /I agree to Terms and Conditions/i,
    });
    const button = screen.getByRole("button", { name: /Confirm order/i });
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
});

test("checking the checkbox enables button, unchecking it disables button", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
        name: /I agree to Terms and Conditions/i,
    });
    const button = screen.getByRole("button", { name: /Confirm order/i });
    fireEvent.click(checkbox);
    expect(button).toBeEnabled();

    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
});
