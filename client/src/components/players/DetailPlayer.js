import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Image,
    Row,
    Spinner,
} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { apiUrl } from '../contexts/contants'
import SingleGoal from '../goals/SingleGoal'

const DetailPlayer = () => {
    const [player, setPlayer] = useState({})
    const [loading, setLoading] = useState(true)

    const {
        // _id,
        name,
        age,
        position,
        number,
        avatar,
        height,
        weight,
        goals,
        team,
    } = player

    let navigate = useNavigate()

    let { playerId } = useParams()

    const getPlayer = async (playerId) => {
        try {
            const response = await axios.get(
                `${apiUrl}/players/details/${playerId}`
            )
            if (response.data.success) {
                setPlayer(response.data.player)
                setLoading(false)
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    useEffect(() => getPlayer(playerId), [playerId])

    let body = null

    if (loading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        )
    } else {
        body = (
            <>
                <Row className="my-5">
                    <Button
                        variant="outline-success"
                        className="fs-4 my-2"
                        onClick={() => navigate(-1)}>
                        Trở về
                    </Button>
                    <Col xs={4}>
                        <div className="d-flex align-items-center mb-3">
                            <Image
                                src={team.logo}
                                width="180"
                                height="180"
                                roundedCircle
                                className="hover-item me-3 object-fit-cover"
                                onClick={() =>
                                    navigate(`/teams/details/${team._id}`)
                                }
                            />
                            <h3>{team.name}</h3>
                        </div>
                        <Card>
                            <Card.Img
                                className="object-fit-cover"
                                variant="top"
                                src={avatar}
                                // height="232"
                            />
                        </Card>
                    </Col>
                    <Col xs={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Thông tin cầu thủ</Card.Title>
                                <Form
                                // onSubmit={handleSubmit}
                                >
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3">
                                            Họ tên
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control
                                                type="text"
                                                placeholder="name"
                                                name="name"
                                                value={name}
                                                // onChange={onChangeUpdate}
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
                                                name="age"
                                                value={age}
                                                // onChange={onChangeUpdate}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3">
                                            Vị trí thi đấu
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control
                                                type="text"
                                                placeholder="position"
                                                name="position"
                                                value={position}
                                                // onChange={onChangeUpdate}
                                            />
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
                                                name="number"
                                                value={number}
                                                // onChange={onChangeUpdate}
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
                                                name="height"
                                                value={height}
                                                // onChange={onChangeUpdate}
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
                                                name="weight"
                                                value={weight}
                                                // onChange={onChangeUpdate}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <div className="my-4">
                        {goals.map((goal) => (
                            <Col key={goal._id} xs={12}>
                                <SingleGoal goal={goal} />
                            </Col>
                        ))}
                    </div>
                </Row>
            </>
        )
    }

    return (
        <>
            <Container>{body}</Container>
        </>
    )
}

export default DetailPlayer
