import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { format } from 'date-fns'
import { Table } from 'react-bootstrap'
import BillModal from './billModal'
import Select from 'react-select'
import { AiTwotoneDelete } from 'react-icons/ai'
import { selectCustomer } from '../helper/helperBill'
import { deleteBills } from '../../actions/billAction'

const BillingTable = ({ customers, products }) => {
    const dispatch = useDispatch()
    const [generatedData, setData] = useState({})
    const [show, setShow] = useState(false)
    const [search, setSearch] = useState('')
    const [customer, setCustomer] = useState('')

    const bills = useSelector((state) => {
        return state.bills
    })
    const revereseBill = () => {
        const bill = []
        for (let i = bills.length - 1; i > 0; i--) {
            bill.push(bills[i])
        }
        return bill
    }
    const data = revereseBill()
    const selectCustomers = selectCustomer(customers)
    const selectCustomerdata = () => {
        const result = customers.find(ele => {
            return ele.name === customer
        })

        const filterBill = bills.filter(ele => {
            return ele.customer === result._id
        })
        return filterBill
    }
    const filteredBill = customer && selectCustomerdata()

    const filter = (data, array) => {
        const result = array.find(ele => {
            return ele._id === data
        })
        return result.name
    }
    const handleShow = () => {
        setShow(!show)
    }
    const handleGenerate = (ele) => {
        setData(ele)
        handleShow()
    }
    const handleDelete = (id) => {
        dispatch(deleteBills(id))
    }
    const handleChange = (opt) => {
        setCustomer(opt.value)
    }
    const handleSearch = () => {
        setCustomer('')
    }
    return (
        <div className='col-md-10'>
            <h3>Bill Details</h3>
            <div className='row'>
                <Select
                    className='col-sm-5'
                    value={customer}
                    options={selectCustomers}
                    onChange={handleChange}
                />
                <button className='col-sm-1' onClick={handleSearch}>X</button>
            </div>

            <Table striped bordered hover size='lg'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (customer ? filteredBill : data).map(ele => {
                            return (
                                <tr>
                                    <td>{format(new Date(ele.date), 'dd/MM/yyyy ')}</td>
                                    <td>{filter(ele.customer, customers)}</td>
                                    <td>{ele.total}</td>
                                    <td>
                                        <button className='btn btn-dark ml-5' onClick={() => {
                                            handleGenerate(ele)
                                        }}>Invoice</button>
                                        <button onClick={() => {
                                            handleDelete(ele._id)
                                        }}><AiTwotoneDelete /></button>
                                    </td>

                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
            {
                Object.keys(generatedData).length !== 0 && <BillModal generatedData={generatedData} customers={customers} products={products} show={show} handleShow={handleShow} />
            }

        </div>
    )
}

export default BillingTable
