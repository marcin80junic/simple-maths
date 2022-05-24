import React from "react"
import { Link, Outlet } from "react-router-dom"
import "../styles/Navbar.scss"

const Navbar = ({handleNavigation}) => {

    const handleSelection = (event) => {
        const href = event.target.href
        if (href) {
            handleNavigation(href)
        }
    }

    return (
        <>
            <nav className="sidenav" onClick={ handleSelection }>
                <button className="mobile-toggle-button button3d">toggle menu</button>
                <h1 className="mobile-title">Menu</h1>
                <Link to="home" className="button3d">Home</Link>
                <Link to="addition" className="button3d">Addition +</Link>
                <Link to="subtraction" className="button3d">Subtraction -</Link>
                <Link to="multiplication" className="button3d">Multiplication &times;</Link>
                <Link to="division" className="button3d">Division &divide;</Link>
                <Link to="fractions" className="button3d">Fractions &frac12;</Link>
                <Link to="custom" className="button3d">Custom Exercises</Link>
                <Link to="test" className="button3d">Test</Link>
                <Link to="settings" className="button3d">Settings</Link>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar