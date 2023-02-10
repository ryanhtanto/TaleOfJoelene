import React from 'react'
import Swal from 'sweetalert2';
import useInput from "../hooks/useInput";
import { useNavigate } from 'react-router-dom';
import { addPackage, getAllItems, getItemsPerSeason, getPackageDetail, getSeasons, putPackage } from '../data/utils';

function EditPackageForm({ getId }) {
        const [seasons, setSeasons] = React.useState([]);
        const [refresh, setRefresh] = React.useState(true);
        const [name, setName, setDefaultPackageName] = useInput('');
        const [loading, setLoading] = React.useState(true);
        const [itemLists, setItemLists] = React.useState([]);
        const [inventories, setInventories] = React.useState([]);
        const [selectedCategory, setSelectedCategory] = React.useState(null);
        const [seasonId, setSeasonId] = React.useState('');
        const [checkedState, setCheckedState] = React.useState([]);
        const navigate = useNavigate();

        React.useEffect(() => {
                async function getData() {
                        let data;
                        data = await getSeasons();
                        setSeasons(data || []);
                }
                getData();
        }, [ selectedCategory, refresh ]);

        React.useEffect(() => {
                async function selectedPackage() {
                        const detail = await getPackageDetail(parseFloat(getId));
                        setDefaultPackageName(detail.name)
                        setSelectedCategory(detail.selectedCategory);
                        setCheckedState(detail.checkedState)
                }
                selectedPackage();
        }, []);

        React.useEffect(() => {
                const getData = async () => {
                        const valueFromDb = await getAllItems();
                        setInventories(valueFromDb)
                };
                getData();
        }, [refresh]);

        React.useEffect(() => {
                const getData = async () => {  
                        if (selectedCategory !== null) {
                                setItemLists(await getItemsPerSeason(selectedCategory))
                        } else {
                                setItemLists(inventories)
                        }
                        setLoading(false);
                }
                getData();
        }, [selectedCategory, inventories]);
        const setCategoryData = (e) => {
                if (!e.target.value) {
                        setSelectedCategory(null);
                        return;
                }

                const data = e.target.value.split('^@#');
                setSelectedCategory(data[0]);
                setSeasonId(data[1]);
        };
        const handleOnChange = (itemList) =>{
                if(!checkedState.find(name => name === itemList)){
                        setCheckedState([ ...checkedState, itemList])
                }else{
                        setCheckedState(checkedState.filter(checkState => checkState !== itemList))
                }
                console.log(itemList)
        };
        
        const onSubmit = async (event) => {
                event.preventDefault();
                console.log(checkedState)
                // const editPackageToDB = await putPackage(name, selectedCategory, checkedState, parseFloat(getId))
                // if(editPackageToDB){
                //         Swal.fire({
                //                 icon: 'success',
                //                 text: `Item Added`,
                //                 showConfirmButton: false,
                //                 timer: 2000,
                //         });
                //         navigate('/packageList');
                // }
        }
        return(
                <form className='mt-5' onSubmit={onSubmit}>
                        <div className="form-group">
                                <label htmlFor="name">Package Name</label>
                                <input type="text" className="form-control" id="name" value={name} onChange={setName} required/>
                        </div>
                        <p className="rounded prev-category py-1 px-3 mb-3">Previous Category : {selectedCategory}</p>
                        <div className="row mt-4">
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="dropdown">
                                                <select className="form-select input__height disabled" aria-label="Default select example" onChange={(e) => setCategoryData(e)} required>
                                                        <option value="">Select Category</option>
                                                        {seasons?.map((season) => (
                                                                <option value={`${season.seasonName}^@#${season.id}`} key={season.id} className="peding">
                                                                        {season.seasonName}
                                                                </option>
                                                        ))}
                                                </select>
                                        </div>
                                </div>
                        </div>
                        <p className="rounded prev-category py-1 px-3 mb-3 mt-3">Previous Item : {checkedState + " "}</p>
                        <div className="row mt-4 form-group">
                                {itemLists.map((itemList) => (
                                        <div className='col-lg-4 col-md-6 col-sm-12 d-flex align-items-center justify-content-center' key={itemList.id}>
                                                <div>
                                                        <input type="checkbox" className="form-check-input"  id={`items-${itemList.id}`} checked={checkedState[itemList.id]} value={itemList.name} onChange={() => handleOnChange(itemList.name)}/>
                                                        <label className="form-check-label" htmlFor={`items-${itemList.id}`}>{itemList.name}</label>
                                                </div>
                                        </div>
                                ))}
                        </div> 
                        <button type="submit" className="btn btn-primary input__height form-control btn-color">Submit</button>
                </form>
        )
}

export default EditPackageForm;