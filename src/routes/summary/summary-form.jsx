import { useState } from "react";

export default function SummaryForm() {
    const [checked, setChecked] = useState(false);
    return (
        <div>
            <label htmlFor={"checkbox"}>I agree to terms and conditions</label>
            <input
                id={"checkbox"}
                type={"checkbox"}
                onChange={(e) => setChecked(e.target.checked)}
                checked={checked}
            />
            <button disabled={!checked}>Confirm order</button>
        </div>
    );
}
