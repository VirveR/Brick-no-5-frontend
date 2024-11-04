import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className='whole-page'>
      <Header />
      <main className = {'page-content inset-box'}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;