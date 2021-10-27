import React from 'react'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import { Table } from 'react-bootstrap'

const DashboardTable = ({ customers, bills }) => {

    const revereseBill = () => {
        const bill = []
        for (let i = bills.length - 1; i > bills.length - 6; i--) {
            bill.push(bills[i])
        }
        return bill
    }
    const data = revereseBill()
    const filter = (data, array) => {
        const result = array.find(ele => {
            return ele._id === data
        })
        return result.name
    }
    return (
        <div className='col-md-6'>
            <h5>Latest Sales</h5>
            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th>Customer</th>
                        <th>Total</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map(ele => {
                        return (
                            <tr key={ele._id}>

                                <td>{filter(ele.customer, customers)}</td>

                                <td>{ele.total}</td>


                            </tr>
                        )
                    })
                    }

                </tbody>
            </Table>
        </div>
    )
}

export default DashboardTable
