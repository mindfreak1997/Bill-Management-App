import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import Select from 'react-select'
import { FaShoppingBag } from 'react-icons/fa'

const BillingForm = ({ addItems }) => {
    const [product, setProduct] = useState('')
    const [isButton, setButton] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const products = useSelector((state) => {
        return state.products
    })
    useEffect(() => {
        if (product.length > 0 && quantity > 0) {
            setButton(false)
        }
    })

    const selectProducts = []
    products.forEach(ele => {
        selectProducts.push({ label: ele.name, value: ele.name })
    })
    const filterProduct = () => {
        const productPrice = products.filter(ele => {
            return ele.name === product
        })

        return productPrice[0].price
    }
    const handleChange = (opt) => {
        setProduct(opt.value)
    }
    const handlePlus = () => {
        setQuantity(quantity + 1)
    }
    const handleMinus = () => {
        setQuantity(quantity - 1)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            id: uuidv4(),
            product: product,
            quantity: quantity,
            price: filterProduct()
        }
        addItems(formData)
        setProduct('')
        setQuantity(1)
        setButton(true)
    }
    return (
        <div style={{ maxWidth: '300px' }}>
            <h3 >Add Products</h3>
            <FaShoppingBag /><Select
                className='form-control mb-2'
                placeholder='select Product'
                options={selectProducts}
                onChange={handleChange}

            />
            <Button onClick={handleMinus}> -</Button> {quantity} <Button onClick={handlePlus}> +</Button> <br />
            <Button className='btn btn-warning form-control mt-2' disabled={isButton} onClick={handleSubmit}> Add Product</Button>

        </div>
    )
}

export default BillingForm
