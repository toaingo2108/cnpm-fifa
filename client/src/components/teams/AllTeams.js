import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    Col,
    Container,
    FormControl,
    InputGroup,
    Row,
    Spinner,
} from 'react-bootstrap'
import { apiUrl } from '../contexts/contants'
import SingleTeam from './SingleTeam'

const AllTeams = () => {
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    const getTeams = async () => {
        try {
            const response = await axios.get(`${apiUrl}/teams`)
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

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const filteredTeams = teams.filter((team) =>
        team.name.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => getTeams(), [])

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
                <h1>Danh sách đội bóng rỗng</h1>
            </>
        )
    } else {
        body = (
            <>
                <Row className="d-flex">
                    <Col xs={6}>
                        <h1>Có tất cả {teams.length} đội bóng</h1>
                    </Col>
                    <Col xs={6}>
                        <InputGroup className="mb-3">
                            <FormControl
                                type="text"
                                placeholder="Tìm đội bóng"
                                className="input"
                                onChange={handleChangeSearch}
                                value={search}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="my-5">
                    {filteredTeams.map((team) => (
                        <Col
                            xs={4}
                            key={team._id}
                            className="d-flex flex-column align-items-center my-4">
                            <SingleTeam teamId={team._id} />
                        </Col>
                    ))}
                </Row>
            </>
        )
    }
    return <Container className="my-container">{body}</Container>
}

export default AllTeams
