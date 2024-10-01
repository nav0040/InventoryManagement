import React, { useState } from 'react'
import { motion } from "framer-motion";

import Header from '../components/common/Header'
import { ShoppingBag, Users, Zap } from 'lucide-react';
import StatsCard from '../components/common/StatsCard';
import { useSelector } from 'react-redux';
import axios from '../instances/config'

const OverviewPage = () => {

  const { customers } = useSelector((state) => state.customers);
  const { items } = useSelector((state) => state.inventories);
  const { sales } = useSelector((state) => state.sales);


  const [email, setEmail] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [message, setMessage] = useState('');

  const handleExportExcel = async () => {
    try {
      const res = await axios.get('/export/excel', {
        responseType: 'blob',
      });
      console.log(res);


      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', 'sales_report.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting Excel:', error);
    }
  }


  const handleExportPdf = async () => {
    try {
      const res = await axios.get('/export/pdf', {
        responseType: 'blob',
      });
      // console.log(res);

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sales_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();


    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  }


  const handleSendEmail = async () => {
    try {
      if (!email) {
        setMessage('Please provide a valid email address.');
        return;
      }


      setIsSendingEmail(true);
      setMessage('');

      await axios.post('export/email', { email });
      setMessage('Email sent successfully');
    } catch (error) {
      setMessage('Error sending email');
      console.error('Error sending email:', error);
    }
    finally {
      setIsSendingEmail(false);
    }
  }

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Overview' />

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

        <div>
          <h2>Export Sales Data</h2>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 my-8'>

            <motion.div
              className='bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700'
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
            >
              <div className='px-4 py-5 sm:p-6 flex justify-center items-center h-[200px]'>
                <button onClick={handleExportExcel} >Export to Excel</button>

              </div>

            </motion.div>

            <motion.div
              className='bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700'
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
            >
              <div className='px-4 py-5 sm:p-6 flex justify-center items-center h-[200px]'>
                <button onClick={handleExportPdf}>Export to PDF</button>

              </div>

            </motion.div>

            <motion.div
              className='bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700'
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
            >
              <div className='px-4 py-5 sm:p-6'>
                <h3 className='text-center'>Email Sales Report</h3>

                <div className='flex flex-col gap-2 my-3'> 
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter recipient email"
                    className='border-none outline-none placeholder:text-gray-500 p-3 rounded-md text-gray-800'
                  />
                  <button onClick={handleSendEmail} disabled={isSendingEmail} className='bg-gray-800 bg-opacity-50 backdrop-blur-md border border-gray-700 p-2 rounded-md'>
                    {isSendingEmail ? 'Sending...' : 'Send Email'}
                  </button>
                </div>
                {message && <p className='text-center'>{message}</p>}


              </div>

            </motion.div>


          </div>

        </div>
      </main>
    </div>
  )
}

export default OverviewPage