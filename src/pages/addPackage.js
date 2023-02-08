import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PackageForm from '../components/add-package-form';

function AddPackage() {
        
        return (
                <div className='container mt-5'>
                        <div className='d-flex'>
                                <Link to={`/packageList`}>
                                        <FaArrowLeft className='arrow mt-3'/>
                                </Link>
                                <h1 className='ml-4'>Add Package</h1>
                        </div>
                        <PackageForm />
                </div>
        );
}

export default AddPackage;
