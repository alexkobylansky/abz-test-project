import React, {useEffect, useState} from 'react';
import './App.scss';
import {Header} from "../header/Header";
import {BannerBlock} from "../banner-block/BannerBlock";
import {UsersBlock} from "../users-block/UsersBlock";
import {FormBlock} from "../form-block/FormBlock";
import {Preloader} from "../preloader/Preloader";
import {URL} from "../../hooks/Auth";

export const App: React.FC = () => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [link, setLink] = useState<string>(``);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUsers = async () => {
    try {
      const response = await fetch(`${URL}users?page=1&count=6`);
      const result: resultProp = await response.json();
      if (response.status === 200) {
        setUsers(result.users);
        setCurrentPage(result.page);
        setTotalPages(result.total_pages);
        setLink(result.links.next_url);
        console.log('result: ', result);
      } else if(response.status === 404) {
        return new Error(result.message);
      } else if(response.status === 422) {
        console.log(result.fails?.count);
        console.log(result.fails?.page);
        return new Error(result.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  const showMoreUsers = async () => {
    try {
      const response = await fetch(`${link}`);
      const result: resultProp = await response.json();
      if (response.status === 200) {
        setUsers((prevState) => [...prevState, ...result.users]);
        setCurrentPage(result.page);
        setTotalPages(result.total_pages);
        setLink(result.links.next_url);
        console.log('result: ', result);
      } else if(response.status === 404) {
        return new Error(result.message);
      } else if(response.status === 422) {
        console.log(result.fails?.count);
        console.log(result.fails?.page);
        return new Error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
    return () => {
      setUsers([]);
    }
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = isLoading ? "hidden" : "";
    }
  }, [isLoading]);

  return (<>
    <Preloader isLoading={isLoading}/>
    <div className="container">
      <Header/>
      <div className="mainWrapper">
        <BannerBlock/>
        <div className="wrapper">
          <main>
            {!!users.length && <UsersBlock users={users} currentPage={currentPage} totalPages={totalPages} getUsers={showMoreUsers}/>}
          </main>
          <FormBlock getUsers={getUsers}/>
        </div>
      </div>
    </div>
  </>);
}