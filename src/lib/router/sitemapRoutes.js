import React from 'react';
import { Route, Routes } from 'react-router-dom';

console.log(React);

export default (
  <Routes>
    <Route path={'/'} />
    <Route path={'/product/:id'} />
    <Route path={'/products/:category'} />
    <Route path={'/order/:id'} />
    <Route path={'/ordered-products'} />
    <Route path={'/seller/dashboard'} />
    <Route path={'/seller/product/add'} />
    <Route path={'/seller/product/edit/:id'} />
    <Route path={'/login'} />
    <Route path={'/register/select'} />
    <Route path={'/register/:params'} />
    <Route path={'/user/dashboard'} />
    <Route path={'/user/dashboard/edit'} />
  </Routes>
);
