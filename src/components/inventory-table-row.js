import React from 'react'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteItems } from '../data/utils';

function InventoryTableRow({inventories, refresh}) {
        const onDeleteHandler = async (id) => {
                Swal.fire({
                        title: `Delete Item?`,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: `Delete`,
                        cancelButtonText: `Cancel`,
                }).then(async (result) => {
                        if (result.isConfirmed) {
                                Swal.showLoading();
                                const deleteHandler = await deleteItems(id);
                                if (deleteHandler.success) {
                                        Swal.fire({
                                                icon: 'success',
                                                title: `Item Deleted`,
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
        if (inventories.length) {
                return (
                        inventories.map((inventory) => (
                                <tr key={inventory.id}>
                                        <td>{inventory.name}</td>
                                        <td>{inventory.stock}</td>
                                        <td>{inventory.stock <= '0' ? <FiAlertTriangle color='#FFCC00'/> : <FiCheckCircle color='#339900' /> }</td>
                                        <td>{inventory.selectedCategory}</td>
                                        <td>
                                                <Link to={`/edit-inventory/${inventory.id}`}>
                                                        <button type="button" className="btn btn-warning mr-2"><FaPencilAlt /></button>
                                                </Link>
                                                <button type="button" className="btn btn-danger" onClick={() => onDeleteHandler(inventory.id)}><FaTrashAlt /></button>
                                        </td>
                                </tr>
                        ))
                );
        } 
}

export default InventoryTableRow;
