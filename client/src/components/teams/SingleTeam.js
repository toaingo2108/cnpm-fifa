import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from '../contexts/contants'

const SingleTeam = ({ teamId }) => {
    const [team, setTeam] = useState({})
    const [loading, setLoading] = useState(true)

    let navigate = useNavigate()

    const getDetailTeam = async (teamId) => {
        try {
            const response = await axios.get(
                `${apiUrl}/teams/details/${teamId}`
            )
            if (response.data.success) {
                setTeam(response.data.team)
                setLoading(false)
            }
            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    useEffect(() => getDetailTeam(teamId), [teamId])

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
                <Image
                    src={team.logo}
                    width="180"
                    height="180"
                    roundedCircle
                    className="hover-item object-fit-cover"
                    onClick={() => navigate(`/teams/details/${team._id}`)}
                />
                <div className="fs-2 fw-bold">{team.name}</div>
                <div className="text-uppercase mt-3 fw-bold ">
                    {team.trainer}
                </div>
            </>
        )
    }

    return <>{body}</>
}

export default SingleTeam
