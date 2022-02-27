import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { apiUrl } from '../contexts/contants'
import SingleScheduler from './SingleScheduler'

const SchedulersOfTournament = ({ tournamentId }) => {
    const [schedulers, setSchedulers] = useState([])
    const [loading, setLoading] = useState(true)

    const getSchedulersOfTournament = async (tournamentId) => {
        try {
            const response = await axios.get(
                `${apiUrl}/schedulers/${tournamentId}`
            )
            if (response.data.success) {
                setSchedulers(response.data.schedulers)
                setLoading(false)
            }
            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    useEffect(() => getSchedulersOfTournament(tournamentId), [tournamentId])

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
                    <Col xs={12}>
                        <h1>Lịch thi đấu</h1>
                    </Col>
                </Row>
                {schedulers.map((scheduler) => (
                    <Col key={scheduler._id}>
                        <SingleScheduler scheduler={scheduler} />
                    </Col>
                ))}
            </>
        )
    }

    return <Container className="my-container">{body}</Container>
}

export default SchedulersOfTournament
