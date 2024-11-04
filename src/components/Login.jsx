import React, {useState, useContext} from 'react';
import {AuthContext} from './AuthContext';

const Login = ({toggle}) => {
  //variables
  const {login} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  //form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(name, password);
      toggle();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  /*** RETURN ***/
  return (
    <div className='popup'>
      <div className='popup-inner'>
        <img src='../../assets/no.png' alt="close" className={'icon close'} onClick={toggle} tabIndex={0}/>

        <h2 style={{textAlign:'center'}}>Login</h2>

        {/* error message */}
        {error ? (<div style={{color:'red'}}>{error}</div>) : null}

        {/* login form */}
        <form id='login-form' onSubmit = {handleSubmit}>

          <div className='row form-row'>
            <label htmlFor='name'>name:</label>
              <input id='name' name='name' value = {name} required autoComplete='on'
                onChange={(e) => {setName(e.target.value); setError(null)}} />
          </div>

          <div className={'row form-row'}>
            <label htmlFor='password'>password:</label>
            <input id='password' name='password' value={password} type='password' required autoComplete='on'
              onChange={(e) => {setPassword(e.target.value); setError(null)}} />
          </div>

          <div className='row' style={{justifyContent:'center', marginTop:10}}>
            <button type='submit'>login</button>
          </div>

        </form>

      </div>
    </div>
  );

};

export default Login;