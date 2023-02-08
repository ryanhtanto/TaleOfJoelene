import React from 'react'
import Swal from 'sweetalert2';
import useInput from "../hooks/useInput";
import { useNavigate } from 'react-router-dom';
import { addItems, addSeason, deleteSeason, getAllItems, getSeasons } from '../data/utils';
import { FiPlusSquare, FiTrash2 } from 'react-icons/fi';

function InventoryForm() {
        const [refresh, setRefresh] = React.useState(true);
        const [name, setName] = useInput('');
        const [stock, setStock] =  useInput('');
        const [selectedCategory, setSelectedCategory] = React.useState(null);
        const [seasons, setSeasons] = React.useState([]);
        const [seasonId, setSeasonId] = React.useState('');
        const navigate = useNavigate();

        React.useEffect(() => {
                async function getData() {
                        let data;
                        data = await getSeasons();
                        setSeasons(data || []);
                }
                getData();
        }, [ selectedCategory, refresh ]);

        const onSubmit = async (event) => {
                event.preventDefault();
                const valueFromDb = await getAllItems();
                if(valueFromDb.length === 0){
                        Swal.showLoading()
                        await addItems({name, stock, selectedCategory})
                        Swal.fire({
                                icon: 'success',
                                text: `Item Added`,
                                showConfirmButton: false,
                                timer: 2000,
                        });
                        navigate('/');
                }else{
                        for(let i = 0; i < valueFromDb.length; i++){
                                if(valueFromDb[i].name === name){
                                        Swal.fire({
                                                icon: 'error',
                                                text: `Items Already Exist`,
                                                showConfirmButton: false,
                                                timer: 2000,
                                        });
                                        break
                                } else{
                                        await addItems({name, stock, selectedCategory})
                                        Swal.fire({
                                                icon: 'success',
                                                text: `Item Added`,
                                                showConfirmButton: false,
                                                timer: 2000,
                                        });
                                        navigate('/');
                                        break
                                }
                        }
                }
                
        }
        
        const onAddCategory = async () => {
                const { value: season }= await Swal.fire({
                        title: 'Add New Category',
                        input: 'text',
                        showCancelButton: true,
                        inputValidator: (value) => {
                                if (!value) {
                                        return 'You need to write something!';
                                }
                        },
                })
                Swal.showLoading();
                if (season) {
                        const data = await addSeason(season);
                        if (data.success) {
                                Swal.fire({
                                        icon: 'success',
                                        text: 'Add Category Success',
                                        showConfirmButton: false,
                                        timer: 2000,
                                });
                                if (refresh) {
                                        setRefresh(false);
                                } else {
                                        setRefresh(true);
                                }
                        } else {
                                Swal.fire({
                                        icon: 'error',
                                        title: data.message,
                                        showConfirmButton: false,
                                        timer: 1500,
                                });
                        }
                }      
        }
        const onDeleteSeason = async () => {
                if (selectedCategory) {
                        Swal.showLoading();
                        await deleteSeason(seasonId);
                        Swal.fire({
                                icon: 'success',
                                text: 'Deleted Category',
                                showConfirmButton: false,
                                timer: 2000,
                        });
                        setSelectedCategory(null);
                } else {
                        Swal.fire({
                                icon: 'error',
                                text: 'Select Category First!',
                                showConfirmButton: false,
                                timer: 2000,
                        });
                }
        };

        const setCategoryData = (e) => {
                if (!e.target.value) {
                        setSelectedCategory(null);
                        return;
                }

                const data = e.target.value.split('^@#');
                setSelectedCategory(data[0]);
                setSeasonId(data[1]);
        };
        return (
                <form onSubmit={onSubmit} className='mt-5'>
                        <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" value={name} onChange={setName}/>
                        </div>
                        <div className="form-group">
                                <label htmlFor="stock">Stock</label>
                                <input type="number" min="1" step="1" className="form-control" id="stock" value={stock} onChange={setStock}/>
                        </div>
                        <div className="row mt-4 ">
                                <div className="col-sm-8 col-md-6 col-lg-8">
                                        <div className="dropdown">
                                                <select className="form-select input__height disabled" aria-label="Default select example" onChange={(e) => setCategoryData(e)}>
                                                        <option value="">Select Category</option>
                                                        {seasons?.map((season) => (
                                                                <option value={`${season.seasonName}^@#${season.id}`} key={season.id} className="peding">
                                                                        {season.seasonName}
                                                                </option>
                                                        ))}
                                                </select>
                                        </div>
                                </div>
                                <div className="col-sm-12 col-lg-3 col-md-4 mb-2">
                                        <button type="button" className="btn btn-primary form-control btn-color input__height mb-2" onClick={() => onAddCategory()}>
                                                <FiPlusSquare />
                                        </button>
                                </div>
                                <div className="col-sm-2 col-lg-1">
                                        <button type="button" className="btn btn-danger form-control input__height btn-hapus mb-2" onClick={() => onDeleteSeason()}>
                                                <FiTrash2 />
                                        </button>
                                </div>
                        </div>
                        
                        <button type="submit" className="btn btn-primary input__height form-control btn-color">Submit</button>
                </form>
        );
}

export default InventoryForm;
