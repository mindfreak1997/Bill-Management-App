import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { adminLogin } from '../actions/adminAction'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [check, setCheck] = useState(false)
    const [formError, setFormError] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()
    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
        } else if (e.target.name === 'show') {
            setCheck(e.target.checked)
        }
    }
    const error = {}
    const runValidation = () => {
        if (email.length === 0) {
            error.email = 'email should not be blank'
        }
        if (password.length === 0) {
            error.password = 'password cannot be blank'
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError({})
        runValidation()
        if (Object.keys(error).length === 0) {
            const formData = {
                email: email,
                password: password
            }
            const redirectAdmin = () => {
                history.push('/dashboard')
            }
            dispatch(adminLogin(formData, redirectAdmin))

        } else {
            setFormError(error)
        }
    }
    return (
        <div className='col-md-6 '>

            <form style={{ marginTop: '70px', maxWidth: '400px', margin: 'auto' }} onSubmit={handleSubmit}>
                <h1 className='my-8 font-weight-bold-display-4 pb-5 text-centre'>Sign in</h1>
                <input type='email' className='form-control' name='email' value={email} placeholder='Enter Email' onChange={handleChange} />
                {
                    formError.email && <span style={{ color: 'red' }}>{formError.email}</span>
                } <br />
                {
                    check ? (
                        <input type='text' className='form-control' name='showPassword' value={password} />

                    ) : (
                        <input type='password' className='form-control' name='password' value={password} placeholder='Enter password' onChange={handleChange} />
                    )
                }
                {
                    formError.password && <span style={{ color: 'red' }}>{formError.password}</span>
                }
                <br />
                <input type='checkbox' name='show' checked={check} onChange={handleChange} /> <span style={{ color: 'blue' }}>Show Password</span> <br />
                <input type='submit' className='btn btn-dark mt-3' value='login' />
            </form>
            <span>Note :(email: akhidk97@gmail.com, password:qazwsxedc123)  </span>
        </div>
    )
}

export default Login
