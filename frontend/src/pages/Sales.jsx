import React, { useState } from 'react'
import { motion } from "framer-motion";

import StatsCard from '../components/common/StatsCard'
import { ShoppingBag, Users, Zap } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { Toaster } from 'react-hot-toast';
import Header from '../components/common/Header';
import SalesTable from '../components/SalesTable';
import AddSaleModal from '../components/AddSaleModal';
import CustomersTable from '../components/CustomersTable';

const Sales = () => {

    const { customers } = useSelector((state) => state.customers);
    const { items } = useSelector((state) => state.inventories);
    const { sales } = useSelector((state) => state.sales);


    const [addSaleModalOpen, setAddSaleModalOpen] = useState(false);



    const showAddSaleModal = () => {
        setAddSaleModalOpen(true);
    };

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Toaster />
            <Header title='Sales' />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                {/* STATS */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                >
                        <StatsCard name="Total Sales" icon={Zap} value={sales.length} color='#6366F1' />
            <StatsCard name='New Users' icon={Users} value={customers.length} color='#8B5CF6' />
                    <StatsCard name='Total Products' icon={ShoppingBag} value={items.length} color='#EC4899' />


                </motion.div>

                <Button type='primary' className='my-5' onClick={showAddSaleModal}> Add Sales</Button>
                <AddSaleModal setAddSaleModalOpen={setAddSaleModalOpen} addSaleModalOpen={addSaleModalOpen} />

                {/* CHARTS */}
                <SalesTable data={sales} />
                
               

            </main>
        </div>
    )
}

export default Sales