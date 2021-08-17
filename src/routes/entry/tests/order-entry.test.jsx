import { render, screen } from "../../../testing-utils/testing-library-utils";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import OrderEntry from "../order-entry";
import { OrderDetailsProvider } from "../../../contexts/order-details";

test("error statesments pop up when server responds with an error", async () => {
    // overwrite mock request handlers to cause error for this test
    server.resetHandlers([
        rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
            res(ctx.status(500));
        }),
        rest.get("http://localhost:3030/toppings", (req, res, context) => {
            res(context.status(500));
        }),
    ]);

    render(<OrderEntry />);

    const alerts = await screen.findAllByRole("alert");

    expect(alerts).toHaveLength(2);
});
