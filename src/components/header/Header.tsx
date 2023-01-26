import React from 'react';
import styles from './Header.module.scss';
import {PrimaryButton} from "../../ui/PrimaryButton";

export const Header: React.FC = () => {
  return (
    <header id={styles.header}>
      <div className="mainWrapper">
        <div className={`wrapper ${styles.wrapper}`}>
          <a href="/" className={styles.logo}>
            <img src="/images/svg/Logo.svg" alt="Logo"/>
          </a>
          <div className={styles.buttonGroup}>
            <PrimaryButton type="button" href={"#userBlock"}>Users</PrimaryButton>
            <PrimaryButton type="button" href={"#formBlock"}>Sign up</PrimaryButton>
          </div>
        </div>
      </div>
    </header>
  );
}