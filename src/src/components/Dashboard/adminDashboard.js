import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import DashboardTable from './dashboardTable'
import './adminDashboard.css'
import Account from '../Account/account'
import MonthlyChart from './monthy-chart'

import PieChart from './pieChart'

const AdminDashboard = () => {

    const customers = useSelector((state) => {
        return state.customers
    })
    const products = useSelector((state) => {
        return state.products
    })
    const bills = useSelector((state) => {
        return state.bills
    })
    console.log('bills', bills)
    return (
        <div className='container'>
            <div className='row '>

                <div className='col-sm-4 '>
                    <Card bg='dark'
                        text='light'
                        style={{ width: '15rem', height: '10rem' }}
                        className="ml-5 "
                    >
                        <Card.Body>
                            <Card.Title><h1> {bills.length}</h1></Card.Title>
                            <Card.Text>
                                Total Sales
                            </Card.Text>
                        </Card.Body>

                    </Card>
                </div>
                <div className='col-sm-4'>
                    <Card bg='dark'
                        text='light'
                        style={{ width: '15rem', height: '10rem' }}
                        className=" ml-5"
                    >

                        <Card.Body>
                            <Card.Title className='h2'><h1> {customers.length}</h1></Card.Title>
                            <Card.Text >
                                Total Customers
                            </Card.Text>
                        </Card.Body>

                    </Card>
                </div>
                <div className='col-sm-4 '>
                    <Card bg='dark'
                        text='light'
                        style={{ width: '15rem', height: '10rem' }}
                        className=" ml-5"
                    >

                        <Card.Body>
                            <Card.Title> <h1>{products.length}</h1></Card.Title>
                            <Card.Text>
                                Total Products
                            </Card.Text>
                        </Card.Body>

                    </Card>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <h5 className='my-8 font-weight-bold-display-4 pb-5 text-centre'>Monthly Chart</h5>

                        <MonthlyChart bills={bills} />
                    </div>
                    <PieChart bills={bills} />
                </div>
                <div className='row'>

                    <Account />
                </div>



            </div>
        </div>
    )
}

export default AdminDashboard
