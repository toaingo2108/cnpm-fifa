import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const LoginForm = () => {
    // Context
    const { loginUser, setAlert } = useContext(AuthContext)

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })
    const { username, password } = loginForm

    const onChangeLoginForm = (event) => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value,
        })
    }

    const login = async (event) => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if (!loginData.success) {
                setAlert({
                    show: true,
                    type: 'danger',
                    message: loginData.message,
                })
                setTimeout(() => {
                    setAlert({
                        show: false,
                        type: '',
                        message: '',
                    })
                }, 3000)
            }
        } catch (error) {}
    }

    return (
        <>
            <Form className="my-4" onSubmit={login}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Username..."
                        name="username"
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Control
                        type="password"
                        placeholder="Password..."
                        name="password"
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button
                    variant="success"
                    type="submit"
                    className="mt-4 fs-4 px-5">
                    ????ng nh???p
                </Button>
            </Form>
            <p>
                Th???c hi???n ????ng k?? qu???n tr??? vi??n?{' '}
                <Link to="/register">????ng k??</Link>
            </p>
            <p>
                <Link to="/home">????ng nh???p v???i t?? c??ch l?? KH??CH</Link>
            </p>
        </>
    )
}

export default LoginForm
