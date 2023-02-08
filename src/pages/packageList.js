import React from 'react'
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PackageTable from '../components/package-table';

function PackageList() {
  return (
       <div className='container'>
        <h1 className='fw-bold text-uppercase text-center'>Package List</h1>
          <PackageTable/> 
          <Link to={`/addPackage`}>
            <div className='float'>
              <FaPlus className='my-float'/>
            </div>
          </Link>
       </div>
  );
}

export default PackageList;