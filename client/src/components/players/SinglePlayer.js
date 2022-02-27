import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SinglePlayer = ({
    player: {
        _id,
        name,
        // age,
        // position,
        number,
        avatar,
        // height,
        // weight,
        // goals,
        // team,
    },
}) => {
    let navigate = useNavigate()

    return (
        <Card
            className="my-3 hover-item position-relative "
            onClick={() => navigate(`/players/details/${_id}`)}>
            <div className="player-number">{number}</div>
            <Card.Img
                className="object-fit-cover"
                variant="top"
                src={avatar}
                height="600"
            />
            <Card.Body className="text-center">
                <Card.Title className="m-2 fs-4">{name}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default SinglePlayer
