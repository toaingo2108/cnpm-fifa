import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { apiUrl } from '../contexts/contants'
import SinglePlayer from './SinglePlayer'

const PlayersOfTeam = ({ teamId }) => {
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)

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

    useEffect(() => getPlayersOfTeam(teamId), [teamId])

    let body = null

    if (loading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        )
    } else if (players.length === 0) {
        body = (
            <>
                <h1>Đội này chưa có cầu thủ tham gia</h1>
            </>
        )
    } else {
        body = (
            <>
                <Row>
                    {players.map((player) => {
                        return (
                            <Col key={player._id} xs={4}>
                                <SinglePlayer player={player} />
                            </Col>
                        )
                    })}
                </Row>
            </>
        )
    }

    return (
        <>
            <Container className="my-5">{body}</Container>
        </>
    )
}

export default PlayersOfTeam
