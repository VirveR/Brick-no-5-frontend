import React, {useState, useContext} from 'react';
import axios from 'axios';
import { SetsContext } from '../SetsContext';

const NeedsRowForm = ({setId, toggle, onAddRow}) => {
  //variables
  const {bricksBasic} = useContext(SetsContext);
  const [partId, setPartId] = useState('3005');
  const [version, setVersion] = useState('');
  const [color, setColor] = useState('white');
  const [quant, setQuant] = useState(0);
  const [error, setError] = useState(false);
  
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRow = {partId: partId, version: version, color: color, quant: quant};
      await axios.put(`/api/sets/add/${setId}`, newRow);
      onAddRow(newRow);
      toggle();
    } catch (err) {
      console.error('Adding row failed:', err);
      setError(err.response.data.message);
    }
  };

  /*** RETURN ***/
  return (
    <div className='popup'>
      <div className='popup-inner'>
        <img src='../../assets/no.png' alt='close' className={'close'} onClick={toggle} />

        <h2 style={{textAlign:'center'}}>Add row</h2>

        {/* error message */}
        {error ? (<div style={{color:'red'}}>{error}</div>) : null}

        {/* row adding form */}
        <form onSubmit = {handleSubmit}>

          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='partId'>part id:</label>
              <select id='partId' name='partId' value={partId}
                onChange = {(e) => setPartId(e.target.value)}>
                {bricksBasic.map((brick) =>
                  <option value={brick.partId}>{brick.partId} {brick.size}</option>
                )}
              </select>
          </div>

          <div className={'row form-row'}>
            <label htmlFor='version'>version:</label>
            <input id='version' name='version' value={version}
              onChange = {(e) => setVersion(e.target.value)} />
          </div>

          <div className={'row form-row'}>
            <label htmlFor='color'>color:</label>
              <select id='color' name='color' value={color}
                onChange = {(e) => setColor(e.target.value)} >
                <option value='white'>white</option>
                <option value='red'>red</option>
                <option value='blue'>blue</option>
                <option value='yellow'>yellow</option>
                <option value='black'>black</option>
                <option value='gray'>gray</option>
                <option value='trans-clear'>trans-clear</option>
              </select>
            
          </div>

          <div className={'row form-row'}>
            <label htmlFor='quant'>quant:</label>
            <input id='quant' name='quant' value={quant} type='number'
              onChange = {(e) => setQuant(e.target.value)} />
          </div>

          <div className={'row form-row'}>
            <button type = 'submit'>add row</button>
          </div>

        </form>
      </div>
    </div>
  );

};

export default NeedsRowForm;