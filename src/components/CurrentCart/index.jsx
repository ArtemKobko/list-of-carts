import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import { selectCarts } from '../../models/carts/selectors';
import { fetchCarts } from '../../models/carts/middlewares';

function CurrentCart() {
  const dispatch = useDispatch();
  const carts = useSelector(selectCarts);
  const { cartId } = useParams();
  const data = [];

  useEffect(() => {
    dispatch(fetchCarts());
  }, []);
  const cart = carts.find((e) => e.id === Number(cartId));

  if (cart) {
    cart.products.forEach(({
      title, price, quantity, discountedPrice,
    }) => {
      data.push({
        name: title,
        price,
        discountedPrice: Math.round((discountedPrice / quantity)),

      });
    });
    return (
      <div>
        <LineChart
          width={1350}
          height={450}
          data={data}
          margin={{
            top: 50, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="7 3" />
          <XAxis dataKey="name" padding={{ left: 40 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          <Line type="monotone" dataKey="discountedPrice" stroke="#82ca9d" />
        </LineChart>
      </div>

    );
  }
  return (
    <div> Sorry we can not find that cart</div>
  );
}

export default CurrentCart;
