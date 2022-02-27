import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { apiUrl } from '../contexts/contants'
import GoalsOfTournament from '../goals/GoalsOfTournament'
import SingleScheduler from './SingleScheduler'

const DetailScheduler = () => {
    const [scheduler, setScheduler] = useState({})
    const [loading, setLoading] = useState(true)

    let { schedulerId } = useParams()
    let navigate = useNavigate()

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

    useEffect(() => getScheduler(schedulerId), [schedulerId])

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
                    <Button
                        variant="success"
                        className="fs-4 my-3"
                        onClick={() => navigate(`/goals/add/${schedulerId}`)}>
                        Thêm bàn thắng
                    </Button>
                    <Col xs={12}>
                        <SingleScheduler scheduler={scheduler} />
                    </Col>
                    <Col>
                        <GoalsOfTournament schedulerId={schedulerId} />
                    </Col>
                </Row>
            </>
        )
    }

    return <Container className="my-container">{body}</Container>
}

export default DetailScheduler
