import axios from "../Config/axios-config"

export const startProduct = (formData, resetForm) => {
    return (dispatch) => {
        axios.post('/products', formData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')} `
                }
            })
            .then((res) => {
                const result = res.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.message)
                } else {
                    dispatch(productAction(result))
                    resetForm()
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const productAction = (result) => {
    return {
        type: 'ADD_PRODUCT',
        payload: result
    }
}
export const getAllProducts = () => {
    return (dispatch) => {
        axios.get('/products',
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')} `
                }
            })
            .then((res) => {
                const result = res.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.message)
                } else {
                    dispatch(getProducts(result))

                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}
const getProducts = (result) => {
    return {
        type: 'GET_PRODUCTS',
        payload: result
    }
}

export const deleteProduct = (id) => {
    return (dispatch) => {
        axios.delete(`/products/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')} `
                }
            })
            .then((res) => {
                const result = res.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.message)
                } else {
                    dispatch(deleteAction(result._id))

                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}
const deleteAction = (id) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: id
    }
}

export const editProduct = (formData, id, handleClose) => {
    return (dispatch) => {
        axios.put(`/products/${id}`, formData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')} `
                }
            })
            .then((res) => {
                const result = res.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.message)
                } else {
                    dispatch(editAction(result))
                    handleClose()
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}
const editAction = (result) => {
    return {
        type: 'EDIT_PRODUCT',
        payload: result
    }
}