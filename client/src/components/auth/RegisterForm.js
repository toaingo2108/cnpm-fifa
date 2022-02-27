import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const RegisterForm = () => {
    // Context
    const { registerUser, setAlert } = useContext(AuthContext)

    // Local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    })
    const { username, password, confirmPassword } = registerForm

    const onChangeRegisterForm = (event) => {
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        })
    }

    const register = async (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            setAlert({
                type: 'warning',
                message: 'Password không khớp',
            })
            setTimeout(
                () =>
                    setAlert({
                        show: false,
                        type: '',
                        message: '',
                    }),
                3000
            )
            return
        }

        try {
            const registerData = await registerUser(registerForm)
            if (!registerData.success) {
                setAlert({
                    show: true,
                    type: 'danger',
                    message: registerData.message,
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
            <Form className="my-4" onSubmit={register}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Username..."
                        name="username"
                        required
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className="my-2">
                    <Form.Control
                        type="password"
                        placeholder="Password..."
                        name="password"
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password..."
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Button variant="info" type="submit" className="mt-4 fs-4 px-5">
                    Đăng ký
                </Button>
            </Form>
            <p>
                Thực hiện đăng nhập? <Link to="/login">Đăng nhập</Link>
            </p>
        </>
    )
}

export default RegisterForm
