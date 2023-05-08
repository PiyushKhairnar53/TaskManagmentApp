import { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaQuestionCircle } from 'react-icons/fa';
import axios from 'axios';
import { title } from 'process';

interface IModal {
    ShowModal: any,
    TaskId: number,
    Title: string,
    StatusId: number
}

interface Status{
    taskId:number,
    userId:string,
    statusId:number
}

const ChangeStatusModal: React.FC<IModal> = ({ ShowModal, TaskId, Title, StatusId }) => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    const userId = user.userId;


    const [newStatus, setNewStatus] = useState<Status>({ taskId:TaskId,statusId:StatusId,userId:userId});

    const handleChange = (e: any) => {
        setNewStatus({ ...newStatus, [e.name]: e.value });
    };

    const CloseModal = () =>{
        ShowModal(false);
    }

    const submitNewStatus = () =>{
      
        if(newStatus.statusId != StatusId){
            console.log("new status"+newStatus);
            axios.put('https://localhost:44316/api/Task/UpdateTaskStatus', newStatus)
            .then((res) => {
                console.log(res.data.data)
                CloseModal();
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>{Title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="p-3">
                        <Form.Label>Select Status <FaQuestionCircle /> </Form.Label>
                        <Form.Select aria-label="Select-Status" name="statusId"
                            defaultValue=""  onChange={(e) => handleChange(e.target)} required>
                            <option value="" disabled>Select New Status</option>
                            <option value="1" disabled={StatusId == 1}>To do</option>
                            <option value="2" disabled={StatusId == 2}>In Progress</option>
                            <option value="3" disabled={StatusId == 3}>Code review</option>
                            <option value="4" disabled={StatusId == 4}>Completed</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={CloseModal}>
                    Close
                </Button>
                <Button type='submit' variant="primary" onClick={submitNewStatus}>
                    Submit
                </Button>
            </Modal.Footer>
        </div>
    )
}

export default ChangeStatusModal;
