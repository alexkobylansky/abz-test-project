import React from 'react';
import styles from './UsersBlock.module.scss'
import {UserCard} from "../user-card/UserCard";
import {PrimaryButton} from "../../ui/PrimaryButton";

interface UsersBlockProps {
  users: IUsers[];
  currentPage: number | null;
  totalPages: number | null;
  getUsers: () => void;
}

export const UsersBlock: React.FC<UsersBlockProps> = ({users, currentPage, totalPages, getUsers}) => {

  return (
    <section className={styles.usersBlock} id={"userBlock"}>
      <header>
        <h1>Working with GET request</h1>
      </header>
      <ul className={styles.wrapper}>
        {!!users.length && users.map((user: IUsers) => <UserCard key={user.id} name={user.name} email={user.email} phone={user.phone} position={user.position} photo={user.photo}/>)}
      </ul>
      {((currentPage && totalPages) && currentPage < totalPages) && <PrimaryButton type={"button"}
                                                                                    className={styles.showMore}
                                                                                    onClick={getUsers}
      >Show more</PrimaryButton>}
    </section>
  );
}