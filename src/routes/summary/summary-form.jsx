import { useState } from "react";
import { Form, Button, OverlayTrigger, Popover } from "react-bootstrap";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";

const popover = (
    <Popover id="popover-basic">
        <Popover.Content>
            No icecream will actually be delivered
        </Popover.Content>
    </Popover>
);

export default function SummaryForm({ setOrderPhase }) {
    const [checked, setChecked] = useState(false);
    return (
        <Form>
            <Form.Group>
                <FormCheckLabel htmlFor={"checkbox"}>
                    I agree to{" "}
                    <OverlayTrigger
                        overlay={popover}
                        placement={"right"}
                        delay={100}
                    >
                        <a style={{ textDecoration: "underline" }}>
                            terms and conditions
                        </a>
                    </OverlayTrigger>
                </FormCheckLabel>
                <Form.Check
                    id={"checkbox"}
                    type={"checkbox"}
                    onChange={(e) => setChecked(e.target.checked)}
                    checked={checked}
                />
            </Form.Group>
            <Button
                onClick={() => setOrderPhase()}
                type={"submit"}
                disabled={!checked}
            >
                Confirm order
            </Button>
        </Form>
    );
}
