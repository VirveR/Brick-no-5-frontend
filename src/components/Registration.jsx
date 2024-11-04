import React, {useState} from 'react';
import axios from 'axios';

const Registration = ({toggle}) => {
  //variables
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/users', {name, password});
      alert(`Welcome, ${response.data.name}. You can log in now`);
    } catch (err) {
      console.error('Registration failed:', err.response.data.error);
      setError(err.response.data.error);
    }
  };

  /*** RETURN ***/
  return (
    <div className='popup'>
      <div className='popup-inner'>
        <img src='../assets/no.png' alt='close' className={'icon close'} onClick={toggle} tabIndex={0}/>

        <h2 style={{textAlign:'center'}}>Register</h2>

        {/* error message */}
        {error ? (<div style={{color:'red'}}>{error}</div>) : null}

        {/* registration form */}
        <form id='registration-form' onSubmit = {handleSubmit}>

          <div className='row form-row'>
            <label htmlFor='name'>name:</label>
              <input id='name' name='name' value = {name} required autoComplete='off'
                onChange={(e) => {setName(e.target.value); setError(null)}} />
          </div>

          <div className={'row form-row'}>
            <label htmlFor='password'>password:</label>
            <input id='password' name='password' value={password} type='password' required autoComplete='off'
              onChange={(e) => {setPassword(e.target.value); setError(null)}} />
              <p className='small'>give a password at least 8 characters long</p>
          </div>

          <div className={'row form-row'}>
            <button type='submit'>register</button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Registration;