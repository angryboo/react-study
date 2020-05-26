/* eslint-disable arrow-body-style */
import React from 'react';
import { NavLink } from 'react-router-dom';
import MainRouter from '../../Router/MainRouter';
import './CSS/Page.css';

const Main = () => {
  return (
    <>
      <header className="Header">
        <h1 className="Title">Angryboo Movies</h1>
        <nav className="Nav">
          <ul className="nav-list">
            <li>
              <NavLink to="/Popular">
                <button type="button" className="nav-button">
                  인기순위
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Upcoming">
                <button type="button" className="nav-button">
                  개봉예정
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Search">
                <button type="button" className="nav-button">
                  영화검색
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/About">
                <button type="button" className="nav-button">
                  About
                </button>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="Main">
        <MainRouter />
      </main>
    </>
  );
};

export default Main;
