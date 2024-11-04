import React, {useState} from 'react';
import axios from 'axios';

const NewSetForm = ({toggle}) => {
  //variables
  const [setId, setSetId] = useState(null);
  const [name, setName] = useState(null);
  const [year, setYear] = useState(null);
  const [altId, setAltId] = useState(null);
  const [altName, setAltName] = useState(null);
  const [error, setError] = useState(false);
  
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/sets', {setId, name, year, altId, altName});
      toggle();
    } catch (err) {
      console.error('Adding set failed:', err);
      setError(err.response.data.message);
    }
  };


  return (
    <div className='popup'>
      <div className='popup-inner'>
        <img src='../assets/no.png' alt='close' className='icon' style={{position:'absolute', right:10, top:10, cursor:'pointer'}} onClick={toggle} />
        <h2 style={{textAlign:'center'}}>Add set</h2>
        {error && <div style={{color:'red'}}>{error}</div>}{' '}
        <form onSubmit = {handleSubmit}>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label for='setId'>set id:</label>
            <input
              name = 'setId'
              value = {setId}
              onChange = {(e) => setSetId(e.target.value)} />
          </div>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label for='name'>name:</label>
            <input
              name = 'name'
              value = {name}
              onChange = {(e) => setName(e.target.value)} />
          </div>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label for='year'>year:</label>
            <input
              name = 'year'
              type = 'number'
              value = {year}
              onChange = {(e) => setYear(e.target.value)} />
          </div>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label for='altId'>alt id:</label>
            <input
              name = 'altId'
              value = {altId}
              onChange = {(e) => setAltId(e.target.value)} />
          </div>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label for='altName'>alt name:</label>
            <input
              name = 'altName'
              value = {altName}
              onChange = {(e) => setAltName(e.target.value)} />
          </div>
          <div className='row' style={{justifyContent:'center', marginTop:10}}>
            <button type = 'submit'>add set</button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default NewSetForm;