import React from 'react'
import { NavLink } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import "bootstrap/dist/css/bootstrap.min.css";


const Sidebar = () => {
    return (
        <div className="sidebar bg-dark">
            <div key={0}>

                <Dropdown className='m-2'>
                    <Dropdown.Toggle className='toggle-button bg-dark border-0 w-100' id="dropdown-basic">
                        <strong>Attorney</strong>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <NavLink to={{ pathname: '/Attorney/LastWeekBillingsByAttorney' }}
                            className="text-white">
                            <h6 className='sidebar-tab'>Last Weeks Billings</h6>
                        </NavLink>

                        <NavLink to={'/Attorney/LastWeekBillings'}
                            className="text-white">
                            <h6 className='sidebar-tab'>Last Weeks Billing For Attorney</h6>
                        </NavLink>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <hr />

            <div key={1}>
                <Dropdown className='m-2'>
                    <Dropdown.Toggle className='toggle-button bg-dark border-0 w-100' id="dropdown-basic">
                        <strong>Matter</strong>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <NavLink to={{ pathname: '/Matter/AddMatter' }}
                            className="text-white">
                            <h6 className='sidebar-tab'>Add Matter</h6>
                        </NavLink>

                        <NavLink to={'/Matter/ListMattersForClient'}
                            className="text-white">
                            <h6 className='sidebar-tab'>Show Matters for client</h6>
                        </NavLink>

                        <NavLink to={'/Matter/ListMatterByClient'}
                            className="text-white">
                            <h6 className='sidebar-tab'>Show Matters By client</h6>
                        </NavLink>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <hr />

            <div key={2}>
                <Dropdown className='m-2'>
                    <Dropdown.Toggle className='toggle-button bg-dark border-0 w-100' id="dropdown-basic">
                        <strong>Invoices</strong>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <NavLink to={{ pathname: '/Invoices/ListInvoicesForMatter' }}
                            className="text-white">
                            <h6 className='sidebar-tab'>List Invoices For Matter</h6>
                        </NavLink>

                        <NavLink to={{ pathname: '/Invoices/ListInvoicesByMatter' }}
                            className="text-white">
                            <h6 className='sidebar-tab'>List Invoices By Matter</h6>
                        </NavLink>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default Sidebar;