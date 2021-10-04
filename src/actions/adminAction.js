import axios from '../Config/axios-config'
import { getAllBills } from './billAction'
import { getAllCustomers } from './customerAction'
import { getAllProducts } from './productAction'
import swal from 'sweetalert'



export const startUserReg = (formData, redirectLogin) => {
    return (dispatch) => {
        axios.post('/users/register', formData)
            .then((res) => {
                const result = res.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.message)
                } else {
                    swal('You have been sucesfully registered', {
                        icon: 'success'
                    })

                    redirectLogin()
                }

            })
            .catch((res) => {
                alert(res.message)
            })
    }
}


export const adminLogin = (formData, redirectAdmin) => {
    return (dispatch) => {
        axios.post('/users/login', formData,
            {
                Headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                const result = res.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.message)
                } else {
                    localStorage.setItem('token', result.token)
                    swal("sucessfully loged in", {
                        icon: 'success'
                    })
                    dispatch(loginAction(true))
                    dispatch(getAllCustomers())
                    dispatch(getAllProducts())
                    dispatch(getAllBills())
                    dispatch(adminDetails())
                    redirectAdmin()
                }
            })
            .catch((res) => {
                alert(res.message)
            })

    }
}
export const loginAction = (condition) => {
    return {
        type: 'LOGIN',
        payload: condition
    }
}

export const adminDetails = () => {
    return (dispatch) => {
        axios.get('/users/account', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                const data = response.data
                dispatch(getDetails(data))
            })
            .catch((err) => {
                console.log(err.message);
            })
    }
}
const getDetails = (data) => {
    return {
        type: 'ACCOUNT_DETAIL',
        payload: data
    }
}