const initialState = []

const customerReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CUSTOMER': {
            return [...state, { ...action.payload }]
        }
        case 'GET_CUSTOMER': {
            return [...action.payload]
        }
        case 'EDIT_CUSTOMER': {
            return state.map(ele => {
                if (ele._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return { ...ele }
                }
            })
        }
        case 'DELETE_CUSTOMER': {
            return state.filter(ele => {
                return ele._id !== action.payload
            })
        }
        default: {
            return [...state]
        }
    }
}
export default customerReducers