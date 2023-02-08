import React from 'react';
import PrintCard from '../components/print-card';
import { getAllOrders } from '../data/utils';

function PrintOut() {    
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
        return(
                <>
                        <div className="container">
                                <PrintCard 
                                        orders={orders} 
                                        refresh={refreshCallback}
                                />         
                        </div>
                </>
        )       
}

export default PrintOut;