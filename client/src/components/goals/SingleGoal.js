import React from 'react'
import { Card, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SingleGoal = ({ goal: { _id, team, player, atTime, videoId } }) => {
    let navigate = useNavigate()
    return (
        <Card
            className="my-2 hover-item"
            onClick={() => navigate(`/goals/details/${_id}`)}>
            <Card.Body className="d-flex justify-content-around align-items-center">
                <Image
                    src={team.logo}
                    width="100"
                    height="100"
                    className="object-fit-cover"
                    roundedCircle></Image>
                <div className="fs-2">{atTime}'</div>

                <Image
                    src={player.avatar}
                    width="100"
                    height="100"
                    className="object-fit-cover"
                    roundedCircle></Image>
            </Card.Body>
        </Card>
    )
}

export default SingleGoal
