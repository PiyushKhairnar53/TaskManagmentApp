import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddTask: React.FC = () => {

    return (
        <div className="shadow container shadow">
            <div className="text-center mt-2">
                <h4>Matter</h4>
            </div>
            <Form>
                <Form.Group className="p-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title </Form.Label>
                    <Form.Control type="text" placeholder="John Doe" name="title" required />
                </Form.Group>

                <Form.Group className="p-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description </Form.Label>
                    <Form.Control as="textarea" rows={3} name="description"  required />

                </Form.Group>

                <Form.Group className="p-3" controlId="exampleForm.ControlInput1">
                    <div className='d-flex justify-content-between'>
                        <div className='p-1 w-50'>
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Matter Category" defaultValue="Select-Category" name="category" >
                                <option value="Select Category" disabled>Select Category</option>
                                <option value="Criminal">Criminal</option>
                                <option value="Accident">Accident</option>
                                <option value="Road rage">Road rage</option>
                                <option value="Compensation">Compensation</option>
                                <option value="Marriage">Marriage</option>
                                <option value="Rent">Rent</option>
                                <option value="Land and Agriculture">Land and Agriculture</option>
                            </Form.Select>
                        </div>

                    </div>
                </Form.Group>
            </Form>
            <div className='d-flex justify-content-end'>
                <Button className='w-25 m-3' variant="primary" name="nextButton" >Submit</Button>
            </div>
        </div>
    )
}

export default AddTask;
