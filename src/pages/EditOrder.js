import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import EditOrderForm from '../components/edit-order-form';

function EditOrders() {
        const { id } = useParams();
        return (
                <div className='container mt-5'>
                        <div className='d-flex'>
                                <Link to={`/orderList`}>
                                        <FaArrowLeft className='arrow mt-3'/>
                                </Link>
                                <h1 className='ml-4'>Edit Order</h1>
                        </div>
                        <EditOrderForm getId={id} />
                </div>
        );
}

export default EditOrders;
