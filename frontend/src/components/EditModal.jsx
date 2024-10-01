import { Button, Form, Input, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { Toaster, toast } from 'react-hot-toast'

import axios from '../instances/config'
import { useDispatch } from 'react-redux'
import { updateItem } from '../slices/inventorySlice'

const EditModal = ({
    showLoading,
    loading,
    setLoading,
    setOpen,
    open,
    handleCancel,
    handleOk,
    editingData
}) => {

    const dispatch = useDispatch();


    const handleUpdate = async(values)=>{
        try {
            const res=  await axios.put(`/inventory/update/${editingData._id}`,values);
            // toast.success(date)
            console.log(res);
            
            dispatch(updateItem(res.data.updatedItem))
            toast.success(res.data.message)
            setOpen(false);
            
        } catch (error) {
            toast.success(error.response.data.message)
            // console.log(error);
            
            
        }
    }


    return (
        <div>
            <Modal
                title={<p>Edit Item</p>}
                // onOk={handleOk} onCancel={handleCancel}
                footer={false}
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}
            >
                <Form
                    initialValues={editingData}
                    layout="vertical"
                    onFinish={(values)=>handleUpdate(values)}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter the name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please enter the description' }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: 'Please enter the quantity' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please enter the price' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <div className='flex items-end justify-center'>
                    <Button htmlType='submit' className='bg-slate-500 text-white py-2 px-5'>Submit</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default EditModal