import React, {useState} from 'react';
import axios from 'axios';

const NewPartForm = ({user, toggle}) => {
  //variables
  const [name, setName] = useState(`${user.name}'s collection`);
  const [error, setError] = useState(false);
  
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await axios.post('/api/colls', {name});
      console.log(updated);
      await axios.put(`/api/users/add/${user._id}`, {id: updated.data.newColl._id})
      toggle();
    } catch (err) {
      console.error('Creating collection failed:', err);
      setError(err.response.data.error);
    }
  };


  return (
    <div className='popup'>
      <div className='popup-inner'>
        <img src='../assets/no.png' alt='close' className='icon' style={{position:'absolute', right:10, top:10, cursor:'pointer'}} onClick={toggle} />
        <h2 style={{textAlign:'center'}}>Add collection</h2>
        {error && <div style={{color:'red'}}>{error}</div>}{' '}
        <form onSubmit = {handleSubmit}>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='name'>name:</label>
            <input id='name' name='name' value={name} autoComplete='off'
              onChange = {(e) => setName(e.target.value)} />
          </div>
          <div className='row' style={{justifyContent:'center', marginTop:10}}>
            <button type = 'submit'>add collection</button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default NewPartForm;