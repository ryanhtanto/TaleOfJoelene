import { getFirestore, getDoc, setDoc, collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import app from './global';
import Swal from 'sweetalert2';

const db = getFirestore(app);

const addItems = async ({name, stock, selectedCategory}) => {
        const id = +new Date()
        try {
                await setDoc(doc(db, 'items', `${id}`), {
                        id,
                        name,
                        stock,
                        selectedCategory,
                });
        }catch(error){
                Swal.fire({
                        icon: 'error',
                        text: 'Item can not added',
                        showConfirmButton: false,
                        timer: 2000,
                });
        }
}
const getAllItems = async () => {
        const recentItemsQuery = collection(db, 'items');
        const docsSnap = await getDocs(recentItemsQuery);
        const data = [];
        docsSnap.forEach((docItem) => {
                data.push(docItem.data());
        });
        return data;
};

const deleteItems = async (id) => {
        await deleteDoc(doc(db, "items", `${id}`));
        try {
          await deleteDoc(doc(db, 'items', `${id}`));
          return {
            success: true,
          };
        } catch (error) {
          return {
            success: false,
            message: `Can't Delete Savings Plan ${error.message}`,
          };
        }
};

const addSeason = async (seasonName) => {
        try {
                const id = +new Date();
                await setDoc(doc(db, 'season', `${id}`), {
                        id,
                        seasonName
                });
                return {
                        success: true,
                };
        } catch (error) {
                return {
                        success: false,
                        message: `Add Season Failed ${error.message}`,
                };
        }
};

const deleteSeason = async (id) => {
        await deleteDoc(doc(db, 'season', `${id}`));
};

const getSeasons = async () => {
        const categoryQuery = collection(db, 'season');
        const querySnapshot = await getDocs(categoryQuery);
      
        const data = [];
        querySnapshot.forEach((docItem) => {
                data.push(docItem.data());
        });
      
        return data;
};

const getInventories = async (id) => {
        const docRef = doc(db, 'items', `${id}`);
        const docSnap = await getDoc(docRef);
      
        if (docSnap.exists()) {
                return docSnap.data();
        }
        alert('No such document!');
};

const putItems = async (name, stock, selectedCategory, getId) => {
        try{
                await setDoc(doc(db, 'items', `${getId}`),{
                        id: getId,
                        name, 
                        stock,
                        selectedCategory,
                })
                return {
                        success: true,
                };
        }catch(error){
                return {
                        success: false,
                        message: `Failed Add Transaction ${error.message}`,
                };
        }
};

const getItemsPerSeason = async (selectedCategory) => {
        const recentItemsQuery = query(collection(db, 'items'), where('selectedCategory', '==', selectedCategory));
        const docsSnap = await getDocs(recentItemsQuery);
        const data = [];
        docsSnap.forEach((docItem) => {
                data.push(docItem.data());
        });
        return data;
};

const addPackage = async ({name, selectedCategory, checkedState}) => {
        const id = +new Date()
        try {
                await setDoc(doc(db, 'package', `${id}`), {
                        id,
                        name,
                        selectedCategory,
                        checkedState
                });
                return {
                        success: true,
                };
        }catch(error){
                Swal.fire({
                        icon: 'error',
                        text: 'Package can not added',
                        showConfirmButton: false,
                        timer: 2000,
                });
        }
}

const getAllPackage = async () => {
        const recentItemsQuery = collection(db, 'package');
        const docsSnap = await getDocs(recentItemsQuery);
        const data = [];
        docsSnap.forEach((docItem) => {
                data.push(docItem.data());
        });
        return data;
};

const deletePackages = async (id) => {
        await deleteDoc(doc(db, "package", `${id}`));
        try {
                await deleteDoc(doc(db, 'package', `${id}`));
                return {
                        success: true,
                };
        } catch (error) {
                return {
                        success: false,
                        message: `Can't Delete Packages ${error.message}`,
                };
        }
};

const getItemsPerOrder = async (selectedPackage) => {
        const data = [];
        for(let i = 0; i < selectedPackage.length; i++){
                const recentItemsQuery = query(collection(db, 'items'), where('name', '==', selectedPackage[i]));
                const docsSnap = await getDocs(recentItemsQuery);
                docsSnap.forEach((docItem) => {
                        data.push(docItem.data());
                });
        }
        return data;
};

const addOrders = async ({name, orders, nomor, pengiriman, selectedCategory, address}) => {
        const id = +new Date()
        try {
                await setDoc(doc(db, 'orders', `${id}`), {
                        id,
                        name,
                        orders,
                        nomor,
                        pengiriman,
                        selectedCategory,
                        address
                });
        }catch(error){
                Swal.fire({
                        icon: 'error',
                        text: 'Item can not added',
                        showConfirmButton: false,
                        timer: 2000,
                });
        }
}

const getAllOrders = async () => {
        const recentItemsQuery = collection(db, 'orders');
        const docsSnap = await getDocs(recentItemsQuery);
        const data = [];
        docsSnap.forEach((docItem) => {
                data.push(docItem.data());
        });
        return data;
};

const deleteOrders = async (id) => {
        try {
                await deleteDoc(doc(db, 'orders', `${id}`));
                return {
                        success: true,
                };
        } catch (error) {
                return {
                        success: false,
                        message: `Can't Delete Orders ${error.message}`,
                };
        }
};

export { addItems, getAllItems, deleteItems, addSeason, deleteSeason, getSeasons, getInventories, putItems, getItemsPerSeason, addPackage, getAllPackage, deletePackages, getItemsPerOrder, addOrders, getAllOrders, deleteOrders};