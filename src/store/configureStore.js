
import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { adminReducers } from "../reducers/adminReducers"
import billReducers from "../reducers/billReducers"
import customerReducers from "../reducers/customerReducers"
import productReducers from "../reducers/productReducers"

const ConfigureStore = () => {
    const store = createStore(combineReducers({
        admin: adminReducers,
        products: productReducers,
        customers: customerReducers,
        bills: billReducers
    }), applyMiddleware(thunk))
    return store
}
export default ConfigureStore