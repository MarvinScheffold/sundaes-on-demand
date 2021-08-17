import { render, screen } from "../../../testing-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../options";
import { OrderDetailsProvider } from "../../../contexts/order-details";

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
    expect(scoopsSubtotal).toHaveTextContent("2.00");

    // Update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole("spinbutton", {
        name: /chocolate/i,
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(scoopsSubtotal).toHaveTextContent("6.00");
});
