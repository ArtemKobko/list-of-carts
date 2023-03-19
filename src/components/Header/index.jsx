import React from 'react';
import { useDispatch } from 'react-redux';
import { changeModalState } from '../../models/carts/cartSlice';
import styles from './Header.module.scss';
import Modal from '../Modal';

function Header() {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(changeModalState(true));
  };

  return (
    <div className={styles.headerContainer}>
      <Modal />
      <h1 className={styles.mainHeader}>List of carts</h1>
      <button type="button" className={styles.createBtn} onClick={openModal}>Add Cart</button>
    </div>
  );
}

export default Header;
