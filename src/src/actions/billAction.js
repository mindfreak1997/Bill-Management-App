import axios from "../Config/axios-config"

export const asyncBill = (formData, clear, handleData, clearCart, handleShow, handleClose) => {
    return (dispatch) => {
        axios.post('/bills', formData,
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
                    dispatch(addBillAction(result))
                    clear()
                    handleData(result)
                    clearCart()
                    handleShow()



                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}
const addBillAction = (data) => {
    return {
        type: 'ADD_BILL',
        payload: data
    }
}
export const getAllBills = () => {
    return (dispatch) => {
        axios.get('/bills',
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
                    dispatch(billAction(result))
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}
const billAction = (data) => {
    return {
        type: 'GET_BILL',
        payload: data
    }
}
export const deleteBills = (id) => {
    return (dispatch) => {
        axios.delete(`/bills/${id}`,
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
        type: 'DELETE_BILL',
        payload: id
    }
}