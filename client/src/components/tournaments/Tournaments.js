import React, { useEffect, useState } from 'react'
import SingleTournament from './SingleTournament'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import axios from 'axios'
import { apiUrl } from '../contexts/contants'

const Tournaments = () => {
    const [tournaments, setTournaments] = useState([])
    const [loading, setLoading] = useState(true)

    // Get all tournaments
    const getTournaments = async () => {
        try {
            const response = await axios.get(`${apiUrl}/tournaments`)
            if (response.data.success) {
                setTournaments(response.data.tournaments)
                setLoading(false)
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getTournaments(), [])

    let body = null

    if (loading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        )
    } else if (tournaments.length === 0) {
        body = (
            <>
                <h1>Chưa có giải đấu nào</h1>
            </>
        )
    } else {
        body = (
            <>
                <Row>
                    {tournaments.map((tournament) => {
                        return (
                            <Col key={tournament._id} xs={12}>
                                <SingleTournament tournament={tournament} />
                            </Col>
                        )
                    })}
                </Row>
            </>
        )
    }

    return (
        <>
            <Container className="my-container">{body}</Container>
        </>
    )
}

export default Tournaments
