import React from 'react'
import CustomerForm from './customerForm'
import CustomerTable from './customerTable'
import { startCustomer } from '../../actions/customerAction'
import { useDispatch } from 'react-redux'

const Customer = () => {
    const dispatch = useDispatch()
    const formSubmission = (formData, resetForm) => {
        dispatch(startCustomer(formData, resetForm))
    }
    return (
        <div className='container'>
            <div className='row'>
                <h3>Customer Details</h3>

                <CustomerTable />
                <CustomerForm formSubmission={formSubmission} />

            </div>
        </div >
    )
}

export default Customer
