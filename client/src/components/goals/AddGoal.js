import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { apiUrl } from '../contexts/contants'

const AddGoal = () => {
    const { setAlert } = useContext(AuthContext)

    const [scheduler, setScheduler] = useState({})
    const [loading, setLoading] = useState(true)
    const [players, setPlayers] = useState([])

    let { schedulerId } = useParams()

    let navigate = useNavigate()

    const [newGoal, setNewGoal] = useState({
        schedulerId,
        teamId: '',
        playerId: '',
        videoId: '',
        atTime: '',
    })

    const { team1, team2 } = scheduler
    const { teamId, playerId, videoId, atTime } = newGoal

    const getPlayersOfTeam = async (teamId) => {
        try {
            const response = await axios.get(`${apiUrl}/players/${teamId}`)
            if (response.data.success) {
                setPlayers(response.data.players)
                setLoading(false)
            }
            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    const getScheduler = async (schedulerId) => {
        try {
            const response = await axios.get(
                `${apiUrl}/schedulers/details/${schedulerId}`
            )
            if (response.data.success) {
                setScheduler(response.data.scheduler)
                setLoading(false)
            }
            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    const onChangeForm = (event) => {
        setNewGoal({
            ...newGoal,
            [event.target.name]: event.target.value,
        })
    }

    const addGoal = async (newGoal) => {
        try {
            const response = await axios.post(`${apiUrl}/goals`, newGoal)
            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { success, message } = await addGoal(newGoal)
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
        setNewGoal({
            schedulerId,
            teamId: '',
            playerId: '',
            videoId: '',
            atTime: '',
        })
    }

    useEffect(() => getScheduler(schedulerId), [schedulerId])
    useEffect(() => getPlayersOfTeam(teamId), [teamId])

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
                        className="fs-4 mb-4"
                        onClick={() => navigate(-1)}>
                        Trở về
                    </Button>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="3">
                                    Lịch đấu
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        placeholder="schedulerId"
                                        required
                                        name="schedulerId"
                                        value={schedulerId}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="3">
                                    Đội bóng
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Select
                                        value={teamId}
                                        name="teamId"
                                        required
                                        onChange={onChangeForm}>
                                        <option value="">
                                            --Chọn đội bóng--
                                        </option>
                                        <option value={team1._id}>
                                            {team1.name}
                                        </option>
                                        <option value={team2._id}>
                                            {team2.name}
                                        </option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="3">
                                    Cầu thủ
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Select
                                        value={playerId}
                                        name="playerId"
                                        required
                                        onChange={onChangeForm}>
                                        <option value="">
                                            --Chọn cầu thủ--
                                        </option>
                                        {players.map((player) => (
                                            <option
                                                key={player._id}
                                                value={player._id}>
                                                {player.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="3">
                                    Phút ghi bàn
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        placeholder="atTime"
                                        required
                                        name="atTime"
                                        value={atTime}
                                        onChange={onChangeForm}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="3">
                                    VideoID
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        placeholder="videoId"
                                        required
                                        name="videoId"
                                        value={videoId}
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
            </>
        )
    }

    return <Container className="my-container">{body}</Container>
}

export default AddGoal
