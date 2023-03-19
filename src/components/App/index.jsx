import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import CartsContainer from '../CartsContainer';
import CurrentCart from '../CurrentCart';

function ListOfCarts() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CartsContainer />} />
        <Route path="/cart/:cartId" element={<CurrentCart />} />
      </Routes>
    </Router>
  );
}

export default ListOfCarts;
