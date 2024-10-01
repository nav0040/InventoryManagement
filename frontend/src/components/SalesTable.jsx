import React, { useRef, useState } from 'react'


import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import { Tooltip } from 'antd';
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { message, Popconfirm } from 'antd';
import axios from '../instances/config'
import { Toaster, toast } from 'react-hot-toast'
import EditModal from './EditModal';
import { useNavigate } from 'react-router-dom';


const SalesTable = ({data}) => {

    
  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingData, setEditingData] = useState({});


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}

      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => 
    
    record.customer?.name ? record.customer.name.toString().toLowerCase().includes(value.toLowerCase()) : false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('YYYY-MM-DD HH:mm:ss'), // Format date
    },
    {
      title: 'Item',
      dataIndex: ['item', 'name'],
      key: 'itemName',
      width: '20%',
    
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Customer Name',
      dataIndex: ['customer', 'name'], // Access nested customer name
      key: 'customerName',
      ...getColumnSearchProps('customerName'),

      render: (text,record) =>(
        <span className='cursor-pointer' onClick={()=> navigate(`/customer/${record.customer._id}`)}>
          {/* Show '-' if customer is not available */}
        {text || '-'}

        </span>
     )
        
    },
    {
      title: 'Sale Type',
      dataIndex: 'saleType',
      key: 'saleType',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => {
        return totalPrice ? `Rs ${totalPrice.toLocaleString()}` : '-';
      },
    },
    
   
  ];

  // const confirm = async (id) => {
  //   // console.log(id);
  //   try {
  //     const { data } = await axios.delete(`/inventory/delete/${id}`);
  //     toast.success(data.message);
  //   } catch (error) {
  //     toast.error(error.response.data.message)
  //   }
  // };

  // const cancel = (e) => {
  //   toast.success('Cancelled');
  // };




 


  return (
    <Table columns={columns} dataSource={data} rowKey={(record) => record._id} className="custom-ant-table" />

  )
}

export default SalesTable