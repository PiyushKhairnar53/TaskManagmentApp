import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaQuestionCircle } from 'react-icons/fa';
import { User } from '../User/User';
import axios from 'axios';

interface IModal{
    ShowModal: (show:boolean) => void;
  }

const ChangeStatusModal:React.FC<IModal> = ({ShowModal}) => {
    const [show, setShow] = useState(false);
    
    const handleClose = () => {
        setShow(false);
        ShowModal(false);
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

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>

        </div>
    )

}

export default ChangeStatusModal;
