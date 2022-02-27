import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { AuthContext } from '../contexts/AuthContext'
import { apiUrl } from '../contexts/contants'

const CreateTournament = () => {
    const { setAlert } = useContext(AuthContext)
    const [newTournament, setNewTournament] = useState({
        name: '',
        description: '',
        image: '',
    })
    const { name, description, image } = newTournament

    const onChangeForm = (event) => {
        setNewTournament({
            ...newTournament,
            [event.target.name]: event.target.value,
        })
    }

    const addTournament = async (newTournament) => {
        try {
            const response = await axios.post(
                `${apiUrl}/tournaments`,
                newTournament
            )
            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { success, message } = await addTournament(newTournament)
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
        setNewTournament({
            name: '',
            description: '',
            image: '',
        })
    }

    return (
        <Container className="my-container">
            <Row className="my-5">
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                Tên giải đấu
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
                                Mô tả
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    as="textarea"
                                    placeholder="description"
                                    required
                                    name="description"
                                    value={description}
                                    onChange={onChangeForm}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                Ảnh giải đấu
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="image"
                                    required
                                    name="image"
                                    value={image}
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

export default CreateTournament
