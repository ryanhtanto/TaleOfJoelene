import React from 'react'
import { getAllOrders } from '../data/utils';
import OrderTableRow from './order-table-row';

function OrderTable() {
        const [orders, setOrders] = React.useState([]);
        const [refresh, setRefresh] = React.useState(0);
        React.useEffect(() => {
                const getData = async () => {
                        const valueFromDb = await getAllOrders();
                        setOrders(valueFromDb)
                };
                getData();
        }, [refresh]);
        const refreshCallback = () => {
                setRefresh(refresh + 1);
        };
        return (
                <>

                        <table className="table mt-3">
                                <thead>
                                        <tr>
                                                <th scope="col">Customer Name</th>
                                                <th scope="col">Order</th>
                                                <th scope="col">Order Package</th>
                                                <th scope="col">Phone Number</th>
                                                <th scope="col">Delivery Type</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">Action</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        <OrderTableRow 
                                                orders={orders}
                                                refresh={refreshCallback}
                                        />
                                </tbody>
                        </table>
                </>
        );
}

export default OrderTable;
