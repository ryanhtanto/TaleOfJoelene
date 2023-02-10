import React from 'react'
import Swal from 'sweetalert2';
import useInput from "../hooks/useInput";
import { useNavigate } from 'react-router-dom';
import { addOrders, getAllItems, getAllPackage, getItemsPerOrder, putItems } from '../data/utils';

function OrderForm() {
        const [packages, setPackages] = React.useState([]);
        const [refresh, setRefresh] = React.useState(true);
        const [name, setName] = useInput('');
        const [orders, setOrders] = useInput('');
        const [address, setAddress] = useInput('');
        const [nomor, setNomor] = useInput('');
        const [pengiriman, setPengiriman] = useInput('');
        const [packageId, setPackageId] = React.useState('');
        const [selectedCategory, setSelectedCategory] = React.useState(null);
        const navigate = useNavigate();

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
                Swal.showLoading()
                const packageData = await getAllPackage()
                
                for(let i = 0; i < packageData.length; i++){
                        if(selectedCategory === packageData[i].name){
                                const gotItems = await getItemsPerOrder(packageData[i].checkedState)
                                gotItems.forEach( async (gotItem) => {
                                        const countSisa = gotItem.stock - orders
                                        await putItems(gotItem.name, countSisa, gotItem.selectedCategory, parseFloat(gotItem.id))
                                });     
                        }
                }
                await addOrders({name, orders, nomor, pengiriman, selectedCategory, address})
                Swal.fire({
                        icon: 'success',
                        text: `Order Added`,
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
                        <div className="row mt-4">
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="dropdown">
                                                <select className="form-select input__height disabled" aria-label="Default select example" onChange={(e) => setCategoryData(e)} required>
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

export default OrderForm;