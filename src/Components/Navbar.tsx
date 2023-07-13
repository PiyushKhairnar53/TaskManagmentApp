import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import RegisterUser from "../RoutePages/Authentication/RegisterUser";
import { FaCheckCircle } from "react-icons/fa";

const Navbar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setNewStep(1);
  }

  const closeModal = (showValue: boolean) => {
    setShow(showValue);
  }

  const handleShow = () => setShow(true);

  const [step, setNewStep] = useState(1);

  return (
    <React.Fragment>
      <nav className="navbar">
        <h4 className="navbar-title text-white"><FaCheckCircle className="check-logo-navbar" /> Task Manager</h4>
        <div className="m-2">
          <Button variant="transparent" className="btn text-white pr-2" onClick={handleShow}><strong>Register</strong></Button>
        </div>
      </nav>
      <Modal show={show} onHide={handleClose}>
        <RegisterUser ShowModal={closeModal} />
      </Modal>
    </React.Fragment>
  );
};

export default Navbar;