import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './views/home'
import NotFound from './views/notFound'
import NewOrder from './views/newOrder'
import MyOrders from './views/myOrders'
import Login from './views/login'
import Register from './views/register'
import ConfirmOrder from './views/confirmOrder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="newOrder" element={<NewOrder/>}/>
        <Route path="myOrders" element={<MyOrders/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="confirmOrder" element={<ConfirmOrder/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
