import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaQuestionCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';
import { Developer } from '../Developer/Developer';
import { Task } from './Task';
import { title } from 'process';
import { useNavigate, useLocation } from 'react-router-dom';
import { TaskUpdate } from './TaskUpdate';
import { ToastContainer, toast } from 'react-toastify';

const AddTask: React.FC = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    const managerId = user.userId;

    const [developersData, setDevelopersData] = useState<Developer[]>([]);
    const navigate = useNavigate();

    var buttonName = 'Submit';
    var taskId: number = 0;
    var taskTitle: string = '';
    var taskDescription: string = '';
    var taskPriority: string = 'Select-Priority';
    var taskEstimatedTime: number = 0;
    var taskDeveloperId: string = '';
    var taskActualTime: number = 0;

    const location = useLocation();
    if (location.state != null) {
        console.log(location.state.taskTitle);
        if (location.state.taskTaskId != null && location.state.taskTitle != null && location.state.taskDeveloperId != null) {
            buttonName = 'Update';
            taskId = location.state.taskTaskId
            taskTitle = location.state.taskTitle
            taskDescription = location.state.taskDescription
            taskPriority = location.state.taskPriority
            taskEstimatedTime = location.state.taskEstimatedTime
            taskDeveloperId = location.state.taskDeveloperId
            taskActualTime = location.state.taskActualTime
        }
    }

    const [title, setTitle] = useState<string>(taskTitle);
    const [description, setDescription] = useState<string>(taskDescription);
    const [priority, setPriority] = useState<string>(taskPriority);
    const [estimatedTime, setEstimatedTime] = useState<any>(taskEstimatedTime);
    const [developerId, setDeveloperId] = useState<string>(taskDeveloperId);
    const [actualTime, setActualTime] = useState<any>(taskActualTime);


    const setDevelopers = () => {

        axios.get('https://localhost:44316/api/Developer/GetAllDevelopers')
            .then(res => {
                setDevelopersData(res.data.data)
            })
            .catch(err => console.log(err))
    }

    const addTask = () => {

        if (title.trim() !== "" && description.trim() !== "" && developerId !== "" && estimatedTime > 0 && priority.trim() !== "Select-Priority") {

            console.log('task if -- ' + taskId);
            console.log('title if -- ' + title);
            console.log('description if -- ' + description);
            console.log('developer if -- ' + developerId);
            console.log('estimated if -- ' + estimatedTime);
            console.log('priority if -- ' + priority);
            console.log('actual if -- ' + actualTime);


            if (buttonName == 'Submit') {

                const newTask: Task = {
                    title: title,
                    description: description,
                    priority: priority,
                    estimatedTime: estimatedTime,
                    managerId: managerId,
                    developerId: developerId
                }

                axios.post('https://localhost:44316/api/Task/AddTask', newTask)
                    .then((res) => {
                        console.log(res.data.data)
                        navigate("/manager/dashboard");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                console.log(newTask);
            }

            if (buttonName == 'Update') {

                const updateTask: TaskUpdate = {
                    taskId: taskId,
                    userId: managerId,
                    title: title,
                    description: description,
                    priority: priority,
                    developerId: developerId,
                    estimatedTime: estimatedTime,
                    actualTime: actualTime
                }

                axios.put(`https://localhost:44316/api/Task/UpdateTask`, updateTask)
                    .then((res) => {
                        console.log(res.data);
                        navigate("/manager/dashboard");
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
        }
        else {
            toast.warning('Please fill all mandotary fields!', {
                position: toast.POSITION.TOP_RIGHT});
        }
    }

    function validateNumber(digit: any) {
        var re = /^[1-9]\d*$/;
        return re.test(digit);
    }

    useEffect(() => {
        setDevelopers();
    }, []);

    return (
        <div className="shadow container bg-grey">
            <div className="text-center mt-2">
                <h4>Task</h4>
            </div>
            <Form>
                <Form.Group className="p-3" controlId="exampleForm.ControlInput1">
                    <h6 className='d-flex justify-content-start form-label'>Title</h6>
                    <Form.Control type="text" placeholder="Add User Registration" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    {title == "" ? <p className="text-danger font-weight-bold">Please enter Title</p> : null}
                </Form.Group>

                <Form.Group className='p-3'
                    controlId="exampleForm.ControlTextarea1">
                    <h6 className='d-flex justify-content-start form-label'>Description</h6>
                    <Form.Control as="textarea" rows={3} placeholder='Registration feature in ABC application' name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    {description == "" ? <p className="text-danger font-weight-bold">Please enter Description</p> : null}
                </Form.Group>

                {(user.role == "Manager") && (
                    <>
                <Form.Group className='p-3' controlId="exampleForm.ControlInput1">
                    <div className='d-flex justify-content-between'>
                        <div className='p-1 w-50'>

                            <h6 className='d-flex justify-content-start form-label'>Assign Developer <FaQuestionCircle /> </h6>
                            <Form.Select aria-label="Select-Developer" name="developerId"
                                defaultValue="Select-Developer" onChange={(e) => setDeveloperId(e.target.value)}>
                                <option value="Select-Developer" disabled>Select-Developer</option>
                                {developersData.map((item: Developer) => {
                                    return (<option key={item.id} value={item.id} disabled={item.id == developerId} >
                                        {item.firstName} {item.lastName}</option>);
                                })}
                            </Form.Select>
                            {developerId == "" ? <p className="text-danger font-weight-bold">Please Select Developer</p> : null}


                        </div>
                        <div className='p-1 w-50'>
                            <h6 className='d-flex justify-content-start form-label'>Enter Estimated Time</h6>
                            <Form.Control type="number" placeholder='in hours' name="estimatedTime" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} required />
                            {estimatedTime == "" ? <p className="text-danger font-weight-bold">Please enter Estimated Time</p> : null}
                            {!validateNumber(estimatedTime) && estimatedTime !== "" && estimatedTime !== 0 ? <p className="text-danger font-weight-bold">Please enter valid Estimated time</p> : null}

                        </div>
                    </div>
                </Form.Group>
                </>)}

                <Form.Group className='p-3'
                    controlId="exampleForm.ControlTextarea1">
                    <h6 className='d-flex justify-content-start form-label'>Select Priority</h6>
                    <Form.Select aria-label="Matter priority" defaultValue={priority} name="priority" onChange={(e) => setPriority(e.target.value)}>
                        <option value="Select-Priority" disabled>Select-Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Form.Select>
                    {priority == "Select-Priority" ? <p className="text-danger font-weight-bold">Please Select Priority</p> : null}
                </Form.Group>

                {(buttonName == "Update") && (
                    <>
                        <Form.Group className='p-3'
                            controlId="exampleForm.ControlTextarea1">
                            <h6 className='d-flex justify-content-start form-label'>Enter Actual Time</h6>
                            <Form.Control type="number" placeholder='in hours' name="actualTime" value={actualTime} onChange={(e) => setActualTime(e.target.value)} required />
                            {!validateNumber(actualTime) && actualTime !== "" && actualTime !== 0 ? <p className="text-danger font-weight-bold">Please enter valid Actual time</p> : null}

                        </Form.Group>
                    </>)

                }

            </Form>
            <div className='d-flex justify-content-end'>
                <Button className='w-25 m-3' variant="primary" name="nextButton" onClick={addTask}>{buttonName}</Button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddTask;
