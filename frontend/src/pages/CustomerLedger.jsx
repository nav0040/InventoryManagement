import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";

import StatsCard from '../components/common/StatsCard'
import { ShoppingBag, Users, Zap } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { Toaster } from 'react-hot-toast';
import Header from '../components/common/Header';
import SalesTable from '../components/SalesTable';
import CustomerLedgerTable from '../components/CustomerLedgerTable';
import { useParams } from 'react-router-dom';
import axios from '../instances/config'

const CustomerLedger = () => {

    const { customers } = useSelector((state) => state.customers);
    const { items } = useSelector((state) => state.inventories);
    const { sales } = useSelector((state) => state.sales);

    const {customerId} = useParams();
  const [customerLedgerData, setCustomerLedgerData] = useState()



  const fetchCustomerSales = async()=>{
    try {
      const res=  await axios.get(`/sale/customer/${customerId}`)
      console.log(res);
      setCustomerLedgerData(res.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }

//   console.log(customerLedgerData);

const totalSales = customerLedgerData && customerLedgerData.reduce((acc,sale)=> acc+sale.totalPrice, 0);

console.log(totalSales);

  

  useEffect(() => {
    
    fetchCustomerSales();
  }, [setCustomerLedgerData,axios]);

  return (
    <div className='flex-1 overflow-auto relative z-10'>
    <Toaster />
    <Header title={`Sales - ${ customerLedgerData && customerLedgerData[0].customer.name}`}/>

    <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* STATS */}
        <motion.div
            className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
        >
            <StatsCard name="Total Sales" icon={Zap} value={sales.length} color='#6366F1' />
            <StatsCard name='New Users' icon={Users} value={customers.length} color='#8B5CF6' />
            <StatsCard name='Total Products' icon={ShoppingBag} value={items.length} color='#EC4899' />


        </motion.div>


        {/* CHARTS */}
        <CustomerLedgerTable data={customerLedgerData} />


          <div className='my-5 text-end'>
          Total Sales: Rs. {totalSales.toLocaleString()}
          </div>
        
       

    </main>
</div>
  )
}

export default CustomerLedger