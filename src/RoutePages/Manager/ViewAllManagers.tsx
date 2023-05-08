import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaQuestionCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';
import { Developer } from '../Developer/Developer';
import { useNavigate } from 'react-router-dom';
import UserProfileItem from '../User/UserProfileItem';

const ViewAllManagers: React.FC = () => {

    const [managersData, setManagersData] = useState<Developer[]>([]);

    const setManagers = () => {

        axios.get('https://localhost:44316/api/Manager/GetAllManagers')
            .then(res => {
                setManagersData(res.data.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setManagers();
    }, []);

    return (
        <div >
            <h4 className='text-center mt-3'>Managers</h4>
            <div className="row mx-4">
                {managersData.map((element: Developer, index) => {
                    return (
                        <div key={index} className="col-sm-3 mt-2">
                            <UserProfileItem developer={element} userRole='Manager' />
                        </div>
                    )
                })
                }
            </div>

        </div>
    )
}

export default ViewAllManagers;
