import React from 'react'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteOrders } from '../data/utils';

function OrderTableRow({orders, refresh}) {
        const onDeleteHandler = async (id) => {
                Swal.fire({
                        title: `Delete Order?`,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: `Delete`,
                        cancelButtonText: `Cancel`,
                }).then(async (result) => {
                        if (result.isConfirmed) {
                                Swal.showLoading();
                                const deleteHandler = await deleteOrders(id);
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
        if (orders.length) {
                return (
                        orders.map((order) => (
                                <tr key={order.id}>
                                        <td id="orderName">{order.name}</td>
                                        <td>{order.orders}</td>
                                        <td>{order.selectedCategory}</td>
                                        <td>{order.nomor}</td>
                                        <td>{order.pengiriman}</td>
                                        <td>{order.address}</td>
                                        <td>
                                                <Link to={`/edit-order/${order.id}`}>
                                                        <button type="button" className="btn btn-warning mr-2"><FaPencilAlt /></button>
                                                </Link>
                                                <button type="button" className="btn btn-danger" onClick={() => onDeleteHandler(order.id)}><FaTrashAlt /></button>
                                        </td>
                                </tr>
                        ))
                );
        } 
}

export default OrderTableRow;
