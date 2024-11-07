import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {PartsContext} from './PartsContext';

const VersRowForm = ({partId, version, toggle, onAddRow}) => {
  //variables
  const {logos, pips, infos, strucs, colors} = useContext(PartsContext);
  const [edit, setEdit] = useState(false);
  const [versId, setVersId] = useState('');
  const [year, setYear] = useState(1954);
  const [logo, setLogo] = useState('old');
  const [pip, setPip] = useState('low-side');
  const [mold, setMold] = useState('');
  const [place, setPlace] = useState('');
  const [info, setInfo] = useState('none');
  const [struc, setStruc] = useState('none');
  const [out, setOut] = useState('');
  const [inn, setInn] = useState('');
  const [bot, setBot] = useState('');
  const [cols, setCols] = useState([]);
  const [error, setError] = useState(false);
  
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRow = {versId: versId, year: year, logo: logo, pip: pip, mold: mold, place: place, info: info, struc: struc, out: out, in: inn, bot: bot, colors: cols};
      if (edit) await axios.put(`/api/parts/add/${partId}`, newRow);
      else await axios.put(`/api/parts/edit/${partId}`, newRow);
      onAddRow(newRow);
      toggle();
    } catch (err) {
      console.error('Adding row failed:', err);
      setError(err.response.data.message);
    }
  };

  console.log(edit);

  //effects
  useEffect(() => {
    if (version) {
      setEdit(true);
      setVersId(version.versId);
      setYear(version.year);
      setLogo(version.logo);
      setPip(version.pip);
      setMold(version.mold);
      setPlace(version.place);
      setInfo(version.info);
      setStruc(version.struc);
      setOut(version.out);
      setInn(version.in);
      setBot(version.bot);
      setCols(version.colors);
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
            <label htmlFor='year'>year:</label>
            <input id='year' name='year' value={year} type='number'
              onChange = {(e) => setYear(e.target.value)} />
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

          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            <label htmlFor='struc'>structures:</label>
            <select id='struc' name='struc' value={struc}
              onChange = {(e) => setStruc(e.target.value)}>
              {strucs.map((s, index) =>
                <option key={index} value={s}>{s}</option>
              )}
            </select>
          </div>

          <div className={'row form-row'}>
            <label htmlFor='out'>outside:</label>
            <input id='out' name='out' value={out}
              onChange = {(e) => setOut(e.target.value)} />
          </div>

          <div className={'row form-row'}>
            <label htmlFor='in'>inside:</label>
            <input id='in' name='in' value={inn}
              onChange = {(e) => setInn(e.target.value)} />
          </div>

          <div className={'row form-row'}>
            <label htmlFor='bot'>bottom:</label>
            <input id='bot' name='bot' value={bot}
              onChange = {(e) => setBot(e.target.value)} />
          </div>

          <div className='row' style={{justifyContent:'space-between', padding:5}}>
            {colors.map((color, index) => (
              <label key={index}>
                <input type="checkbox" id={`color-${color}`} value={color} checked={cols.includes(color)} style={{marginRight:10}}
                  onChange={(e) => {
                    if (e.target.checked) setCols([...cols, color]);
                    else setCols(cols.filter((c) => c !== color));
                  }} />
                  {color}
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