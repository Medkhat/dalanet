import React from 'react'
import header from './Header.module.css'
import logo from '../../img/logo.png'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
    return (
        <header className={header.header}>
            <div className={header.container}>
                <div className={header.logotype}>
                    <img src={logo} alt="LOGO" className={header.logo}/>
                    <span className={header.text}>DalaNet-Beta</span>
                </div>
                <div className={header.profile}>
                    {
                        props.isAuth 
                            ? <p>{props.login} <button onClick={props.logout}>Log out</button></p>
                            : <NavLink to="/login" className={header.link}>Sign In</NavLink>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header