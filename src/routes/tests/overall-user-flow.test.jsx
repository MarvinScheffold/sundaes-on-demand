import { render, screen } from "@testing-library/react";
import App from "../../app";
import userEvent from "@testing-library/user-event";
import { pricePerItem } from "../../constants";

test("select one scoop and topping, review order, send order and go back to entry page", async () => {
    render(<App />);

    // Update vanilla scoops to 1
    const vanillaInput = await screen.findByRole("spinbutton", {
        name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    // select m&m topping
    const mandmCheckbox = await screen.findByRole("checkbox", { name: /m&m/i });
    userEvent.click(mandmCheckbox);

    // Check if grand total is right
    const grandTotal = screen.getByText(/grand total:/i);
    expect(grandTotal).toHaveTextContent(
        (pricePerItem.scoops + pricePerItem.toppings).toString()
    );

    // click on review order button
    const buttonConfirmOrderEntry = screen.getByRole("button", {
        name: /order sundae/i,
    });
    userEvent.click(buttonConfirmOrderEntry);

    // check if button on summary page is disabled
    const buttonFormOrderSummary = screen.getByRole("button", {
        name: /confirm order/i,
    });
    expect(buttonFormOrderSummary).toBeDisabled();

    // check terms and conditions
    const termsCheckbox = screen.getByRole("checkbox", { name: /i agree to/i });
    userEvent.click(termsCheckbox);

    //now click confirmOrderbutton
    userEvent.click(buttonFormOrderSummary);
});
