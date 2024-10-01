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
import { useDispatch } from 'react-redux';
import { deleteItem } from '../slices/inventorySlice';



// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Joe Black',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Jim Green',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     age: 32,
//     address: 'London No. 2 Lake Park',
//   },
// ];


const ProductsTable = ({ data }) => {

  const dispatch = useDispatch();

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
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
      ...getColumnSearchProps('price'),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '10%',
      ...getColumnSearchProps('quantity'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
      ...getColumnSearchProps('description'),
      render: (description) => (
        <Tooltip title={description}>
          {description?.length > 20 ? `${description.substring(0, 20)}...` : description}
        </Tooltip>
      )
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '10%',
      ...getColumnSearchProps('createdAt'),
      render: (createdAt) => moment(createdAt).format('YYYY-MM-DD'),

    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (text, record) => (
        <div className='flex gap-4'>
          <Popconfirm
            title="Delete the item"
            description="Are you sure to delete this item?"
            onConfirm={() => confirm(record._id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <AiOutlineDelete className='text-[25px] cursor-pointer' />
          </Popconfirm>

          <CiEdit className='text-[25px] cursor-pointer' onClick={()=>showLoading(record)} />
          <EditModal
            showLoading={showLoading}
            loading={loading}
            editingData={editingData}
            setLoading={setLoading}
            setOpen={setOpen}
            open={open}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </div>
      )
    },
  ];

  const confirm = async (id) => {
    // console.log(id);
    try {
      const { data } = await axios.delete(`/inventory/delete/${id}`);
      dispatch(deleteItem(id))
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  const cancel = (e) => {
    toast.success('Cancelled');
  };


  const showLoading = (record) => {
    setOpen(true);
    setLoading(true);
    setEditingData(record)
    

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };


  const handleOk = () => {
    // setOpen(false);
    console.log('id');

  };
  const handleCancel = () => {
    setOpen(false);
  };


  return (
    <>
      <Table columns={columns} dataSource={data} className="custom-ant-table" />

    </>
  )
}

export default ProductsTable