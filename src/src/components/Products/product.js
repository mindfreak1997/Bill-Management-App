import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startProduct } from '../../actions/productAction'
import ProductForm from './productForm'
import ProductTable from './productTable'

const Product = () => {
    const dispatch = useDispatch()
    const formSubmission = (formData, resetForm) => {
        dispatch(startProduct(formData, resetForm))
    }
    return (
        <div className='container'>
            <div className='row'>
                <h3>Product Details</h3>
                <ProductTable />
                <ProductForm formSubmission={formSubmission} />

            </div>
        </div>
    )
}

export default Product
