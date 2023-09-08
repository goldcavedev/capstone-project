import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

const MyFooter = () => {
    return (
        <footer className="bg-dark text-white text-center text-lg-start">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom border-light">
                <div className="me-5 d-none d-lg-block">
                    <span>Get connected with us on social networks:</span>
                </div>

                <div>
                    <a href="" className="me-4 text-reset text-white">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="" className="me-4 text-reset text-white">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="" className="me-4 text-reset text-white">
                        <FontAwesomeIcon icon={faGoogle} />
                    </a>
                    <a href="" className="me-4 text-reset text-white">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="" className="me-4 text-reset text-white">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                    <a href="" className="me-4 text-reset text-white">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
            </section>

            <section className="">
                <Container className="text-center text-md-start mt-5">
                    <Row className="mt-3">
                        <Col md="3" lg="4" xl="3" className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Indie List
                            </h6>
                            <p>
                                Keep up with the last news about indie games world!
                            </p>
                        </Col>

                        <Col md="2" lg="2" xl="2" className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                            <p>
                                <a href="#!" className="text-reset text-white">
                                    React
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset text-white">
                                    Node
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset text-white">
                                    MongoDB
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset text-white">
                                    Bootstrap
                                </a>
                            </p>
                        </Col>

                        <Col md="3" lg="2" xl="2" className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                            <p>
                                <a href="#!" className="text-reset text-white">
                                    Steam
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset text-white">
                                    Epic Games
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset text-white">
                                    Kicktarter
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset text-white">
                                    Epicode Italia
                                </a>
                            </p>
                        </Col>

                        <Col md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>Milano, MI 10012, IT</p>
                            <p>info@example.com</p>
                            <p>+ 01 234 567 88</p>
                            <p>+ 01 234 567 89</p>
                        </Col>

                    </Row>
                </Container>
            </section>
            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>© 2023 Copyright  <a className='text-reset fw-bold' href='/home'>Indie List</a></div>

        </footer >
    );
};

export default MyFooter;
