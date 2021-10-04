import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Table } from 'react-bootstrap'
import { format } from 'date-fns'
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai'
import { deleteCustomer, editCustomer } from '../../actions/customerAction'
import CustomerForm from './customerForm'
import { ascendingByName, decendingByName } from '../helperSort'


const CustomerTable = () => {
    const dispatch = useDispatch()
    const customers = useSelector((state) => {
        return state.customers
    })
    const bills = useSelector((state) => {
        return state.bills
    })
    const [search, setSearch] = useState('')
    const [select, setSelect] = useState('')
    const [customerBill, setCustomerBill] = useState([])
    const [show, setShow] = useState(false)
    const [editData, setData] = useState({})
    const [filteredCustomers, setCustomers] = useState([])
    const handleChange = (e) => {
        if (e.target.name === 'search') {
            setSearch(e.target.value)
            filter()
        }
        if (e.target.name === 'select') {
            setSelect(e.target.value)
            if (select === 'ascending') {
                setCustomers(ascendingByName(customers))
            } else if (select === 'descending') {
                setCustomers(decendingByName(customers))
            }
        }
    }
    const filter = () => {
        const searched = customers.filter(ele => {
            return ele.name.includes(search)
        })
        setCustomers(searched)
    }
    const handleClose = () => {
        setShow(false)
    }
    const handleEdit = (ele) => {
        setShow(true)
        setData(ele)
    }
    const handleAllBills = (id) => {
        const allBills = bills.filter(ele => {
            return ele.customer === id
        })
        setCustomerBill(allBills)

    }
    const handleDelete = (id) => {
        dispatch(deleteCustomer(id))
    }
    const formSubmission = (formData, resetForm, id) => {
        dispatch(editCustomer(formData, id, handleClose))
    }

    return (

        <div className='col-lg-8' >

            <input type='search' name='search' value={search} placeholder='search by name' onChange={handleChange} />
            <select value={select} name='select' onChange={handleChange}>
                <option>order By</option>
                <option value='ascending'>Ascending</option>
                <option value='descending'>Descending</option>
            </select>
            <Table striped bordered hover size='xs'>
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Customer Name</th>
                        <th>email</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (search.length === 0 ? customers : filteredCustomers).map((ele, i) => {
                            return (
                                <tr key={ele._id}>
                                    <td>{i + 1}</td>
                                    <td>{ele.name}</td>
                                    <td>{ele.email}</td>
                                    <td>{format(new Date(ele.createdAt), 'dd/MM/yyyy ')}</td>
                                    <td>{format(new Date(ele.updatedAt), 'dd/MM/yyyy ')}</td>
                                    <td>
                                        <div>
                                            <button className='primary' onClick={() => {
                                                handleEdit(ele)
                                            }}><AiFillEdit /></button>
                                            <button onClick={() => {
                                                handleDelete(ele._id)
                                            }}><AiTwotoneDelete /></button>
                                        </div>
                                    </td>
                                </tr>
                            )


                        })
                    }
                </tbody>
            </Table>
            <Modal show={show} >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomerForm formSubmission={formSubmission} {...editData} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default CustomerTable
