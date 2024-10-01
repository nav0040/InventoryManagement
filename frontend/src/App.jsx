import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/common/Sidebar'
import { Route, Routes } from "react-router-dom";
import OverviewPage from './pages/OverviewPage'
import Products from './pages/Products'
import Customers from './pages/Customers'
import Sales from './pages/Sales'
import { useDispatch, useSelector } from 'react-redux'
import { setInventory } from './slices/inventorySlice'
import axios from './instances/config'
import { setCustomers } from './slices/customerSlice'
import { fetchSales } from './slices/salesSlice'
import CustomerLedger from './pages/CustomerLedger'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './routes/PrivateRoute'

function App() {
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.user)

  const getItems = async () => {
    try {
      const { data } = await axios.get('/inventory/all');
      dispatch(setInventory(data))

    } catch (error) {

    }
  }

  const getCustomers = async () => {
    try {
      const { data } = await axios.get('/customers/all');
      dispatch(setCustomers(data))
      // console.log(data);


    } catch (error) {

    }
  }

  const getSales = async () => {
    try {
      const { data } = await axios.get('/sale/report');
      dispatch(fetchSales(data))
      // console.log(data);


    } catch (error) {

    }
  }


  useEffect(() => {
    getItems();
    getCustomers();
    getSales();

  }, [])

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      {/* BG */}
      <div className="fixed inset-0 z-0">
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80'></div>
        <div className='absolute inset-0 backdrop-blur-sm'></div>
      </div>

      {

        user && <Sidebar />
      }
      <Routes>
        <Route path='/' element={<PrivateRoute element={OverviewPage} />} />
        <Route path='/products' element={<PrivateRoute element={Products}  />} />
        <Route path='/customers' element={<PrivateRoute element={Customers} />} />
        <Route path='/sales' element={<PrivateRoute element={Sales} />} />
        <Route path='/customer/:customerId' element={<PrivateRoute element={CustomerLedger} />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
