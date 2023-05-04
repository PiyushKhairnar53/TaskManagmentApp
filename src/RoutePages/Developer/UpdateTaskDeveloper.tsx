import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaQuestionCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';
import { Developer } from './Developer';
import { Task } from '../Task/Task';
import { title } from 'process';
import { useNavigate, useLocation } from 'react-router-dom';
import { TaskUpdate } from '../Task/TaskUpdate';
import { TaskDeveloper } from '../Task/TaskDeveloper';

const UpdateTaskDeveloper: React.FC = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    const userId = user.userId;

    const navigate = useNavigate();

    const location = useLocation();

    const [title, setTitle] = useState<string>(location.state.taskTitle);
    const [description, setDescription] = useState<string>(location.state.taskDescription);
    const [priority, setPriority] = useState<string>(location.state.taskPriority);
    const [actualTime, setActualTime] = useState<any>(location.state.taskActualTime);


    const updateTask = () => {

        if (title.trim() !== "" && description.trim() !== "") {

            const updateTask: TaskDeveloper = {
                taskId: location.state.taskTaskId,
                userId: userId,
                title: title,
                description: description,
                priority: priority,
                actualTime: actualTime
            }

            axios.put(`https://localhost:44316/api/Task/UpdateTaskDeveloper`, updateTask)
                .then((res) => {
                    console.log(res.data);
                    navigate("/developer/dashboard");
                })
                .catch(function (error) {
                    console.log(error);
                    if (error.response.status === 404) {
                        console.log('Resource could not be found!');
                    } else {
                        console.log(error.message);
                    }
                });

        }
        else {
            alert("Please fill all details carefully!");
        }
    }

    function validateNumber(digit: string) {
        var re = /^[1-9]\d*$/;
        return re.test(digit);
    }


    return (
        <div className="shadow container bg-grey">
            <div className="text-center mt-2">
                <h4>Task</h4>
            </div>
            <div className='text-end m-2'>
                <label>Estimated time - {location.state.taskEstimatedTime} hrs</label>
            </div>
            <Form>
                <Form.Group className="p-3" controlId="exampleForm.ControlInput1">
                    <h6 className='d-flex justify-content-start form-label'>Title</h6>
                    <Form.Control type="text" placeholder="John Doe" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    {title == "" ? <p className="text-danger font-weight-bold">Please enter Title</p> : null}
                </Form.Group>

                <Form.Group className='p-3'
                    controlId="exampleForm.ControlTextarea1">
                    <h6 className='d-flex justify-content-start form-label'>Description</h6>
                    <Form.Control as="textarea" rows={3} name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    {description == "" ? <p className="text-danger font-weight-bold">Please enter Description</p> : null}
                </Form.Group>

                <Form.Group className='p-3' controlId="exampleForm.ControlInput1">
                    <div className='d-flex justify-content-between'>
                        <div className='p-1 w-50'>

                            <Form.Group className='p-3'
                                controlId="exampleForm.ControlTextarea1">
                                <h6 className='d-flex justify-content-start form-label'>Select Priority</h6>
                                <Form.Select aria-label="Matter priority" defaultValue={priority} name="priority" onChange={(e) => setPriority(e.target.value)}>
                                    <option value="" disabled>Select-Priority</option>
                                    <option value="High"><h5><FaArrowUp /> High</h5></option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                    {priority == '' ? <p className="text-danger font-weight-bold">Please Select Priority</p> : null}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className='p-1 w-50'>

                            <Form.Group className='p-3'
                                controlId="exampleForm.ControlTextarea1">
                                <h6 className='d-flex justify-content-start form-label'>Enter Actual Time</h6>
                                <Form.Control type="number" placeholder='in hours' name="actualTime" value={actualTime} onChange={(e) => setActualTime(e.target.value)} required />
                                {!validateNumber(actualTime) && actualTime !== "" && actualTime !== 0 ? <p className="text-danger font-weight-bold">Please enter valid Estimated time</p> : null}

                            </Form.Group>
                        </div>
                    </div>
                </Form.Group>


            </Form>
            <div className='d-flex justify-content-end'>
                <Button className='w-25 m-3' variant="primary" name="nextButton" onClick={updateTask}>Update</Button>
            </div>
        </div>
    )
}

export default UpdateTaskDeveloper;
