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
import SinglePlayer from './SinglePlayer'

const AllPlayers = () => {
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    const getPlayers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/players`)
            if (response.data.success) {
                setPlayers(response.data.players)
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

    const filteredPlayers = players.filter((player) =>
        player.name.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => getPlayers(), [])

    let body = null

    if (loading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        )
    } else if (players.length === 0) {
        body = (
            <>
                <h1>Danh sách cầu thủ rỗng</h1>
            </>
        )
    } else {
        body = (
            <>
                <Row className="d-flex">
                    <Col xs={6}>
                        <h1>Có tất cả {players.length} cầu thủ </h1>
                    </Col>
                    <Col xs={6}>
                        <InputGroup className="mb-3">
                            <FormControl
                                type="text"
                                placeholder="Tìm cầu thủ"
                                className="input"
                                onChange={handleChangeSearch}
                                value={search}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="my-5">
                    {filteredPlayers.map((player) => (
                        <Col
                            xs={4}
                            key={player._id}
                            className="d-flex flex-column align-items-center">
                            <SinglePlayer player={player} />
                        </Col>
                    ))}
                </Row>
            </>
        )
    }
    return <Container className="my-container">{body}</Container>
}

export default AllPlayers
