import React from 'react'
import { Route } from 'react-router-dom'
import NavBar from './components/Navigation/navbar'
import Home from './components/Home/home'
import Register from './components/register'
import AdminDashboard from './components/Dashboard/adminDashboard'
import Product from './components/Products/product'
import Customer from './components/Customers/customer'
import Billing from './components/Billing/Billing'
import PrivateRoute from './components/helper/privateRoute'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'



const App = (props) => {

  return (
    <div className=''>

      <NavBar />

      <Route path='/' component={Home} exact={true} />
      <Route path='/signup' component={Register} />
      <PrivateRoute path='/dashboard' component={AdminDashboard} />
      <PrivateRoute path='/products' component={Product} />
      <PrivateRoute path='/customers' component={Customer} />
      <PrivateRoute path='/bills' component={Billing} />

    </div>
  )
}
export default App