import React from 'react'
import InventoryForm from '../components/inventory-form';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function AddInventory() {
  return (
       <div className='container mt-5'>
        <div className='d-flex'>
          <Link to={`/`}>
            <FaArrowLeft className='arrow mt-3'/>
          </Link>
          <h1 className='ml-4'>Add Items</h1>
        </div>
        <InventoryForm />
       </div>
  );
}

export default AddInventory;
