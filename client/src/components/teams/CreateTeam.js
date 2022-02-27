import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { AuthContext } from '../contexts/AuthContext'
import { apiUrl } from '../contexts/contants'

const CreateTeam = () => {
    const { setAlert } = useContext(AuthContext)

    const [newTeam, setNewTeam] = useState({
        name: '',
        logo: '',
        trainer: '',
    })
    const { name, logo, trainer } = newTeam

    const onChangeForm = (event) => {
        setNewTeam({
            ...newTeam,
            [event.target.name]: event.target.value,
        })
    }

    const addTeam = async (newTeam) => {
        try {
            const response = await axios.post(`${apiUrl}/teams`, newTeam)
            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { success, message } = await addTeam(newTeam)
        setAlert({
            show: true,
            type: success ? 'success' : 'danger',
            message,
        })
        setTimeout(() => {
            setAlert({
                show: false,
                type: '',
                message: '',
            })
        }, 3000)
        setNewTeam({
            name: '',
            logo: '',
            trainer: '',
        })
    }

    return (
        <Container className="my-container">
            <Row className="my-5">
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                Tên đội bóng
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={onChangeForm}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                Logo đội
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="logo"
                                    required
                                    name="logo"
                                    value={logo}
                                    onChange={onChangeForm}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                Tên huấn luyện viên
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="trainer"
                                    required
                                    name="trainer"
                                    value={trainer}
                                    onChange={onChangeForm}
                                />
                            </Col>
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button
                                variant="primary"
                                type="submit"
                                size="lg"
                                className="fs-4 px-5 my-3">
                                Xác nhận
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CreateTeam
