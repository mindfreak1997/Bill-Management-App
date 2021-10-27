import React from 'react'
import { Modal, Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import html2pdf from 'html2pdf.js'
import { format } from 'date-fns'
//const ref = React.createRef()
const BillModal = ({ generatedData, products, customers, show, handleShow }) => {
    const account = useSelector((state) => {
        return state.admin.account
    })
    const bills = useSelector((state) => {
        return state.bills
    })

    const filter = (data, array) => {
        const result = array.find(ele => {
            return ele._id === data
        })
        return result.name
    }
    const filterCustomers = () => {
        const result = customers.find(ele => {
            return ele._id === generatedData.customer
        })


        return result
    }
    const customerDetails = filterCustomers()


    const toPdf = () => {
        const element = document.getElementById('html');
        const opt = {
            margin: 1,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }
        html2pdf().set(opt).from(element).save()
    }
    return (

        <Modal show={show} style={{ margin: '10px' }}>
            <div id='html'>
                <Modal.Header className='row bg-primary'>
                    <Modal.Title className='col-lg-6 text-white'>INVOICE</Modal.Title>
                    <div className='col-md-6 text-white'>
                        <b>{account.businessName}</b>
                        <blockquote>{account.address}</blockquote>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='row '>
                        <div className='col-lg-6'>
                            <b>Biled to: </b>
                            <b>{customerDetails.name}</b>
                            <b>{customerDetails.address}</b>
                        </div>
                        <div className='col-lg-6'>

                            <b>Issued Date: </b>
                            <b>{format(new Date(generatedData.date), 'dd/MM/yyyy ')}</b>


                        </div>

                    </div>

                    {

                        <Table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Unit Price</th>
                                    <th>Qty</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    generatedData.lineItems.map(ele => {
                                        return (
                                            <tr>
                                                <td>{filter(ele.product, products)}</td>
                                                <td>{ele.price}</td>
                                                <td>{ele.quantity}</td>
                                                <td>{ele.subTotal}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td colSpan='4'></td>
                                </tr>
                                <tr>
                                    <td colSpan='3'><b> Total</b></td>
                                    <td>{generatedData.total}</td>
                                </tr>
                            </tbody>
                        </Table>


                    }
                </Modal.Body>
            </div>
            <Modal.Footer>


                <button className='btn btn-primary' onClick={toPdf}>Download Pdf</button>

                <Button variant="secondary" onClick={handleShow}>
                    Close
                </Button>


            </Modal.Footer>

        </Modal>


    )
}

export default BillModal
