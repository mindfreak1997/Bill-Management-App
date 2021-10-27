import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import ConfigureStore from './store/configureStore'

import { adminDetails, loginAction } from './actions/adminAction';
import { getAllCustomers } from './actions/customerAction';
import { getAllProducts } from './actions/productAction';
import { getAllBills } from './actions/billAction';


const store = ConfigureStore()
store.subscribe(() => {
  console.log(store.getState())
})
if (localStorage.getItem('token')) {
  store.dispatch(loginAction(true))
  store.dispatch(getAllCustomers())
  store.dispatch(getAllProducts())
  store.dispatch(getAllBills())
  store.dispatch(adminDetails())
}

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);


