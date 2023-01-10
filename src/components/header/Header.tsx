import React from 'react';
import styles from './Header.module.scss';
import {PrimaryButton} from "../../ui";

export const Header = () => {
  return (
    <header>
      <div className={styles.wrapper}>
        <a href="/" className={styles.logo}>
          <img src="/images/svg/Logo.svg" alt="Logo"/>
        </a>
        <div className={styles.buttonGroup}>
          <PrimaryButton>Users</PrimaryButton>
          <PrimaryButton>Sign up</PrimaryButton>
        </div>
      </div>
    </header>
  );
}