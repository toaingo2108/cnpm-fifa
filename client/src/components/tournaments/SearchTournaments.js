import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { apiUrl } from '../contexts/contants'
import SingleTournament from './SingleTournament'

const SearchTournaments = () => {
    const [tournaments, setTournaments] = useState([])
    const [loading, setLoading] = useState(true)

    let { key } = useParams()

    const getSearchTournaments = async (key) => {
        try {
            const response = await axios.get(
                `${apiUrl}/tournaments/search/${key}`
            )
            if (response.data.success) {
                setTournaments(response.data.tournaments)
                setLoading(false)
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Lỗi hệ thống' }
        }
    }

    useEffect(() => getSearchTournaments(key), [key])

    let body = null

    if (loading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        )
    } else if (tournaments.length === 0) {
        body = (
            <>
                <h1>Không có kết quả tìm kiếm cho "{key}"</h1>
            </>
        )
    } else {
        body = (
            <>
                <h1>
                    Có {tournaments.length} kết quả tìm kiếm cho "{key}"
                </h1>
                <Row>
                    {tournaments.map((tournament) => {
                        return (
                            <Col key={tournament._id} xs={12}>
                                <SingleTournament tournament={tournament} />
                            </Col>
                        )
                    })}
                </Row>
            </>
        )
    }

    return (
        <>
            <Container className="my-container">{body}</Container>
        </>
    )
}

export default SearchTournaments
