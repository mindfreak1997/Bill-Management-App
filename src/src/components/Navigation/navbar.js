import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginBar from "./loginBar";
import React from 'react'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import './navbar.css'


const NavBar = () => {
    const isLogin = useSelector((state) => {
        return state.admin.isLogin
    })
    return (
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark navbar-style main-nav'>
            <div className='navbar-brand'>WeBill <FaFileInvoiceDollar /></div>
            <div className='collapse navbar-collapse'>
                <ul className='navbar-nav  main-links' >
                    {
                        isLogin === false ? (
                            <React.Fragment>
                                <li className='nav-item'> <Link className='nav-link' to='/'><b>Home</b></Link></li>
                                <li className='nav-item'> <Link className='nav-link' to='/signup'><b>Sign Up</b></Link></li>

                            </React.Fragment>
                        ) : (
                            <LoginBar />
                        )
                    }

                </ul>
            </div>




        </nav>




    )
}
export default NavBar