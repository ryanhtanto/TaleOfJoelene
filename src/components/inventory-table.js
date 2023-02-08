import React from 'react'
import {getAllItems } from '../data/utils';
import InventoryTableRow from './inventory-table-row';

function InventoryTable() {
        const [inventories, setInventories] = React.useState([]);
        const [refresh, setRefresh] = React.useState(0);
        React.useEffect(() => {
                const getData = async () => {
                        const valueFromDb = await getAllItems();
                        setInventories(valueFromDb)
                };
                getData();
        }, [refresh]);
        const refreshCallback = () => {
                setRefresh(refresh + 1);
        };
        return (
                <table className="table mt-3">
                        <thead>
                                <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Season</th>
                                        <th scope="col">Action</th>
                                </tr>
                        </thead>
                        <tbody>
                                <InventoryTableRow 
                                        inventories={inventories}
                                        refresh={refreshCallback}
                                />
                        </tbody>
                </table>
        );
}

export default InventoryTable;
