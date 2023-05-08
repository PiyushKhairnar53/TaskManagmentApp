import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaQuestionCircle } from 'react-icons/fa';
import { User } from '../User/User';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

interface IModal{
    ShowModal: (show:boolean) => void;
  }

const RegisterUser:React.FC<IModal> = ({ShowModal}) => {
    const [show, setShow] = useState(false);
    const [step, setNewStep] = useState(1);
    const [passwordShown, setPasswordShown] = useState(false);

    const handleClose = () => {
        setShow(false);
        ShowModal(false);
    }
    const nextStep = () => {
        setNewStep(step + 1);
    };
    const prevStep = () => {
        setNewStep(step - 1);
    };

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const [user, setUser] = useState<User>({ firstName: "", lastName: "", userRole: "Select-Role", phoneNumber: "", username: "", email: "", password: ""});

    const handleChange = (e: any) => {
        setUser({ ...user, [e.name]: e.value });
    };

    const handleOnSubmitClick = () => {
        if (user.firstName !== '' && user.lastName !== '' && user.userRole !== 'Select-Role' 
                && user.username !== '' && user.email !== '' && validatePassword(user.password)) 
        {
            if(user.userRole === "Manager"){
                axios.post('https://localhost:44316/api/Authentication/RegisterManager', user)
                .then((res) => {
                    console.log(res.data)
                    toast.success('Registration Successful!', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
                console.log(user);
                ShowModal(false);
            }
            if(user.userRole === "Developer"){
                axios.post('https://localhost:44316/api/Authentication/RegisterDeveloper', user)
                .then((res) => {
                    console.log(res.data)
                    toast.success('Registration Successful!', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                })
                .catch(function (error) {
                    console.log(error);
                    toast.error('Something went wrong', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                });
                console.log(user);
                ShowModal(false);
            }
        }
        else{
            toast.warning('Please fill all mandotary fields!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    function validateName(name: string) {
        var re = /^[a-zA-Z ]+$/;
        return re.test(name);
    }
    function validatePhone(phone: string) {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(phone);
    }
    function validateEmail(email: string) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validatePassword(password:string) {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);
    }

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
                                    <Form.Control type="text" placeholder="John" name="firstName" onChange={(e) => handleChange(e.target)} required/>
                                    {user.firstName == "" ? <p className="text-danger font-weight-bold">Please enter Firstname</p> : null}
                                    {!validateName(user.firstName) && user.firstName !== "" ? <p className="text-danger font-weight-bold">Please enter valid first name</p> : null}
                                </div>

                                <div className='p-1 w-50'>
                                    <Form.Label>Enter Lastname <FaQuestionCircle /> </Form.Label>
                                    <Form.Control type="text" placeholder="Doe" name="lastName" onChange={(e) => handleChange(e.target)} required/>
                                    {user.lastName == "" ? <p className="text-danger font-weight-bold">Please enter Lastname</p> : null}
                                    {!validateName(user.lastName) && user.lastName !== "" ? <p className="text-danger font-weight-bold">Please enter valid last name</p> : null}
                                </div>
                            </div>
                        </Form.Group>

                        <Form.Group className="p-3">
                            <Form.Label>Select Role <FaQuestionCircle /> </Form.Label>
                            <Form.Select aria-label="Select-Role" name="userRole"
                                defaultValue="Select-Role" onChange={(e) => handleChange(e.target)} required>
                                <option value="Select-Role">Select-Role</option>
                                <option value="Manager">Manager</option>
                                <option value="Developer">Developer</option>
                            </Form.Select>
                            {user.userRole == "Select-Role" ? <p className="text-danger font-weight-bold">Please Select Role</p> : null}
                        </Form.Group>

                        <Form.Group className="p-3">
                            <Form.Label>Enter Phone number</Form.Label>
                            <Form.Control type="text" placeholder="+91" name="phoneNumber" onChange={(e) => handleChange(e.target)}/>
                            {!validatePhone(user.phoneNumber) && user.phoneNumber !== "" ? <p className="text-danger font-weight-bold">Please enter valid Phone number</p> : null}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" name="nextButton" onClick={nextStep} disabled={user.firstName === '' || user.lastName === '' || user.userRole === 'Select-Role'}>
                        Next
                    </Button>
                </Modal.Footer>
            </>}
            {step === 2 && <>
                <Modal.Body>
                    <Form>
                        <Form.Group className="p-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Enter Username <FaQuestionCircle /> </Form.Label>
                            <Form.Control type="text" placeholder="johnDoe12" name="username" onChange={(e) => handleChange(e.target)} required/>
                            {user.username == "" ? <p className="text-danger font-weight-bold">Please enter Username</p> : null}
                        </Form.Group>

                        <Form.Group className="p-3">
                            <Form.Label>Enter Email address <FaQuestionCircle /> </Form.Label>
                            <Form.Control type="email" placeholder="johnDoe12@gmail.com" name="email" onChange={(e) => handleChange(e.target)} required/>
                            {user.email == "" ? <p className="text-danger font-weight-bold">Please enter Email</p> : null}
                            {!validateEmail(user.email) && user.email !== "" ? <p className="text-danger font-weight-bold">Please enter valid Email id</p> : null}
                        </Form.Group>

                        <Form.Group className="p-3">
                            <Form.Label>Enter Password<FaQuestionCircle /> </Form.Label>
                            <Form.Control type={passwordShown ? "text" : "password"} placeholder="********" name="password" onChange={(e) => handleChange(e.target)} required/>
                            <div className='d-flex justify-content-between'>
                            <div>
                            {user.password == "" ? <p className="text-danger font-weight-bold">Please enter Password</p> : null}
                            {!validatePassword(user.password) && user.password !== "" ? <p className="text-danger font-weight-bold"><small>Password should contain Minimum 8 characters<br/>1 capital letter 1 Special character 1 digit</small></p> : null}
                    
                            </div>    
                            <Button variant="transparent" className="btn text-primary" onClick={togglePassword}>Show Password</Button>
                            </div>
                             </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={prevStep}>
                        Previous
                    </Button>
                    <Button type='submit' variant="primary" disabled={user.username == "" && !validateName(user.firstName) && !validateName(user.lastName) && !validatePassword(user.password) } onClick={handleOnSubmitClick}>
                        Submit
                    </Button>
                </Modal.Footer>
            </>}
            <ToastContainer />
        </div>
    )

}

export default RegisterUser;
