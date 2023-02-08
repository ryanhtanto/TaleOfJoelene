import React from 'react'
import InventoryTable from '../components/inventory-table';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Inventory() {
  return (
       <div className='container'>
        <h1 className='fw-bold text-uppercase text-center'>Item List</h1>
          <InventoryTable/> 
          <Link to={`/addInventory`}>
            <div className='float'>
              <FaPlus className='my-float'/>
            </div>
          </Link>
       </div>
  );
}

export default Inventory;