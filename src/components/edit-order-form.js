import React from 'react'
import Swal from 'sweetalert2';
import useInput from "../hooks/useInput";
import { useNavigate } from 'react-router-dom';
import { addOrders, getAllItems, getAllPackage, getItemsPerOrder, getOrders, putItems, putOrders } from '../data/utils';

function EditOrderForm({ getId }) {
        const [packages, setPackages] = React.useState([]);
        const [refresh, setRefresh] = React.useState(true);
        const [name, setName, setDefaultOrderName] = useInput('');
        const [orders, setOrders, setDefaultOrders] = useInput('');
        const [address, setAddress, setDefaultOrderAddress] = useInput('');
        const [nomor, setNomor, setDefaultOrderNomor] = useInput('');
        const [pengiriman, setPengiriman, setDefaultOrderPengiriman] = useInput('');
        const [packageId, setPackageId] = React.useState('');
        const [selectedCategory, setSelectedCategory] = React.useState(null);
        const navigate = useNavigate();

        React.useEffect(() => {
                async function selectedItems() {
                        const orderDetail = await getOrders(parseFloat(getId));
                        setDefaultOrderName(orderDetail.name)
                        setDefaultOrders(orderDetail.orders);
                        setDefaultOrderAddress(orderDetail.address);
                        setDefaultOrderNomor(orderDetail.nomor);
                        setDefaultOrderPengiriman(orderDetail.pengiriman);
                        setSelectedCategory(orderDetail.selectedCategory);
                }
                selectedItems();
        }, []);
        React.useEffect(() => {
                async function getData() {
                        let data;
                        data = await getAllPackage();
                        setPackages(data || []);
                }
                getData();
        }, [ selectedCategory, refresh ]);
        const setCategoryData = (e) => {
                if (!e.target.value) {
                        setSelectedCategory(null);
                        return;
                }

                const data = e.target.value.split('^@#');
                setSelectedCategory(data[0]);
                setPackageId(data[1]);
        };
        const onSubmit = async (event) => {
                event.preventDefault();
                const packageData = await getAllPackage()
                
                for(let i = 0; i < packageData.length; i++){
                        if(selectedCategory === packageData[i].name){
                                const gotItems = await getItemsPerOrder(packageData[i].checkedState)
                                const getOrder = await getOrders(getId)
                                gotItems.forEach( async (gotItem) => {
                                        const countSisa = gotItem.stock - orders
                                        if(selectedCategory !== getOrder.selectedCategory){
                                                await putItems(gotItem.name, countSisa, gotItem.selectedCategory, parseFloat(gotItem.id));
                                        }
                                });     
                        }
                }       
                await putOrders({name, orders, nomor, pengiriman, selectedCategory, address, getId})
                Swal.fire({
                        icon: 'success',
                        text: `Order Edited`,
                        showConfirmButton: false,
                        timer: 2000,
                });
                navigate('/orderList');
        }
        return(
                <form className='mt-5' onSubmit={onSubmit} >
                        <div className="form-group">
                                <label htmlFor="name">Customer Name</label>
                                <input type="text" className="form-control" id="name" value={name} onChange={setName} required/>
                        </div>
                        <div className="form-group">
                                <label htmlFor="numberoforder">Number of Orders</label>
                                <input type="number" className="form-control" id="numberoforder" value={orders} onChange={setOrders} required/>
                        </div>
                        <div className="form-group mt-3">
                                <label htmlFor="noHP">Phone Number</label>
                                <input className="form-control" id="noHP" value={nomor} onChange={setNomor} required></input>
                        </div>
                        <div className="form-group mt-3">
                                <label htmlFor="pengiriman">Delivery Type</label>
                                <input className="form-control" id="pengiriman" value={pengiriman} onChange={setPengiriman} required></input>
                        </div>
                        <p className="rounded prev-category py-1 px-3 mb-3">Previous Category : {selectedCategory}</p>
                        <div className="row mt-4">
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="dropdown">
                                                <select className="form-select input__height disabled" aria-label="Default select example" onChange={(e) => setCategoryData(e)}>
                                                        <option value="">Select Category</option>
                                                        {packages?.map((packageList) => (
                                                                <option value={`${packageList.name}^@#${packageList.id}`} key={packageList.id} className="peding">
                                                                        {packageList.name}
                                                                </option>
                                                        ))}
                                                </select>
                                        </div>
                                </div>
                        </div>
                        <div className="form-group mt-3">
                                <label htmlFor="address">Address</label>
                                <textarea className="form-control" id="address" rows="3" value={address} onChange={setAddress} required></textarea>
                        </div>
                        
                        <button type="submit" className="btn btn-primary input__height form-control btn-color mt-4">Submit</button>
                </form>
        )
}

export default EditOrderForm;