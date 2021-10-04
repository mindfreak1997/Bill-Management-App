import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const CustomerForm = ({ formSubmission, name: customer, mobile: phone, email: gmail, _id }) => {
    const [name, setName] = useState(customer ? customer : '')
    const [mobile, setMobile] = useState(phone ? phone : '')
    const [email, setEmail] = useState(gmail ? gmail : '')
    const [formError, setError] = useState({})
    const customers = useSelector((state) => {
        return state.customers
    })
    const error = {}
    const runValidation = () => {
        if (name.length === 0) {
            error.name = 'name cannot be blank'
        }
        if (mobile.length === 0) {
            error.mobile = 'mobile cannot be blank'
        }
        if (email.length === 0) {
            error.email = 'email cannot be blank'
        }
    }
    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        } else if (e.target.name === 'mobile') {
            setMobile(e.target.value)
        }
        else if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
    }
    const resetForm = () => {
        setName('')
        setMobile('')
        setEmail('')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setError({})
        runValidation()
        if (Object.keys(error).length === 0) {
            const formData = {
                name: name,
                mobile: mobile,
                email: email
            }
            formSubmission(formData, resetForm, _id)
        } else {
            setError(error)
        }
    }
    return (
        <div className='col-lg-4'>

            <form style={{ maxWidth: '300px', margin: 'auto' }} onSubmit={handleSubmit}>
                {
                    name ? <h3> Edit Customer</h3> : <h3>Add Customer</h3>
                }

                <input type='text' className='form-control' name='name' placeholder='Enter name' value={name} onChange={handleChange} />
                {
                    formError.name && <span style={{ color: 'red' }}>{formError.name}</span>
                }
                <br />
                <input type='text' className='form-control' name='mobile' placeholder='Enter Mobile No' value={mobile} onChange={handleChange} />
                {
                    formError.mobile && <span style={{ color: 'red' }}>{formError.mobile}</span>
                }
                <br />
                <input type='text' className='form-control' name='email' placeholder='Enter email ' value={email} onChange={handleChange} />
                {
                    formError.email && <span style={{ color: 'red' }}>{formError.email}</span>
                }
                <br />
                {
                    name ? (
                        <input className='btn btn-success' type='Submit' value='Save' />
                    ) : (
                        <input className='btn btn-success' type='Submit' value='Add customer' />
                    )
                }
                <button className='btn btn-secondary' onClick={resetForm}>Cancel</button>
            </form>
        </div>
    )
}

export default CustomerForm
