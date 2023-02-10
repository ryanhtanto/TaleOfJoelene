import React from 'react'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deletePackages } from '../data/utils';

function PackageTableRow({packages, refresh}) {
        const onDeleteHandler = async (id) => {
                Swal.fire({
                        title: `Delete Package?`,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: `Delete`,
                        cancelButtonText: `Cancel`,
                }).then(async (result) => {
                        if (result.isConfirmed) {
                                Swal.showLoading();
                                const deleteHandler = await deletePackages(id);
                                if (deleteHandler.success) {
                                        Swal.fire({
                                                icon: 'success',
                                                title: `Package Deleted`,
                                                showConfirmButton: false,
                                                timer: 1500,
                                        });
                                        refresh();
                                } else {
                                        Swal.fire({
                                                icon: 'error',
                                                title: deleteHandler.message,
                                                showConfirmButton: false,
                                                timer: 1500,
                                        });
                                }
                        }
                });
        };        
        if (packages.length) {
                return (
                        packages.map((listPackage) => (
                                <tr key={listPackage.id}>
                                        <td>{listPackage.name}</td>
                                        <td>{listPackage.selectedCategory}</td>
                                        <td>{listPackage.checkedState.join(', ')}</td>
                                        <td>
                                                {/* <Link to={`/edit-package/${listPackage.id}`}>
                                                        <button type="button" className="btn btn-warning mr-2"><FaPencilAlt /></button>
                                                </Link> */}
                                                <button type="button" className="btn btn-danger" onClick={() => onDeleteHandler(listPackage.id)}><FaTrashAlt /></button>
                                        </td>
                                </tr>
                        ))
                );
        } 
}

export default PackageTableRow;
