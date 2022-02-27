import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { apiUrl } from '../contexts/contants'
import SingleTeam from './SingleTeam'

const AddTeamToTournament = () => {
    const { setAlert } = useContext(AuthContext)

    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)

    let { tournamentId } = useParams()

    const getCanAddTeams = async (tournamentId) => {
        try {
            const response = await axios.get(
                `${apiUrl}/teams/canAdd/${tournamentId}`
            )
            if (response.data.success) {
                setTeams(response.data.teams)
                setLoading(false)
            }
            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    useEffect(() => getCanAddTeams(tournamentId), [tournamentId])

    const addTeamToTournament = async (teamId) => {
        try {
            const response = await axios.put(
                `${apiUrl}/tournaments/addTeam/${tournamentId}`,
                { teamId }
            )
            if (response.data.success) {
                await getCanAddTeams(tournamentId)
            }
            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    const handleAddTeam = async (teamId) => {
        const { success, message } = await addTeamToTournament(teamId)
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
    }

    let body = null

    if (loading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        )
    } else if (teams.length === 0) {
        body = (
            <>
                <h1>Hiện tất cả đội bóng đều tham gia giải đấu này</h1>
            </>
        )
    } else {
        body = (
            <>
                <h1>Có {teams.length} đội có thể tham gia giải đấu</h1>
                <Row>
                    {teams.map((team) => (
                        <Col
                            xs={3}
                            key={team._id}
                            className="d-flex flex-column align-items-center mt-4">
                            <SingleTeam teamId={team._id} />
                            <Button
                                variant="outline-primary"
                                className="px-5 fs-5"
                                onClick={handleAddTeam.bind(this, team._id)}>
                                Thêm
                            </Button>
                        </Col>
                    ))}
                </Row>
            </>
        )
    }
    return <Container className="my-container">{body}</Container>
}

export default AddTeamToTournament
