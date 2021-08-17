import { useState } from "react";
import Container from "react-bootstrap/Container";

import OrderEntry from "./routes/entry/order-entry";

import { OrderDetailsProvider } from "./contexts/order-details";

export default function App() {
    // orderPhase needs to be 'inProgress', 'review' or 'completed'
    const [orderPhase, setOrderPhase] = useState("inProgress");

    return (
        <OrderDetailsProvider>
            <Container>
                <OrderEntry setOrderPhase={setOrderPhase} />
            </Container>
        </OrderDetailsProvider>
    );
}
