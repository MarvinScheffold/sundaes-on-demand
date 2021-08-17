import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOptions from "./scoop-options";
import ToppingOptions from "./topping-options";
import AlertBanner from "../../common/alert-banner";
import PropTypes from "prop-types";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/order-details";

Options.propTypes = {
    optionType: PropTypes.oneOf(["scoops", "toppings"]),
};

export default function Options({ optionType }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const [orderDetails, updateItemCount] = useOrderDetails();

    // optionType is 'scoops' or 'toppings'
    useEffect(() => {
        axios
            .get(`http://localhost:3030/${optionType}`)
            .then((response) => setItems(response.data))
            .catch((error) => setError(true));
    }, [optionType]);

    if (error) {
        return <AlertBanner />;
    }

    const ItemComponent =
        optionType === "scoops" ? ScoopOptions : ToppingOptions;

    const optionItems = items.map((item) => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={updateItemCount}
            optionType={optionType}
        />
    ));

    const title =
        optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

    return (
        <>
            <h2>{title}</h2>
            <p>{formatCurrency(pricePerItem[optionType])} each</p>
            <p>
                {title} total: {orderDetails.totals[optionType]}
            </p>
            <Row>{optionItems}</Row>
        </>
    );
}
