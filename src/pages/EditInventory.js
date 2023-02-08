import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import EditInventory from '../components/edit-inventory';

function EditInventoryPages() {
        const { id } = useParams();
        return (
                <div className='container mt-5'>
                        <div className='d-flex'>
                                <Link to={`/`}>
                                        <FaArrowLeft className='arrow mt-3'/>
                                </Link>
                                <h1 className='ml-4'>Edit Items</h1>
                        </div>
                        <EditInventory getId={id}/>
                </div>
        );
}

export default EditInventoryPages;
