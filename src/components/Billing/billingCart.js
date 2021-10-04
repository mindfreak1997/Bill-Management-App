import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Table } from 'react-bootstrap'
import Select from 'react-select'
import { FaUserCheck } from 'react-icons/fa'
import { asyncBill } from '../../actions/billAction'

import BillModal from './billModal'

const BillingCart = ({ addedProducts, billData, clear, removeItems, handleClose }) => {
    const dispatch = useDispatch()
    const [date, setDate] = useState('')
    const [customer, setCustomer] = useState('')
    const [show, setShow] = useState(false)
    const [isButton, setButton] = useState(true)
    const [generatedData, setdata] = useState({})
    const customers = useSelector((state) => {
        return state.customers
    })
    const bills = useSelector((state) => {
        return state.bills
    })
    const products = useSelector((state) => {
        return state.products
    })
    useEffect(() => {
        if (date && customer) {
            setButton(false)
        }
    })
    const selectCustomers = []
    customers.forEach(ele => {
        selectCustomers.push({ label: ele.name, value: ele.name })
    })

    const handleChange = (e) => {
        if (e.target.name === 'date') {
            setDate(e.target.value)
        }
    }
    // to get the id of the customer for form data
    const filterCustomer = () => {
        const result = customers.filter(ele => {
            return ele.name === customer
        })
        return result

    }

    const handleShow = () => {
        setShow(!show)
    }
    const handleGenerate = () => {
        const customerId = filterCustomer()
        const formData = {
            date: date,
            customer: customerId[0]._id,
            lineItems: billData
        }
        const handleData = (data) => {
            setdata(data)
        }
        const clearCart = () => {
            setDate('')
            setCustomer('')
        }

        dispatch(asyncBill(formData, clear, handleData, clearCart, handleShow, handleClose))
    }
    const handleRemove = (id) => {
        removeItems(id)
    }

    return (
        <div className='mt-3' style={{ maxWidth: '300px' }}>
            <h3>  Cart Items</h3>
            <input className='form-control' type='date' value={date} name='date' onChange={handleChange} />
            <FaUserCheck /> <Select

                className='form-control'
                placeholder='Select Customer'
                options={selectCustomers}
                onChange={opt => setCustomer(opt.value)}

            />
            {
                addedProducts.length > 0 ? (
                    <Table >
                        <thead>
                            <tr>
                                <th>products </th>
                                <th>Quantity</th>
                                <th>price</th>
                                <th>SubTotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                addedProducts.map(ele => {
                                    return (
                                        <tr key={ele._id}>
                                            <td>{ele.product}</td>
                                            <td>{ele.quantity}</td>
                                            <td>{ele.price}</td>
                                            <td>{ele.price * ele.quantity}</td>
                                            <td><Button onClick={() => {
                                                handleRemove(ele.id)
                                            }}>Remove</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                ) : (
                    <h1 style={{ color: 'green' }}>Cart is empty</h1>
                )
            }

            <Button disabled={isButton} onClick={handleGenerate}>Generate Bill</Button>


            {
                Object.keys(generatedData).length !== 0 && <BillModal generatedData={generatedData} customers={customers} products={products} show={show} handleShow={handleShow} />
            }
        </div>
    )
}

export default BillingCart
