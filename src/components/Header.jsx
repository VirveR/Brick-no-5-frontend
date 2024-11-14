import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../components/AuthContext';
import Login from './Login';
import Registration from './Registration';

const Header = () => {
  //variables
  const {user, logout} = useContext(AuthContext);
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);

  //show forms
  const toggleLogin = () => setLoginVisible(!loginVisible);
  const toggleRegister = () => setRegisterVisible(!registerVisible);

  //auto logout
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('isRefreshing', 'true');
    });

    const handleBeforeUnload = (event) => {
      if (sessionStorage.getItem('isRefreshing')) {
        sessionStorage.removeItem('isRefreshing');
      }
      else {
        logout();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('beforeunload', handleBeforeUnload);
      sessionStorage.removeItem('isRefreshing');
    }
  });

  /*** RETURN ***/
  return (
    <>
      <header className="row">
        <h1 className="inset-box">Brick N:o 5</h1>

        {/* nav bar */}
        <nav style={{flex:1}}>
          <Link to = '/' className = 'nav-item'>Home</Link>
          <Link to = '/sets' className = 'nav-item'>Sets</Link>
          <Link to = '/parts' className = 'nav-item'>Parts</Link>
          <Link to = '/coll' className = 'nav-item'>Collection</Link>
        </nav>

        {/* log in/out */}
        {!user ? (
          <div>
            <span className={'link-plain small'} onClick={toggleLogin} tabIndex={0}>login</span>
            <span className='small'> or </span>
            <span className={'link-plain small'} onClick={toggleRegister} tabIndex={0}>register</span>
          </div>
        ) : (
          <span style={{fontSize:'small', cursor:'pointer'}} onClick={logout}>log out</span>
        )}

      </header>

      {/* forms for registration & login */}
      {loginVisible ? <Login toggle={toggleLogin} /> : null}
      {registerVisible ? <Registration toggle={toggleRegister} /> : null}
    </>
  );
};

export default Header;