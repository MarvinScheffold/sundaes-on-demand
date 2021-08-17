import { render, screen } from "../../../testing-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../options";
import { OrderDetailsProvider } from "../../../contexts/order-details";
import { pricePerItem } from "../../../constants";

test("update scoop subtotal when scoop selection changes", async () => {
    render(<Options optionType={"scoops"} />);

    // Make sure subtotal is 0.00 at beginning
    const scoopsSubtotal = screen.getByText(/Scoops total/i);
    expect(scoopsSubtotal).toHaveTextContent("0.00");

    // Update vanilla scoops to 1 and check subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
        name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(scoopsSubtotal).toHaveTextContent(pricePerItem.scoops.toString());

    // Update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole("spinbutton", {
        name: /chocolate/i,
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(scoopsSubtotal).toHaveTextContent(
        (pricePerItem.scoops * 3).toString()
    );
});

test("update toppings subtotal when topics selection changes", async () => {
    render(<Options optionType={"toppings"} />);

    // make sure subtotal is at 0.00 at beginning
    const toppingsSubtotal = screen.getByText(/Toppings total/i);
    expect(toppingsSubtotal).toHaveTextContent("0.00");

    // select m&m topping and check subtotal
    const mandmCheckbox = await screen.findByRole("checkbox", { name: /m&m/i });
    userEvent.click(mandmCheckbox);
    expect(toppingsSubtotal).toHaveTextContent(
        pricePerItem.toppings.toString()
    );

    // select cherries topping and check subtotal again
    const cherrieCheckbox = await screen.findByRole("checkbox", {
        name: /cherrie/i,
    });
    userEvent.click(cherrieCheckbox);
    expect(toppingsSubtotal).toHaveTextContent(
        (pricePerItem.toppings * 2).toString()
    );

    // now deselect mandm topping and check again
    userEvent.click(mandmCheckbox);
    expect(toppingsSubtotal).toHaveTextContent(
        pricePerItem.toppings.toString()
    );
});
