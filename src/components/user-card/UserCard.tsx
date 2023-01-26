import React from 'react';
import styles from './UserCard.module.scss';

interface UserCardProps {
  name: string;
  email: string;
  phone: string;
  position: string;
  photo: string;
}

export const UserCard: React.FC<UserCardProps> = ({name, photo, position, phone, email}) => {
  return (
    <li className={styles.userCard}>
      <div className={styles.wrapper}>
        <div className={styles.avatarBlock}>
          <img src={photo ? photo : "/images/svg/photo-cover.svg"} alt="user avatar"/>
        </div>
        <div className={styles.fullName}>
          <div className={styles.tooltipWrapper}>
            <p>{name}</p>
            <p className={styles.tooltipText}>{name}</p>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.tooltipWrapper}>
            <p className={styles.position}>{position}</p>
            <p className={styles.tooltipText}>{position}</p>
          </div>
          <div className={styles.tooltipWrapper}>
            <p className={styles.email}>{email}</p>
            <p className={styles.tooltipText}>{email}</p>
          </div>
          <p className={styles.phone}>{phone}</p>
        </div>
      </div>
    </li>
  );
}