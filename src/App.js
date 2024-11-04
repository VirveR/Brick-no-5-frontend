import React from 'react';
import Home from './pages/Home';
import Sets from './pages/Sets';
import Parts from './pages/Parts';
import Registration from './components/Registration';
import Login from './components/Login';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Layout />} >
          <Route index element = {<Home />} />
          <Route path = 'sets' element = {<Sets />} />
          <Route path = 'sets/:cat' element = {<Sets />} />
          <Route path = 'sets/:cat/:set' element = {<Sets />} />
          <Route path = 'parts' element = {<Parts />} />
          <Route path = 'register' element = {<Registration />} />
          <Route path = 'login' element = {<Login />} />
          <Route path = '*' element = {<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
