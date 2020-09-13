import React from 'react'
import navbar from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

const Link = (props) => {
    return (
        <div className={navbar.item}>
            <NavLink to={props.href} className={navbar.navitem} activeClassName={navbar.active}>{props.title}</NavLink>
        </div>
    )
}

const Navbar = () => {
    return (
        <nav className={navbar.nav}>
           <Link title="My Profile" href="/profile" />
           <Link title="Messages" href="/dialogs"/>
           <Link title="News" href="/news" />
           <Link title="Users" href="/users"/>
        </nav>
    )
}

export default Navbar