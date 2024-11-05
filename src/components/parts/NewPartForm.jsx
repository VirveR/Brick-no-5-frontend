import React, {useState, useContext} from 'react';
import axios from 'axios';
import {PartsContext} from '../parts/PartsContext';

const NewPartForm = ({toggle}) => {
  //variables
  const {types} = useContext(PartsContext);
  const [partId, setPartId] = useState('');
  const [type, setType] = useState('bricks-basic');
  const [size, setSize] = useState('');
  const [yearFrom, setYearFrom] = useState(1957);
  const [yearTo, setYearTo] = useState(2024);
  const [error, setError] = useState(false);
  
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/parts', {partId, type, size, yearFrom, yearTo});
      toggle();
    } catch (err) {
      console.error('Adding part failed:', err);
      setError(err.response.data.message);
    }
  };


  return (
    <div className='popup'>
      <div className='popup-inner'>
        <img src='../assets/no.png' alt='close' className='icon' style={{position:'absolute', right:10, top:10, cursor:'pointer'}} onClick={toggle} />
        <h2 style={{textAlign:'center'}}>Add part</h2>
        {error && <div style={{color:'red'}}>{error}</div>}{' '}
        <form onSubmit = {handleSubmit}>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='partId'>part id:</label>
            <input id='partId' name='partId' value={partId}
              onChange = {(e) => setPartId(e.target.value)} />
          </div>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='type'>type:</label>
            <select id='type' name='type' value={type}
              onChange = {(e) => setType(e.target.value)}>
              {types.map((type) =>
                <option value={type.link}>{type.name}</option>
              )}
            </select>
          </div>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='size'>size:</label>
            <input id='size' name='size' value={size}
              onChange = {(e) => setSize(e.target.value)} />
          </div>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='yearFrom'>year from:</label>
            <input id='yearFrom' name='yearFrom' value={yearFrom} type='number'
              onChange = {(e) => setYearFrom(e.target.value)} />
          </div>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='yearTo'>year to:</label>
            <input id='yearTo' name='yearTo' value={yearTo} type='number'
              onChange = {(e) => setYearTo(e.target.value)} />
          </div>
          <div className='row' style={{justifyContent:'center', marginTop:10}}>
            <button type = 'submit'>add part</button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default NewPartForm;