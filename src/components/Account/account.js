import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Card, ListGroup } from 'react-bootstrap'

const Account = () => {
    const account = useSelector((state) => {
        return state.admin.account
    })

    return (
        <div className='col-md-6 '>

            <Card style={{ width: '18rem' }}>
                <Card.Header>Account Details</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>User Name : {account.username}</ListGroup.Item>
                    <ListGroup.Item>User ID : {account._id}</ListGroup.Item>
                    <ListGroup.Item>Email : {account.email}</ListGroup.Item>
                    <ListGroup.Item>Business:{account.businessName}</ListGroup.Item>
                    <ListGroup.Item>Address:{account.address}</ListGroup.Item>
                    <ListGroup.Item>started At:{moment(account.createdAt).subtract(10, 'days').calendar()}</ListGroup.Item>
                </ListGroup>
            </Card>

        </div>
    )
}

export default Account
