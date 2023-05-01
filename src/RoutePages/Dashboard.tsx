import React from "react";
import '../index'
import '../App'
import "bootstrap/dist/css/bootstrap.min.css";
import { Card,Button } from "react-bootstrap";

const Dashboard = () =>{
    return (
        <div>
            <Card className="card-main">
                <div className="card-class">
                <Card.Body className="mt-3">
                    <Card.Title>Faster Chekout</Card.Title>
                    <article>
                        Some quick example text to build on the card <br></br>
                        title and make up the bulk of the card's content.<br></br>
                        Some quick example text to build on the card <br></br>
                        title and make up the bulk of the card's content.<br></br>
                        Some quick example text to build on the card <br></br>
                        title and make up the bulk of the card's content.
                    </article>
                </Card.Body>
                
                </div>
            </Card>

            <div className="card-class">
            <Card.Body className="mb-4">
                <Card.Title>Faster Chekout</Card.Title>
                <article>
                    Some quick example text to build on the card
                    title and make up the bulk of the card's content.
                    Some quick example text to build on the card <br></br>
                    title and make up the bulk of the card's content.
                    Some quick example text to build on the card
                    title and make up the bulk of the card's content.
                </article>
            </Card.Body>
            </div>

            <div className="d-flex justify content between">
                <Card className="card-text shadow">
                    <div className="card-class">
                        <Card.Body className="mb-4">
                            <Card.Title>Faster Chekout</Card.Title>
                            <article>
                                Some quick example text to build <br></br> on the card
                                title and make up the bulk of the <br></br> card's content.
                                Some quick example <br></br> text to build on the card <br></br>
                            </article>
                        </Card.Body>
                    </div>
                </Card>

                <Card className="card-text shadow">
                    <div className="card-class">
                        <Card.Body className="mb-4">
                            <Card.Title>Faster Chekout</Card.Title>
                            <article>
                                Some quick example text to build <br></br> on the card
                                title and make up the bulk of the <br></br> card's content.
                                Some quick example <br></br> text to build on the card
                            </article>
                        </Card.Body>
                    </div>
                </Card>

                <Card className="card-text shadow mb-3">
                    <div className="card-class">
                        <Card.Body>
                            <Card.Title>Faster Chekout</Card.Title>
                            <article>
                                Some quick example text to build <br></br> on the card
                                title and make up the bulk of the <br></br> card's content.
                                Some quick example <br></br> text to build on the card
                            </article>
                        </Card.Body>
                    </div>
                </Card>
            </div>

            <div className="d-flex justify content between">
                <Card className="card-text shadow">
                    <div className="card-class">
                        <Card.Body className="mb-4">
                            <Card.Title>Faster Chekout</Card.Title>
                            <article>
                                Some quick example text to build <br></br> on the card
                                title and make up the bulk of the <br></br> card's content.
                                Some quick example <br></br> text to build on the card <br></br>
                            </article>
                        </Card.Body>
                    </div>
                </Card>

                <Card className="card-text shadow">
                    <div className="card-class">
                        <Card.Body className="mb-4">
                            <Card.Title>Faster Chekout</Card.Title>
                            <article>
                                Some quick example text to build <br></br> on the card
                                title and make up the bulk of the <br></br> card's content.
                                Some quick example <br></br> text to build on the card
                            </article>
                        </Card.Body>
                    </div>
                </Card>

                <Card className="card-text shadow mb-3">
                    <div className="card-class">
                        <Card.Body>
                            <Card.Title>Faster Chekout</Card.Title>
                            <article>
                                Some quick example text to build <br></br> on the card
                                title and make up the bulk of the <br></br> card's content.
                                Some quick example <br></br> text to build on the card
                            </article>
                        </Card.Body>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Dashboard