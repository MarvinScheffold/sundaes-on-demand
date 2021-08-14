import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function SummaryForm() {
    const [checked, setChecked] = useState(false);
    return (
        <Form>
            <Form.Group>
                <Form.Check
                    id={"checkbox"}
                    type={"checkbox"}
                    onChange={(e) => setChecked(e.target.checked)}
                    checked={checked}
                    label={"I agree to terms and conditions"}
                />
            </Form.Group>
            <Button type={"submit"} disabled={!checked}>
                Confirm order
            </Button>
        </Form>
    );
}
