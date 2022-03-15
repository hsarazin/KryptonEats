import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './views/home'
import NotFound from './views/notFound'
import NewOrder from './views/newOrder'
import MyOrders from './views/myOrders'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="newOrder" element={<NewOrder/>}/>
        <Route path="myOrders" element={<MyOrders/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
