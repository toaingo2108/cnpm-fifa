import React from 'react'
import { Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SingleTournament = ({
    tournament: {
        _id,
        name,
        // description,
        status,
        image,
        teams,
    },
}) => {
    let navigate = useNavigate()
    return (
        <>
            <div
                className="tournament-item hover-item"
                onClick={() => navigate(`/tournaments/details/${_id}`)}>
                <img
                    className="tournament-img"
                    src={image}
                    alt="Ảnh giải đấu"
                />
                <div className="tournament-data">
                    <div className="tournament-name">{name}</div>
                    {/* <p className="tournament-desc">{description}</p> */}
                    <Badge
                        className={`bg-${
                            status === 'Initializing'
                                ? 'warning'
                                : status === 'Going on'
                                ? 'success'
                                : 'danger'
                        } tournament-status m-0`}>
                        {status}
                    </Badge>
                    <div className="mt-2">
                        Số lượng đội tham gia: {teams.length}
                    </div>
                </div>
                <div className="tournament-buttons"></div>
            </div>
        </>
    )
}

export default SingleTournament
