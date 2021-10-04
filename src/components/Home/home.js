import React from 'react'
import bill from '../Assets/bill2.jpg'
import Login from '../login'
import './home.css'

const Home = () => {
    return (
        <div className='container'>

            <div className='row'>
                <h1 className='moto'>"You Trust, We Conquer"</h1>
                <img className="img-fluid w-50 col-md-6" src={bill} />
                <Login />

            </div>

        </div>
    )
}
export default Home