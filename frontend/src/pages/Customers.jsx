import { useEffect, useRef, useState } from 'react';

import { motion } from "framer-motion";

import Header from '../components/common/Header'
import { ShoppingBag, Users, Zap } from 'lucide-react';
import StatsCard from '../components/common/StatsCard';
import ProductsTable from '../components/ProductsTable';
import { Toaster, toast } from 'react-hot-toast'
import axios from '../instances/config'
import { useDispatch, useSelector } from 'react-redux';
import { setInventory } from '../slices/inventorySlice';
import CustomersTable from '../components/CustomersTable';
import { setCustomers } from '../slices/customerSlice';
import { Button } from 'antd';
import AddCustomerModal from '../components/AddCustomerModal';




const Customers = () => {

    const dispatch = useDispatch();
    const {customers }= useSelector((state) => state.customers);
    const {items }= useSelector((state) => state.inventories);
    const { sales } = useSelector((state) => state.sales);

    // console.log(items);

    const [addCustomerModalOpen, setAddCustomerModalOpen] = useState(false)
    
  
    const showAddCustomerModal = () => {
        setAddCustomerModalOpen(true);
      };
    
  
   

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Toaster />
            <Header title='Customers' />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                {/* STATS */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                >
            <StatsCard name="Total Sales" icon={Zap} value={sales.length} color='#6366F1' />
            <StatsCard name='New Users' icon={Users} value={customers.length} color='#8B5CF6' />
                    <StatsCard name='Total Products' icon={ShoppingBag} value={items.length} color='#EC4899' />


                </motion.div>

                <Button type='primary' className='my-5' onClick={showAddCustomerModal}> Add Customer</Button>
                <AddCustomerModal setAddCustomerModalOpen={setAddCustomerModalOpen} addCustomerModalOpen={addCustomerModalOpen}   />
                {/* CHARTS */}
                <CustomersTable data={customers} />
            </main>
        </div>
    )
}

export default Customers