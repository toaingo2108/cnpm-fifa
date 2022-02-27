import React from 'react'
import { Container } from 'react-bootstrap'
import * as FaIcons from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="text-center text-lg-start bg-light text-muted mt-5">
            <Container>
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                        <Link to="#" className="me-4 text-reset">
                            <FaIcons.FaFacebook />
                        </Link>

                        <Link to="#" className="me-4 text-reset">
                            <FaIcons.FaTwitter />
                        </Link>
                        <Link to="#" className="me-4 text-reset">
                            <FaIcons.FaGoogle />
                        </Link>
                        <Link to="#" className="me-4 text-reset">
                            <FaIcons.FaInstagram />
                        </Link>
                        <Link to="#" className="me-4 text-reset">
                            <FaIcons.FaLinkedin />
                        </Link>
                        <a
                            href="https://github.com/toaingo2108/CNPM-HCMUS"
                            className="me-4 text-reset">
                            <FaIcons.FaGithub />
                        </a>
                    </div>
                </section>

                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <FaIcons.FaGem className="me-2" />
                                    Nhóm 1
                                </h6>
                                <div>Nhập môn công nghệ phần mềm</div>
                                <div>Đồ án thực hành</div>
                                <div>Quản lý giải đấu bóng đá</div>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Frontend
                                </h6>
                                <p>
                                    <a
                                        href="https://react-bootstrap.netlify.app/"
                                        className="text-reset">
                                        ReactJS
                                    </a>
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Backend
                                </h6>
                                <p>
                                    <Link to="#" className="text-reset">
                                        MongoDB
                                    </Link>
                                </p>
                                <p>
                                    <Link to="#" className="text-reset">
                                        NodeJS
                                    </Link>
                                </p>
                                <p>
                                    <Link to="#" className="text-reset">
                                        ExpressJS
                                    </Link>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Contact
                                </h6>
                                <p>
                                    <FaIcons.FaEnvelope className="me-1" />
                                    19120687@student.hcmus.edu.vn
                                </p>
                                <p>
                                    <FaIcons.FaEnvelope className="me-1" />
                                    19120341@student.hcmus.edu.vn
                                </p>
                                <p>
                                    <FaIcons.FaEnvelope className="me-1" />
                                    19120224@student.hcmus.edu.vn
                                </p>
                                <p>
                                    <FaIcons.FaEnvelope className="me-1" />
                                    19120422@student.hcmus.edu.vn
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>

            <div
                className="text-center p-4"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2021 Copyright:
                <a
                    className="text-reset fw-bold"
                    href="https://mdbootstrap.com/">
                    MDBootstrap.com
                </a>
            </div>
        </footer>
    )
}

export default Footer
