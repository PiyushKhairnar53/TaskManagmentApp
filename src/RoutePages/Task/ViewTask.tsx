import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaQuestionCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';
import { Developer } from '../Developer/Developer';
import { Task } from './Task';
import { title } from 'process';
import { useNavigate } from 'react-router-dom';

const ViewTask: React.FC = () => {

    return (
        <div className="shadow container bg-grey">
            <div className="text-center mt-2">
                <h4>Task</h4>
            </div>
            <div className='d-flex justify-content-end'>
                <Button className='w-25 m-3' variant="primary" name="nextButton">Submit</Button>
            </div>
        </div>
    )
}

export default ViewTask;
