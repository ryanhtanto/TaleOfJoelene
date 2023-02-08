import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import OrderForm from '../components/add-order-form';

function AddOrder() {
  return (
       <div className='container mt-5'>
                <div className='d-flex'>
                        <Link to={`/orderList`}>
                                <FaArrowLeft className='arrow mt-3'/>
                        </Link>
                        <h1 className='ml-4'>Add Order</h1>
                </div>
                <OrderForm />
       </div>
  );
}

export default AddOrder;
