import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { SidebarData } from './SidebarData'
import './Navbar.css'
import { IconContext } from 'react-icons'
import { AuthContext } from '../contexts/AuthContext'

const Navbar = () => {
    const {
        authState: { isAuthenticated },
        logoutUser,
    } = useContext(AuthContext)

    let navigate = useNavigate()

    const logout = () => {
        logoutUser()
        navigate('/login')
    }

    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)
    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar d-flex justify-content-between position-sticky fixed-top">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    {isAuthenticated ? (
                        <Link
                            to="#"
                            className="me-4 menu-bars"
                            onClick={logout}>
                            {<FaIcons.FaSignOutAlt />}
                        </Link>
                    ) : (
                        <Link to="/login" className="me-4 menu-bars">
                            <span>Login</span>
                        </Link>
                    )}
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items">
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <FaIcons.FaTimes onClick={showSidebar} />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    className={item.cName}
                                    onClick={showSidebar}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
