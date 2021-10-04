import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import BillingCart from './billingCart'
import BillingForm from './billingForm'
import BillingTable from './billingTable'



const Billing = () => {
    const [addedProducts, setProducts] = useState([])
    const [billData, setData] = useState([])
    const [billShow, setBillShow] = useState(false)
    const products = useSelector((state) => {
        return state.products
    })
    const customers = useSelector((state) => {
        return state.customers
    })
    const clearCart = () => {
        setProducts([])
        setData([])
    }
    const filteredProduct = (product) => {
        const productId = products.filter(ele => {
            return ele.name === product
        })
        return productId
    }

    const addItems = (formData) => {
        const result = filteredProduct(formData.product)
        const data = {
            product: result[0]._id,
            quantity: formData.quantity
        }
        console.log(addedProducts)
        setProducts([...addedProducts, formData])
        setData([...billData, data])
    }
    const removeItems = (id) => {
        const remove = addedProducts.filter(ele => {
            return ele.id !== id
        })
        setProducts(remove)
    }
    const handleClose = () => {
        setBillShow(false)
    }
    return (
        <div className='container '>

            <div className='row text-alignmen-centre'>

                <BillingTable customers={customers} products={products} />
                <div className='col-md-2'>
                    <Button onClick={() => {
                        setBillShow(true)
                    }}>Add Bill</Button>
                </div>

                <div >
                    <Modal className='text-centre' show={billShow} >
                        <Modal.Header >
                            <Modal.Title>Customer Bill</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='row'>
                                <BillingForm addItems={addItems} customers={customers} />
                                <BillingCart addedProducts={addedProducts} billData={billData} clear={clearCart} removeItems={removeItems} handleClose={handleClose} />

                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>


            </div>
        </div>
    )
}

export default Billing
