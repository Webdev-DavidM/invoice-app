import React from 'react';
import { InvoiceContext } from '../App';
import styles from './NavBar.module.scss';

export default function NavBar() {
  return (
    <div className={styles.navbar_flex_container}>
      <div className={styles.logo_container}>
        <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt='' />
        <div className={styles.nested_purple_pattern}></div>
      </div>

      <div className={styles.day_or_night_btn}>
        <img src={`${process.env.PUBLIC_URL}/assets/icon-moon.svg`} alt='' />
      </div>
      <div className={styles.avatar_container}>
        <img src={`${process.env.PUBLIC_URL}/assets/image-avatar.jpg`} alt='' />
      </div>
    </div>
  );
}
