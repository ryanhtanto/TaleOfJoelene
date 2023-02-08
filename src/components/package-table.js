import React from 'react'
import { getAllPackage } from '../data/utils';
import PackageTableRow from './package-table-row';

function PackageTable() {
        const [packages, setPackages] = React.useState([]);
        const [refresh, setRefresh] = React.useState(0);
        React.useEffect(() => {
                const getData = async () => {
                        const valueFromDb = await getAllPackage();
                        setPackages(valueFromDb)
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
                                        <th scope="col">Season</th>
                                        <th scope="col">Items</th>
                                        <th scope="col">Action</th>
                                </tr>
                        </thead>
                        <tbody>
                                <PackageTableRow 
                                        packages = {packages}
                                        refresh={refreshCallback}
                                />
                        </tbody>
                </table>
        );
}

export default PackageTable;
