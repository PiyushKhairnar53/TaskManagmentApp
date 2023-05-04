import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaQuestionCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';
import { Developer } from '../Developer/Developer';
import { title } from 'process';
import { useNavigate } from 'react-router-dom';
import DeveloperProfileItem from './DeveloperProfileItem';

const ViewAllDevelopers: React.FC = () => {

    const [developersData, setDevelopersData] = useState<Developer[]>([]);

    const setDevelopers = () => {

        axios.get('https://localhost:44316/api/Developer/GetAllDevelopers')
            .then(res => {
                setDevelopersData(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setDevelopers();
    }, []);

    return (
        <div >
            <h4 className='text-center mt-3'>Developers</h4>
            <div className="row mx-4">
                {developersData.map((element: Developer, index) => {
                    return (
                        <div key={index} className="col-sm-3 mt-2">
                            <DeveloperProfileItem developer={element} />
                        </div>
                    )
                })
                }
            </div>

        </div>
    )
}

export default ViewAllDevelopers;
