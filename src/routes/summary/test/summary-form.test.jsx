import {
    render,
    screen,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    userEvent.click(checkbox);
    expect(button).toBeEnabled();

    userEvent.click(checkbox);
    expect(button).toBeDisabled();
});

test("popover appears on hover over terms and conditions and dissappears on unhover", async () => {
    render(<SummaryForm />);

    // check if popover is initially not there
    const popover = screen.queryByText(
        /no icecream will actually be delivered/i
    );
    expect(popover).not.toBeInTheDocument();

    // hover over terms and conditions and check if popover appears
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);
    const popoverVisible = screen.getByText(
        /no icecream will actually be delivered/i
    );
    expect(popoverVisible).toBeInTheDocument();

    // unhover terms and conditions and check if popover disappears
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
        screen.queryByText(/no icecream will actually be delivered/i)
    );
});
