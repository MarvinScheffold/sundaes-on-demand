import { useState } from "react";
import Container from "react-bootstrap/Container";

import OrderEntry from "./routes/entry/order-entry";

import { OrderDetailsProvider } from "./contexts/order-details";
import OrderSummary from "./routes/summary/order-summary";
import OrderConfirmation from "./routes/confirmation/order-confirmation";

export default function App() {
    // orderPhase needs to be 'inProgress', 'review' or 'completed'
    const [orderPhase, setOrderPhase] = useState("inProgress");
    console.log("git test");

    return (
        <OrderDetailsProvider>
            <Container>
                {orderPhase === "inProgress" ? (
                    <OrderEntry setOrderPhase={setOrderPhase} />
                ) : null}
                {orderPhase === "summary" ? (
                    <OrderSummary setOrderPhase={setOrderPhase} />
                ) : null}
                {orderPhase === "completed" ? (
                    <OrderConfirmation setOrderPhase={setOrderPhase} />
                ) : null}
            </Container>
        </OrderDetailsProvider>
    );
}
