const initialState = []

const productReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT': {
            return [...state, { ...action.payload }]
        }
        case 'GET_PRODUCTS': {
            return [...action.payload]
        }

        case 'EDIT_PRODUCT': {
            return state.map(ele => {
                if (ele._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return { ...ele }
                }
            })
        }
        case 'DELETE_PRODUCT': {
            return state.filter(ele => {
                return ele._id !== action.payload
            })
        }
        default: {
            return [...state]
        }
    }
}
export default productReducers