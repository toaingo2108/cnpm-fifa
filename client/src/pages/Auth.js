import { useContext } from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { AuthContext } from '../components/contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import { Navigate } from 'react-router'

const Auth = ({ authRoute }) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext)

    let body

    if (authLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info" />
            </div>
        )
    } else if (isAuthenticated) {
        return <Navigate to="/home" />
    } else {
        body = (
            <>
                {authRoute === 'login' && <LoginForm />}
                {authRoute === 'register' && <RegisterForm />}
            </>
        )
    }

    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">{body}</div>
            </div>
        </div>
    )
}

export default Auth
