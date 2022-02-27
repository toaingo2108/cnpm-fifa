import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { apiUrl } from '../contexts/contants'
import SchedulersOfTournament from '../schedulers/SchedulersOfTournament'
import SingleTeam from '../teams/SingleTeam'

const DetailTournament = () => {
    const { setAlert } = useContext(AuthContext)

    const [tournament, setTournament] = useState({})
    const [loading, setLoading] = useState(true)

    const { name, description, image, status, teams } = tournament

    let navigate = useNavigate()

    let { tournamentId } = useParams()

    const getDetailTournament = async (tournamentId) => {
        try {
            const response = await axios.get(
                `${apiUrl}/tournaments/${tournamentId}`
            )
            if (response.data.success) {
                setTournament(response.data.tournament)
                setLoading(false)
            }
            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    const createSchedulers = async (tournamentId) => {
        try {
            const response = await axios.post(
                `${apiUrl}/schedulers/${tournamentId}`
            )
            if (response.data.success) {
                await getDetailTournament(tournamentId)
            }
            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    const handleCreateSchedulers = async (tournamentId) => {
        const { success, message } = await createSchedulers(tournamentId)
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

    useEffect(() => getDetailTournament(tournamentId), [tournamentId])

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
                        <Card>
                            <Card.Img
                                variant="top"
                                src={image}
                                className="tournament-image"
                            />
                            <Card.Body>
                                <Card.Title>{name}</Card.Title>
                                <Card.Text>{description}</Card.Text>
                                <div>
                                    {status === 'Initializing' ? (
                                        <Button
                                            variant="primary"
                                            className="me-3 fs-5"
                                            onClick={() =>
                                                navigate(
                                                    `/teams/add/${tournamentId}`
                                                )
                                            }>
                                            Thêm đội vào giải đấu
                                        </Button>
                                    ) : (
                                        ''
                                    )}
                                    {teams.length >= 2 &&
                                    status === 'Initializing' ? (
                                        <Button
                                            variant="outline-success"
                                            className="me-3 fs-5"
                                            disabled={
                                                teams.length >= 2 ? false : true
                                            }
                                            onClick={handleCreateSchedulers.bind(
                                                this,
                                                tournamentId
                                            )}>
                                            Tạo lịch thi đấu
                                        </Button>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    {teams.length === 0 ? (
                        <h1>Chưa có đội nào tham gia giải đấu này</h1>
                    ) : (
                        teams.map((team) => (
                            <Col
                                key={team._id}
                                xs={4}
                                className="my-3 d-flex flex-column align-items-center justify-content-center hover-text-red">
                                <SingleTeam teamId={team._id} />
                            </Col>
                        ))
                    )}
                    <SchedulersOfTournament tournamentId={tournamentId} />
                </Row>
            </>
        )
    }

    return <Container className="my-container">{body}</Container>
}

export default DetailTournament
