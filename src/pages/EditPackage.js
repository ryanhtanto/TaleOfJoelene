import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import EditPackageForm from '../components/edit-package-form';

function EditPackage() {
        const { id } = useParams();
        return (
                <div className='container mt-5'>
                        <div className='d-flex'>
                                <Link to={`/packageList`}>
                                        <FaArrowLeft className='arrow mt-3'/>
                                </Link>
                                <h1 className='ml-4'>Edit Package</h1>
                        </div>
                        <EditPackageForm getId={id} />
                </div>
        );
}

export default EditPackage;
