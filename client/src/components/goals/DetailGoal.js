import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { apiUrl } from '../contexts/contants'
import SinglePlayer from '../players/SinglePlayer'
import SingleTeam from '../teams/SingleTeam'
import SingleGoal from './SingleGoal'

const DetailGoal = () => {
    const [goal, setGoal] = useState({})
    const [loading, setLoading] = useState(true)
    const { player, team, videoId } = goal

    let navigate = useNavigate()

    let { goalId } = useParams()

    const getDetailGoal = async (goalId) => {
        try {
            const response = await axios.get(
                `${apiUrl}/goals/details/${goalId}`
            )
            if (response.data.success) {
                setGoal(response.data.goal)
                setLoading(false)
            }
            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    useEffect(() => getDetailGoal(goalId), [goalId])

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
                        className="fs-4"
                        onClick={() => navigate(-1)}>
                        Trở về
                    </Button>
                    <Col xs={12}>
                        <SingleGoal goal={goal} />
                    </Col>
                    <div className="d-flex">
                        <Col
                            xs={6}
                            className="d-flex flex-column justify-content-center align-items-center">
                            <SingleTeam teamId={team._id} />
                        </Col>
                        <Col
                            xs={6}
                            className="d-flex flex-column justify-content-center align-items-center">
                            <SinglePlayer player={player} />
                        </Col>
                    </div>
                    <h4>Xem lại bàn thắng tuyệt vời</h4>
                    <iframe
                        width="560"
                        height="500"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                </Row>
            </>
        )
    }

    return <Container className="my-container">{body}</Container>
}

export default DetailGoal
