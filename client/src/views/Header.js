import React, { useState } from 'react'
import logo from '../assets/img/Bong-da-tv-logo.png'
import { Col, Container, Form, Image, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { SidebarData } from '../components/navbar/SidebarData'

const Header = () => {
    const [search, setSearch] = useState('')

    let navigate = useNavigate()

    const onSubmit = (event) => {
        event.preventDefault()
        navigate(`/tournaments/search/${search}`)
        setSearch('')
    }

    return (
        <>
            <Container>
                <Row className="my-4">
                    <Col xs={2}>
                        <Image
                            src={logo}
                            alt=""
                            width="100%"
                            className="mt-3"
                            onClick={() => navigate('/')}
                            style={{ cursor: 'pointer' }}
                        />
                    </Col>
                    <Col className="d-flex align-items-center ms-2">
                        <Form onSubmit={onSubmit} className="input-group">
                            <input
                                type="search"
                                className="form-control rounded"
                                placeholder="Tìm giải đấu"
                                aria-label="Search"
                                aria-describedby="search-addon"
                                required
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="btn btn-outline-primary">
                                Tìm kiếm
                            </button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <div className="py-3 px-4 bg-light my-3">
                <Container>
                    <Row className="d-flex justify-content-between">
                        {SidebarData.map((item, index) => {
                            return (
                                <Col key={index}>
                                    <Link
                                        to={item.path}
                                        className="text-black text-uppercase fw-bold d-flex justify-content-center "
                                        style={{
                                            fontSize: '16px',
                                            textDecoration: 'none',
                                        }}>
                                        <span className="m-0 hover-text-red">
                                            {item.title}
                                        </span>
                                    </Link>
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Header
