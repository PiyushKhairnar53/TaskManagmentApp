import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaQuestionCircle } from 'react-icons/fa';

const RegisterUser = () => {
    const [show, setShow] = useState(false);
    const [step, setNewStep] = useState(1);
    const [search, setSearch] = useState('');

    const handleClose = () => {
        setShow(false);
        setNewStep(1);
    }

    const nextStep = () => {
        setNewStep(step + 1);
    };

    const prevStep = () => {
        setNewStep(step - 1);
    };

    const [productName, setProuctName] = useState<string>('');
    const [productDesc, setProductDesc] = useState<string>('');
    const [productPrice, setProductPrice] = useState<number>(Number);
    const [productQty, setProductQty] = useState<number>(Number);

    function setFieldDefault() {
        setProuctName('');
        setProductDesc('');
        setProductPrice(0);
        setProductQty(0);
        setNewStep(1);
        handleClose();
    }

    const passAddItem = () => {
        // SaveProduct(productName,productDesc,productPrice,productQty);
        setFieldDefault()
    };

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>

            {step === 1 && <>
                <Modal.Body>
                    <Form>
                        <Form.Group className="p-3" controlId="exampleForm.ControlInput1">
                            <div className='d-flex justify-content-between'>
                                <div className='p-1 w-50'>
                                    <Form.Label>Enter FirstName <FaQuestionCircle /> </Form.Label>
                                    <Form.Control type="text" placeholder="John" name="firstname" />
                                </div>

                                <div className='p-1 w-50'>
                                    <Form.Label>Enter Lastname <FaQuestionCircle /> </Form.Label>
                                    <Form.Control type="text" placeholder="Doe" name="lastname" />
                                </div>
                            </div>
                        </Form.Group>

                        <Form.Group className="p-3">
                            <Form.Label>Select Role <FaQuestionCircle /> </Form.Label>
                            <Form.Select aria-label="Billing Attorney" name="billingAttorneyId"
                                defaultValue="Select-Role">
                                <option value="Select-Role" disabled>Select Role</option>
                                <option value="Manager">Manager</option>
                                <option value="Developer">Developer</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="p-3">
                            <Form.Label>Enter Phone number</Form.Label>
                            <Form.Control type="text" placeholder="+91" name="number" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" name="nextButton" onClick={nextStep}>
                        Next
                    </Button>
                </Modal.Footer>
            </>}
            {step === 2 && <>
                <Modal.Body>
                    <Form>
                        <Form.Group className="p-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Enter Username <FaQuestionCircle /> </Form.Label>
                            <Form.Control type="text" placeholder="johnDoe12" name="username" />
                        </Form.Group>

                        <Form.Group className="p-3">
                            <Form.Label>Enter Email address <FaQuestionCircle /> </Form.Label>
                            <Form.Control type="email" placeholder="johnDoe12@gmail.com" name="email" />
                        </Form.Group>

                        <Form.Group className="p-3">
                            <Form.Label>Enter Password<FaQuestionCircle /> </Form.Label>
                            <Form.Control type="password" placeholder="********" name="password" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={prevStep}>
                        Previous
                    </Button>
                    <Button type='submit' variant="primary" disabled={productPrice == 0 || productQty == 0} onClick={passAddItem}>
                        Submit
                    </Button>
                </Modal.Footer>
            </>}
        </div>
    )

}

export default RegisterUser;
