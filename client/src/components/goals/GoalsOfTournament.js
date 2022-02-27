import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { apiUrl } from '../contexts/contants'
import SingleGoal from './SingleGoal'

const GoalsOfTournament = ({ schedulerId }) => {
    const [goals, setGoals] = useState([])
    const [loading, setLoading] = useState(true)

    const getGoalsOfScheduler = async (schedulerId) => {
        try {
            const response = await axios.get(`${apiUrl}/goals/${schedulerId}`)
            if (response.data.success) {
                setGoals(response.data.goals)
                setLoading(false)
            }
            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    useEffect(() => getGoalsOfScheduler(schedulerId), [schedulerId])

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
                    <h3>Bàn thắng</h3>
                    {goals.map((goal) => (
                        <Col key={goal._id} xs={12}>
                            <SingleGoal goal={goal} />
                        </Col>
                    ))}
                </Row>
            </>
        )
    }

    return <>{body}</>
}

export default GoalsOfTournament
