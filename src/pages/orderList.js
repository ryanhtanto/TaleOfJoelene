import React from 'react'
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import OrderTable from '../components/order-table-list';

function OrderList() {
  return (
        <div className='container'>
                <h1 className='fw-bold text-uppercase text-center'>Order List</h1>
                <OrderTable />
                <Link to={`/addOrder`}>
                        <div className='float'>
                                <FaPlus className='my-float'/>
                        </div>
                </Link>
        </div>
  );
}

export default OrderList;