import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginAction } from "../../actions/adminAction";
import swal from 'sweetalert'


const LoginBar = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    return (
        <React.Fragment>
            <li className='nav-item'><Link className='nav-link' to='/dashboard'>Dashboard</Link></li>
            <li className='nav-item'><Link className='nav-link' to='/customers'>Customers</Link></li>
            <li className='nav-item'><Link className='nav-link' to='/products'>Products</Link></li>
            <li className='nav-item'> <Link className='nav-link' to='/bills'>Bills</Link></li>
            <li className='nav-item'><Link className='nav-link' to='#' onClick={() => {
                localStorage.clear()
                swal("You have been sucessfully logged out", {
                    icon: 'success'
                })
                history.push('/')
                dispatch(loginAction(false))
            }}>Logout</Link></li>
        </React.Fragment>
    )
}
export default LoginBar