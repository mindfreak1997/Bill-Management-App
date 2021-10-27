const initialState = []

const billReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_BILL': {
            return [...state, action.payload]
        }
        case 'GET_BILL': {
            return [...action.payload]
        }
        case 'DELETE_BILL': {
            return state.filter(ele => {
                return ele._id !== action.payload
            })
        }
        default: {
            return [...state]
        }
    }
}
export default billReducers