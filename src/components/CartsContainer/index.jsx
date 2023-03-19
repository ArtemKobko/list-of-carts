import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CartsContainer.module.scss';
import Header from '../Header';
import { fetchCarts, deleteCart } from '../../models/carts/middlewares';
import { selectCarts } from '../../models/carts/selectors';

function CartsContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector(selectCarts);

  useEffect(() => { dispatch(fetchCarts()); }, []);

  const viewCart = (id) => {
    navigate(`/cart/${id}`);
  };

  const removeCart = (id) => {
    dispatch(deleteCart(id));
  };
  return (
    <div>
      <Header />
      <div className={styles.carts}>
        {carts.map(({
          id,
          totalProducts,
          total,
          discountedTotal,
        }) => (
          <div key={id} className={styles.cart}>
            <p className={styles.text}>
              {totalProducts}
              {'  '}
              items in this cart
              <br />
              Total Price:
              <span className={styles.oldPrice}>
                {total}
                PLN
              </span>
              <span className={styles.newPrice}>
                {discountedTotal}
                PLN
              </span>
            </p>
            <div className={styles.buttons}>
              <button type="button" className={styles.btnDelete} onClick={() => removeCart(id)}>Delete cart</button>
              <button type="button" className={styles.btnView} onClick={() => viewCart(id)}>Veiw cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

export default CartsContainer;
