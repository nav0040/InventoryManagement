import { Button, Form, Input, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import React from 'react'
import { useDispatch } from 'react-redux';
import { addItem } from '../slices/inventorySlice';
import toast from 'react-hot-toast';
import axios from '../instances/config'

const AddProductModal = ({ setAddProductModalOpen, addProductModalOpen }) => {

    const dispatch = useDispatch();

    const handleOk = () => {
        setAddProductModalOpen(false);
    };
    const handleCancel = () => {
        setAddProductModalOpen(false);
    };


    const handleAddItem = async (values) => {
        try {
            const res = await axios.post(`/inventory/create`, values);
          
            // console.log(res);

            dispatch(addItem(res.data.inventory))
            toast.success(res.data.message)
            setAddProductModalOpen(false);

        } catch (error) {
            toast.success(error.response.data.message)
            // console.log(error);


        }
    }
    return (
        <div>
            <Modal title="Add New Items" 
            footer
            open={addProductModalOpen}  >
                <Form
                    layout="vertical"
                    onFinish={(values) => handleAddItem(values)}
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
                    <div className='flex items-end justify-center gap-4'>
                        <Button htmlType='submit' className='bg-slate-500 text-white py-2 px-5'>Submit</Button>
                        <Button onClick={()=>setAddProductModalOpen(false)}>Cancel</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default AddProductModal