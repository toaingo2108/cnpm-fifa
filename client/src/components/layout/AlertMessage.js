import React, { useContext } from 'react'
import { Alert } from 'react-bootstrap'
import { AuthContext } from '../contexts/AuthContext'

const AlertMessage = () => {
    const { alert } = useContext(AuthContext)
    const { show, type, message } = alert
    return (
        <div className="alert-container">
            <Alert show={show} variant={type}>
                {message}
            </Alert>
        </div>
    )
}

export default AlertMessage
