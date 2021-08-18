import { useOrderDetails } from "../../contexts/order-details";
import SummaryForm from "./summary-form";

export default function OrderSummary({ setOrderPhase }) {
    const [orderDetails] = useOrderDetails();

    return (
        <div>
            <h1>Review your order</h1>
            <SummaryForm setOrderPhase={setOrderPhase} />
        </div>
    );
}
