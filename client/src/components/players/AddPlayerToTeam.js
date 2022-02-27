import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { apiUrl } from '../contexts/contants'
import SingleTeam from '../teams/SingleTeam'

const AddPlayerToTeam = () => {
    const { setAlert } = useContext(AuthContext)

    let { teamId } = useParams()

    const [newPlayer, setNewPlayer] = useState({
        name: '',
        age: '',
        position: '',
        number: '',
        avatar: '',
        height: '',
        weight: '',
        teamId,
    })
    const { name, age, position, number, avatar, height, weight } = newPlayer

    const onChangeForm = (event) => {
        setNewPlayer({
            ...newPlayer,
            [event.target.name]: event.target.value,
        })
    }

    const addPlayerToTeam = async (newPlayer) => {
        try {
            const response = await axios.post(`${apiUrl}/players`, newPlayer)
            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { success, message } = await addPlayerToTeam(newPlayer)
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
        setNewPlayer({
            name: '',
            age: '',
            position: '',
            number: '',
            avatar: '',
            height: '',
            weight: '',
            teamId,
        })
    }

    return (
        <Container className="my-container">
            <Row className="my-5">
                <Col xs={4} className="d-flex flex-column align-items-center">
                    <SingleTeam teamId={teamId} />{' '}
                </Col>
                <Col xs={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                Họ tên
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
                                Tuổi
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="age"
                                    required
                                    name="age"
                                    value={age}
                                    onChange={onChangeForm}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                Ảnh
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="avatar"
                                    required
                                    name="avatar"
                                    value={avatar}
                                    onChange={onChangeForm}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                Vị trí thi đấu
                            </Form.Label>
                            <Col sm="9">
                                <Form.Select
                                    value={position}
                                    name="position"
                                    required
                                    onChange={onChangeForm}>
                                    <option value="">-- Chọn vị trí --</option>
                                    <option value="Thủ môn">Thủ môn</option>
                                    <option value="Hậu vệ">Hậu vệ</option>
                                    <option value="Tiền vệ">Tiền vệ</option>
                                    <option value="Tiền đạo">Tiền đạo</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                Số áo
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="number"
                                    required
                                    name="number"
                                    value={number}
                                    onChange={onChangeForm}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                Chiều cao (cm)
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="height"
                                    required
                                    name="height"
                                    value={height}
                                    onChange={onChangeForm}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                Cân nặng (kg)
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="weight"
                                    required
                                    name="weight"
                                    value={weight}
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

export default AddPlayerToTeam
