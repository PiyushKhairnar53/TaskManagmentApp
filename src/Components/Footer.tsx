import React from "react";

const Footer = () => {

    return (
        <footer className="page-footer font-small blue pt-4">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                <h5 className="text-uppercase"><strong>Task Manager</strong></h5>

                    <div className="d-flex justify-content-between">
                        <div className="footer-content-left">
                            <p>Our solution can increase your productivity rapidly.<br/> We provide one of the best features in our industry<br/>Mail us on following email address - </p>
                            <address><a href="mailto:jim@rock.com">taskmanager@org.com</a></address>
                        </div> 
                        <p className="footer-content-right">Address : <br/>H-103, Sector - 9, JM Road <br/>Pune - 411049,Maharashtra<br/>India</p>
                    </div>
                    <hr className="clearfix w-100 d-md-none pb-0" />
                </div>
            </div>

            <div className="footer-copyright text-center py-3">© 2020 Copyright:
                <a href="https://mdbootstrap.com/"> TaskManager.com</a>
            </div>

        </footer>
    )
}

export default Footer