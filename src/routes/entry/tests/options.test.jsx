import { render, screen } from "@testing-library/react";
import Options from "../options";

test("displays image for each scoop option from server", async () => {
    render(<Options optionType={"scoops"} />);

    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    const altTexts = scoopImages.map((img) => img.alt);
    expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping option from server", async () => {
    render(<Options optionType={"toppings"} />);

    const toppingImages = await screen.findAllByRole("img", {
        name: /topping$/i,
    });
    // We return 3 toppings with the mock service worker
    expect(toppingImages).toHaveLength(3);

    const altTexts = toppingImages.map((img) => img.alt);
    expect(altTexts).toEqual([
        "Cherries topping",
        "M&Ms topping",
        "Hot fudge topping",
    ]);
});
