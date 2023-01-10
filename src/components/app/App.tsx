import React from 'react';
import './App.scss';
import {Header} from "../header/Header";

export const App: React.FC = () => {
  return (
    <div className="container">
      <Header/>
      <main></main>
    </div>
  );
}