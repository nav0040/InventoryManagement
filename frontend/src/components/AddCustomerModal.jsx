import { Button, Form, Input, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import axios from '../instances/config'
import { addCustomer } from '../slices/customerSlice';

const AddCustomerModal = ({setAddCustomerModalOpen,addCustomerModalOpen}) => {

    
    const dispatch = useDispatch();



    const handleAddCutomer = async (values) => {
        try {
            const res = await axios.post(`/customers/create`, values);
          
            console.log(res);

            dispatch(addCustomer(res.data.customer))
            toast.success(res.data.message)
            setAddCustomerModalOpen(false);

        } catch (error) {
            toast.success(error.response.data.message)
            console.log(error);


        }
    }
  return (
    <div>
         <Modal title="Basic Modal" open={addCustomerModalOpen} footer >
                <Form
                    layout="vertical"
                    onFinish={(values) => handleAddCutomer(values)}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter the name' }]}
                    >
                        <Input />
                    </Form.Item>
                   
                    <Form.Item
                        label="Mobile Number"
                        name="mobileNumber"
                        rules={[{ required: true, message: 'Please enter the mobile number' }]}
                    >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please enter the address' }]}
                    >
                        <TextArea />
                    </Form.Item>

                    <div className='flex items-end justify-center gap-4'>
                        <Button htmlType='submit' className='bg-slate-500 text-white py-2 px-5'>Submit</Button>
                        <Button onClick={()=>setAddCustomerModalOpen(false)}>Cancel</Button>
                    </div>
                </Form>
            </Modal>
    </div>
  )
}

export default AddCustomerModal