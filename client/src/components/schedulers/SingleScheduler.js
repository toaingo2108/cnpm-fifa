import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import SingleTeam from '../teams/SingleTeam'

const SingleScheduler = ({ scheduler }) => {
    const { _id, team1, team2, time, goals } = scheduler

    const newTime = new Date(time)
    const day = newTime.getDate()
    const month = newTime.getMonth() + 1
    const year = newTime.getFullYear()

    let navigate = useNavigate()

    const goalsTeam1 = goals.filter((goal) => team1._id === goal.team)
    const goalsTeam2 = goals.filter((goal) => team2._id === goal.team)

    return (
        <Card className="my-3 d-flex hover-item">
            <Card.Body className="d-flex justify-content-around">
                <Col
                    xs={5}
                    className="d-flex flex-column justify-content-center align-items-center">
                    <SingleTeam teamId={team1._id} />
                </Col>
                <Col
                    xs={2}
                    className="d-flex flex-column justify-content-center align-items-center fw-bold fs-1">
                    <div>
                        {goalsTeam1.length} - {goalsTeam2.length}
                    </div>
                    <div className="text-center fs-6 mb-5">{`${day} / ${month} / ${year}`}</div>
                    <Button
                        size="lg"
                        variant="outline-info"
                        onClick={() => navigate(`/schedulers/details/${_id}`)}>
                        Xem chi tiết
                    </Button>
                </Col>
                <Col
                    xs={5}
                    className="d-flex flex-column justify-content-center align-items-center">
                    <SingleTeam teamId={team2._id} />
                </Col>
            </Card.Body>
        </Card>
    )
}

export default SingleScheduler
