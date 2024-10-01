import { Button, Form, Input, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createSale } from '../slices/salesSlice';
import toast from 'react-hot-toast';
import axios from '../instances/config'

const { Option } = Select;



const AddSaleModal = ({ setAddSaleModalOpen, addSaleModalOpen }) => {
    const dispatch = useDispatch();

    const { items } = useSelector((state) => state.inventories);
    const { customers } = useSelector((state) => state.customers);

    const [form] = Form.useForm();

    const [saleType, setSaleType] = useState('Cash');

    const handleAddSale = async (values) => {
        console.log(values);
        
        try {
            const res = await axios.post(`/sale/create`, values);

            // console.log(res);

            dispatch(createSale(res.data.newSale))
            toast.success(res.data.message)
            setAddSaleModalOpen(false);

        } catch (error) {
            toast.success(error.response.data.message)
            console.log(error);
            setAddSaleModalOpen(false);



        }
    }


    const handleSaleTypeChange = (value) => {
        setSaleType(value);
        form.setFieldsValue({ customer: undefined }); // Clear customer field when saleType changes
      };

    useEffect(() => {
        if (!addSaleModalOpen) {
          setSaleType('Cash'); 
        }
      }, [addSaleModalOpen])
    return (
        <div>
            <Modal title="Add Sale"
                footer
                open={addSaleModalOpen}  >
                <Form
                    form={form}
                    layout="vertical"
                    onValuesChange={(changedValues, allValues) => {
                        if (changedValues.saleType) {
                            form.setFieldsValue({ customer: undefined }); // Clear customer field when saleType changes
                        }
                    }}
                    onFinish={(values) => handleAddSale(values)}
                >
                    <Form.Item
                        label="Item"
                        name="itemId"
                        rules={[{ required: true, message: 'Please select an item!' }]}
                    >
                        <Select placeholder="Select an Item">
                            {items.map((item) => (
                                <Option key={item._id} value={item._id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: 'Please enter the quantity' }]}
                    >
                        <Input type="number" />
                    </Form.Item>


                    <Form.Item
                        label="Sale Type"
                        name="saleType"
                        initialValue="Cash"
                        rules={[{ required: true, message: 'Please select a sale type!' }]}
                    >
                        <Select onChange={handleSaleTypeChange}>
                            <Option value="Cash">Cash</Option>
                            <Option value="Customer">Customer</Option>
                        </Select>
                    </Form.Item>


                    {form.getFieldValue('saleType') === 'Customer' && (
                        <Form.Item
                            label="Customer"
                            name="customerId"
                            rules={[{ required: true, message: 'Please select the customer!' }]}
                        >
                            <Select onChange={(value) => form.setFieldsValue({ customer: value })}>
                                {customers.map((customer) => (
                                    <Option key={customer._id} value={customer._id}>
                                        {customer.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}
                    {/* <Form.Item
                        label="Price"
                        name="totalPrice"
                        rules={[{ required: true, message: 'Please enter the price' }]}
                    >
                        <Input type="number" />
                    </Form.Item> */}
                    <div className='flex items-end justify-center gap-4'>
                        <Button htmlType='submit' className='bg-slate-500 text-white py-2 px-5'>Record Sale</Button>
                        <Button onClick={() => setAddSaleModalOpen(false)}>Cancel</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default AddSaleModal