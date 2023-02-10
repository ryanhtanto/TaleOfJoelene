import React from 'react'
import {Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar';
import AddInventory from './pages/addInventory';
import AddOrder from './pages/addOrder';
import AddPackage from './pages/addPackage';
import EditInventoryPages from './pages/EditInventory';
import EditOrders from './pages/EditOrder';
import EditPackage from './pages/EditPackage';
import Inventory from './pages/inventory';
import OrderList from './pages/orderList';
import PackageList from './pages/packageList';
import PrintOut from './pages/printOut';

function App() {
  return (
    <>
     <header>
        <Navbar />
     </header>
     <main>
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/addPackage" element={<AddPackage />} />
          <Route path="/addInventory" element={<AddInventory />} />
          <Route path="/edit-inventory/:id" element={<EditInventoryPages />} />
          <Route path="/packageList" element={<PackageList />} />
          <Route path="/edit-package/:id" element={<EditPackage />} />
          <Route path="/orderList" element={<OrderList />} />
          <Route path="/addOrder" element={<AddOrder />} />
          <Route path="/edit-order/:id" element={<EditOrders />} />
          <Route path="/printCard" element={<PrintOut />} />
        </Routes>
     </main>
    </>
  );
}

export default App;
