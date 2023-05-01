import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../RoutePages/Dashboard";
import AddTask from "../RoutePages/AddTask";

const Navpages = () => {

    return (
        <div>
            <React.Fragment>
                <section >
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/RoutePages/AddTask" element={<AddTask />} />
                    </Routes>
                </section>
            </React.Fragment>
        </div>
    );
}

export default Navpages