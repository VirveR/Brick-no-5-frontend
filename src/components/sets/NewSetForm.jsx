import React, {useState} from 'react';
import axios from 'axios';

const NewSetForm = ({toggle, onAddSet}) => {
  //variables
  const [setId, setSetId] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState(0);
  const [altId, setAltId] = useState('');
  const [altName, setAltName] = useState('');
  const [error, setError] = useState(false);
  
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSet = {setId: setId, name: name, year: year, altId: altId, altName: altName}
      await axios.post('/api/sets', newSet);
      onAddSet(newSet);
      toggle();
    } catch (err) {
      console.error('Adding set failed:', err);
      setError(err.response.data.message);
    }
  };


  return (
    <div className='popup'>
      <div className='popup-inner'>
        <img src='../assets/no.png' alt='close' className='close' style={{position:'absolute', right:10, top:10, cursor:'pointer'}} onClick={toggle} />
        <h2 style={{textAlign:'center'}}>Add set</h2>
        {error && <div style={{color:'red'}}>{error}</div>}{' '}
        <form onSubmit = {handleSubmit}>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='setId'>set id:</label>
            <input id='setId' name='setId' value={setId} autoComplete='off'
              onChange = {(e) => setSetId(e.target.value)} />
          </div>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='name'>name:</label>
            <input id='name' name='name' value={name} autoComplete='off'
              onChange = {(e) => setName(e.target.value)} />
          </div>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='year'>year:</label>
            <input id='year' name='year' type='number' value={year}
              onChange = {(e) => setYear(e.target.value)} />
          </div>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='altId'>alt id:</label>
            <input id='altId' name='altId' value={altId}
              onChange = {(e) => setAltId(e.target.value)} />
          </div>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='altName'>alt name:</label>
            <input id='altName' name='altName' value={altName}
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