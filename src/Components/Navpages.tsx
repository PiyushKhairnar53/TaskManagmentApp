import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTask from "../RoutePages/Task/AddTask";

const Navpages = () => {

    return (
        <div>
            <React.Fragment>
                <section >
                    <Routes>
                        <Route path="task/addTask" element={<AddTask/>}/>
                    </Routes>
                </section>
            </React.Fragment>
        </div>
    );
}

export default Navpages