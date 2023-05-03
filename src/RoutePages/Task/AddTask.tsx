import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaQuestionCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';
import { Developer } from '../Developer/Developer';
import { Task } from './Task';
import { title } from 'process';
import { useNavigate } from 'react-router-dom';

const AddTask: React.FC = () => {

    const [developersData, setDevelopersData] = useState<Developer[]>([]);
    const navigate = useNavigate();

    const [task, setTask] = useState<Task>({ title: '', description: '', priority : '', estimatedTime: 0, developerId: 'Select-Developer', managerId: '' });

    const handleChange = (e: any) => {
        setTask({ ...task, [e.name]: e.value });
    };

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    const managerId = user.userId;

    const setDevelopers = () => {

        axios.get('https://localhost:44316/api/Developer/GetAllDevelopers')
            .then(res => {
                setDevelopersData(res.data)
            })
            .catch(err => console.log(err))
    }

    const addTask = () => {
        
        task.managerId = managerId;
        console.log('Manager Id --- '+managerId);

        if (task.title !== '' && task.description !== '', task.developerId !== '') {

            axios.post('https://localhost:44316/api/Task/AddTask', task)
                .then((res) => {
                    console.log(res.data.data)
                    setFieldDefault()
                    navigate("/manager/dashboard");
                })
                .catch(function (error) {
                    console.log(error);
                });
            console.log(task);
        }
    }

    function setFieldDefault() {
        setTask({ ...task, ['title']: '' });
        setTask({ ...task, ['description']: '' });
        setTask({ ...task, ['developerId']: '' });
        setTask({ ...task, ['priority']: '' });
        setTask({ ...task, ['estimatedTime']: 0 });
   }

    useEffect(() => {
        setDevelopers();
    }, []);

    return (
        <div className="shadow container bg-grey">
            <div className="text-center mt-2">
                <h4>Add Task</h4>
            </div>
            <Form>
                <Form.Group className="p-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="John Doe" name="title" onChange={(e) => handleChange(e.target)} required />
                    {task.title == "" ? <p className="text-danger font-weight-bold">Please enter Title</p> : null}
                </Form.Group>

                <Form.Group className="p-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" onChange={(e) => handleChange(e.target)} required />
                    {task.description == "" ? <p className="text-danger font-weight-bold">Please enter Description</p> : null}
                </Form.Group>

                <Form.Group className="p-3" controlId="exampleForm.ControlInput1">
                    <div className='d-flex justify-content-between'>
                        <div className='p-1 w-50'>
                            <Form.Label>Select Priority</Form.Label>
                            <Form.Select aria-label="Matter priority" defaultValue="Select-Priority" name="priority" onChange={(e) => handleChange(e.target)}>
                                <option value="Select-Priority" disabled>Select-Priority</option>
                                <option value="High"><h5><FaArrowUp /> High</h5></option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                                {task.priority == "Select-Priority" ? <p className="text-danger font-weight-bold">Please Select Priority</p> : null}
                            </Form.Select>
                        </div>
                        <div className='p-1 w-50'>
                            <Form.Label>Enter Estimated Time</Form.Label>
                            <Form.Control type="text" placeholder='in hours' name="estimatedTime" onChange={(e) => handleChange(e.target)} required />
                        </div>
                    </div>
                </Form.Group>

                <Form.Group className="p-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Assign Developer <FaQuestionCircle /> </Form.Label>
                    <Form.Select aria-label="Developer" name="developerId"
                        defaultValue="Select-Developer" onChange={(e) => handleChange(e.target)}>
                        <option value="Select-Developer">Select-Developer</option>
                        {developersData.map((item: Developer) => {
                            return (<option key={item.id} value={item.id} >
                                {item.firstName} {item.lastName}
                            </option>);
                        })}
                    </Form.Select>
                    {task.priority == "Select-Developer" ? <p className="text-danger font-weight-bold">Please Select Developer</p> : null}
                </Form.Group>

            </Form>
            <div className='d-flex justify-content-end'>
                <Button className='w-25 m-3' variant="primary" name="nextButton" onClick={addTask}>Submit</Button>
            </div>
        </div>
    )
}

export default AddTask;
