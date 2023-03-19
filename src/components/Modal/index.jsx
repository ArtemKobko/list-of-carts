import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import styles from './Modal.module.scss';
import { selectModalState } from '../../models/carts/selectors';
import { changeModalState } from '../../models/carts/cartSlice';
import { addNewCart } from '../../models/carts/middlewares';

function Modal() {
  const isActive = useSelector(selectModalState);
  const dispatch = useDispatch();
  const [items, setItems] = useState([{ id: uuidv4(), itemId: '', quantity: '' }]);

  const createPost = (e) => {
    e.preventDefault();
    const arrayOfProducts = [];
    const isInputsValid = items.every((item) => {
      const id = item.itemId;
      const { quantity } = item;
      if (id && quantity) {
        arrayOfProducts.push({ id, quantity });
        return true;
      }
      return false;
    });

    if (isInputsValid) {
      dispatch(addNewCart({ arrayOfProducts }));
      e.target.reset();
      dispatch(changeModalState(false));
    }
  };

  const addItem = () => {
    if (items.length < 6) {
      setItems([...items, { id: uuidv4(), itemId: '', quantity: '' }]);
    }
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const closeModal = () => {
    dispatch(changeModalState(false));
  };

  const handleInputChange = (id, field, value) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      }),
    );
  };

  return ReactDOM.createPortal(
    <div
      className={cx(styles.modal, {
        [styles.none]: !isActive,
      })}
    >
      <div className={styles.modalContent}>
        <h2 className={styles.header}>Add New Cart</h2>
        <form id="cartForm" onSubmit={createPost}>
          {items.map((item) => (
            <div key={item.id}>
              <input
                type="number"
                min="1"
                max="100"
                className={styles.items}
                placeholder="item id"
                value={item.itemId}
                onChange={(e) => handleInputChange(item.id, 'itemId', e.target.value)}
              />
              <input
                type="number"
                min="1"
                max="10"
                className={styles.items}
                placeholder="quantity"
                value={item.quantity}
                onChange={(e) => handleInputChange(item.id, 'quantity', e.target.value)}
              />
              <button type="button" className={styles.removeBtn} onClick={() => removeItem(item.id)}>
                -
              </button>
            </div>
          ))}
          <button type="button" className={styles.addBtn} onClick={() => addItem()}>
            +
          </button>
          <div className={styles.buttons}>
            <button type="submit" className={styles.createBtn}>
              Add
            </button>
            <button type="button" className={styles.closeBtn} onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal'),
  );
}

export default Modal;
