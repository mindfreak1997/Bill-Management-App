import React, { useState } from 'react'

const ProductForm = ({ formSubmission, name, price: cost, id }) => {
    const [product, setProduct] = useState(name ? name : '')
    const [price, setPrice] = useState(cost ? cost : '')
    const [formError, setError] = useState({})

    const error = {}
    const runValidation = () => {
        if (product.length === 0) {
            error.product = 'product cannot be blank'
        }
        if (price.length === 0) {
            error.price = 'price cannot be blank'
        }
    }
    const handleChange = (e) => {
        if (e.target.name === 'product') {
            setProduct(e.target.value)
        } else if (e.target.name === 'price') {
            setPrice(e.target.value)
        }
    }
    const resetForm = () => {
        setProduct('')
        setPrice('')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setError({})
        runValidation()
        if (Object.keys(error).length === 0) {
            const formData = {
                name: product,
                price: price
            }
            console.log(id)
            formSubmission(formData, resetForm, id)
        } else {
            setError(error)
        }
    }
    return (
        <div className='col-lg-4'>

            <form style={{ maxWidth: '300px', margin: 'auto' }} onSubmit={handleSubmit}>
                {
                    price ? <h3> Edit product</h3> : <h3>Add product</h3>
                }
                <input type='text' className='form-control' name='product' placeholder='Enter Product' value={product} onChange={handleChange} />
                {
                    formError.product && <span style={{ color: 'red' }}>{formError.product}</span>
                }
                <br />
                <input type='text' className='form-control' name='price' placeholder='Enter Price' value={price} onChange={handleChange} />
                {
                    formError.price && <span style={{ color: 'red' }}>{formError.price}</span>
                }
                <br />
                {
                    price ? (
                        <input className='btn btn-success' type='Submit' value='Save' />
                    ) : (
                        <input className='btn btn-success' type='Submit' value='Add Product' />
                    )
                }

                <button className='btn btn-secondary' onClick={resetForm}>Cancel</button>
            </form>
        </div>
    )
}

export default ProductForm
