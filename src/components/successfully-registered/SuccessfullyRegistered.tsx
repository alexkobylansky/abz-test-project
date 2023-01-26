import React from 'react';
import styles from './SuccessfullyRegistered.module.scss';

export const SuccessfullyRegistered = () => {
  return (
    <div className={styles.successfullyRegisteredBlock}>
      <div className={styles.wrapper}>
        <h1>User successfully registered</h1>
        <img src="/images/png/success-image.png" alt="user successfully registered"/>
      </div>
    </div>
  );
}