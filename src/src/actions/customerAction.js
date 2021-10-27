import axios from "../Config/axios-config"

export const startCustomer = (formData, resetForm) => {
    return (dispatch) => {
        axios.post('/customers', formData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                const result = res.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.message)
                } else {
                    dispatch(addCustomer(result))
                    resetForm()
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}
const addCustomer = (result) => {
    return {
        type: 'ADD_CUSTOMER',
        payload: result
    }
}

export const getAllCustomers = () => {
    return (dispatch) => {
        axios.get('/customers',
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
                    dispatch(getCustomers(result))

                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}
const getCustomers = (result) => {
    return {
        type: 'GET_CUSTOMER',
        payload: result
    }
}

export const editCustomer = (formData, id, handleClose) => {
    return (dispatch) => {
        axios.put(`/customers/${id}`, formData,
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
const editAction = (data) => {
    return {
        type: 'EDIT_CUSTOMER',
        payload: data
    }
}

export const deleteCustomer = (id) => {
    return (dispatch) => {
        axios.delete(`/customers/${id}`,
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
        type: 'DELETE_CUSTOMER',
        payload: id
    }
}