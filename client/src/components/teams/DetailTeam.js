import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import PlayersOfTeam from '../players/PlayersOfTeam'
import SingleTeam from './SingleTeam'

const DetailTeam = () => {
    let { teamId } = useParams()
    let navigate = useNavigate()

    return (
        <Container className="my-container">
            <Row className="my-5">
                <Button
                    variant="outline-success"
                    className="fs-4"
                    onClick={() => navigate(-1)}>
                    Trở về
                </Button>
                <Col xs={12}>
                    <Card className="my-3">
                        <div className="p-5 d-flex flex-row align-items-center justify-content-between">
                            <SingleTeam teamId={teamId} />
                        </div>
                        <div className="p-3 d-flex justify-content-evenly">
                            <Button
                                variant="primary"
                                className="fs-5"
                                onClick={() =>
                                    navigate(`/players/add/${teamId}`)
                                }>
                                Đăng ký cầu thủ
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
            <PlayersOfTeam teamId={teamId} />
        </Container>
    )
}

export default DetailTeam
