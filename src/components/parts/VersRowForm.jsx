import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {PartsContext} from './PartsContext';

const VersRowForm = ({partId, version, toggle, onAddRow}) => {
  //variables
  const {logos, pips, infos, strucs} = useContext(PartsContext);
  const [versId, setVersId] = useState('');
  const [yearFrom, setYearFrom] = useState(1954);
  const [yearTo, setYearTo] = useState(1900);
  const [logo, setLogo] = useState('old');
  const [pip, setPip] = useState('low-side');
  const [mold, setMold] = useState('');
  const [place, setPlace] = useState('');
  const [info, setInfo] = useState('none');
  const [struc, setStruc] = useState([]);
  const [error, setError] = useState(false);
  
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRow = {versId: versId, yearFrom: yearFrom, yearTo: yearTo, logo: logo, pip: pip, mold: mold, place: place, info: info, struc: struc};
      if (version) {
        await axios.put(`/api/parts/edit/${partId}`, newRow);
      }
      else {
        await axios.put(`/api/parts/add/${partId}`, newRow);
      }
      onAddRow(newRow);
      toggle();
    } catch (err) {
      console.error('Adding row failed:', err);
      setError(err.response.data.error);
    }
  };

  //effects
  useEffect(() => {
    if (version) {
      setVersId(version.versId);
      setYearFrom(version.yearFrom);
      setYearTo(version.yearTo);
      setLogo(version.logo);
      setPip(version.pip);
      setMold(version.mold);
      setPlace(version.place);
      setInfo(version.info);
      setStruc(version.struc);
    }
  }, [version]);

  /*** RETURN ***/
  return (
    <div className='popup'>
      <div className='popup-inner'>
        <img src='../../assets/no.png' alt='close' className={'close'} onClick={toggle} />

        <h2 style={{textAlign:'center'}}>Add version</h2>

        {/* error message */}
        {error ? (<div style={{color:'red'}}>{error}</div>) : null}

        {/* row adding form */}
        <form onSubmit = {handleSubmit}>

          <div className={'row form-row'}>
            <label htmlFor='versId'>version id:</label>
            <input id='versId' name='versId' value={versId}
              onChange = {(e) => setVersId(e.target.value)} />
          </div>

          <div className={'row form-row'}>
            <label htmlFor='yearFrom'>from:</label>
            <input id='yearFrom' name='yearFrom' value={yearFrom} type='number'
              onChange = {(e) => setYearFrom(e.target.value)} />
          </div>

          <div className={'row form-row'}>
            <label htmlFor='yearTo'>to:</label>
            <input id='yearTo' name='yearTo' value={yearTo} type='number'
              onChange = {(e) => setYearTo(e.target.value)} />
          </div>

          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='logo'>logo:</label>
            <select id='logo' name='logo' value={logo}
              onChange = {(e) => setLogo(e.target.value)}>
              {logos.map((l, index) =>
                <option key={index} value={l}>{l}</option>
              )}
            </select>
          </div>

          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='pip'>pip:</label>
            <select id='pip' name='pip' value={pip}
              onChange = {(e) => setPip(e.target.value)}>
              {pips.map((p, index) =>
                <option key={index} value={p}>{p}</option>
              )}
            </select>
          </div>

          <div className={'row form-row'}>
            <label htmlFor='mold'>mold:</label>
            <input id='mold' name='mold' value={mold}
              onChange = {(e) => setMold(e.target.value)} />
          </div>

          <div className={'row form-row'}>
            <label htmlFor='place'>place:</label>
            <input id='place' name='place' value={place}
              onChange = {(e) => setPlace(e.target.value)} />
          </div>

          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='info'>info:</label>
            <select id='info' name='info' value={info}
              onChange = {(e) => setInfo(e.target.value)}>
              {infos.map((i, index) =>
                <option key={index} value={i}>{i}</option>
              )}
            </select>
          </div>

          <h3 style={{marginBottom:0}}>inner structures:</h3>
          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            {strucs.map((str, index) => (
              <label key={index}>
                <input type="checkbox" id={`struc-${str}`} value={str} checked={struc.includes(str)} style={{marginRight:10}}
                  onChange={(e) => {
                    if (e.target.checked) setStruc([...struc, str]);
                    else setStruc(struc.filter((s) => s !== str));
                  }} />
                  {str}
              </label>
            ))}
          </div>

          <div className={'row form-row'}>
            <button type = 'submit'>add version</button>
          </div>

        </form>
      </div>
    </div>
  );

};

export default VersRowForm;