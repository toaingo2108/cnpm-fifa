import React, { useContext } from 'react'
import { Carousel, Spinner } from 'react-bootstrap'
import { AuthContext } from '../components/contexts/AuthContext'
import slide1 from '../assets/img/slide1.jpg'
import slide2 from '../assets/img/slide2.jpg'
import slide3 from '../assets/img/slide3.jpg'

const Home = () => {
    const {
        authState: { authLoading },
    } = useContext(AuthContext)

    let body = null

    if (authLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        )
    } else {
        body = (
            <>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 object-fit-cover"
                            src={slide1}
                            height="800"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Việt Nam vô địch</h3>
                            <p>Cùng cổ vũ cho đội tuyển Việt Nam</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 object-fit-cover"
                            src={slide2}
                            height="800"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>Việt Nam vô địch</h3>
                            <p>Cùng cổ vũ cho đội tuyển Việt Nam</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 object-fit-cover"
                            src={slide3}
                            height="800"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Việt Nam vô địch</h3>
                            <p>Cùng cổ vũ cho đội tuyển Việt Nam</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </>
        )
    }

    return <>{body}</>
}

export default Home
