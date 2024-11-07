import React, {useState, useEffect, useContext} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from "../AuthContext";
import {PartsContext} from './PartsContext';
import VersRowForm from './VersRowForm.jsx';

const Set = ({cat, partId}) => {
  //variables
  const {user} = useContext(AuthContext);
  const [part, setPart] = useState(null);
  const [versRows, setVersRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const {subparts} = useContext(PartsContext);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [version, setVersion] = useState(null);

  //functions
  const toggleForm = () => setFormVisible(!formVisible);
  const addRow = (newRow) => setVersRows([...versRows, newRow]);
  const editVersion = (version) => {setVersion(version); toggleForm();}

  //effects
  useEffect(() => {
    const getSet = async () => {
      const response = await axios.get(`/api/parts/${partId}`);
      console.log(response.data.versions);
      const data = await response.data;
      await setPart(data);
      setVersRows(data.versions);
      //prev & next index for navigation
      const currI = subparts.findIndex((part) => part.partId === partId);
      const prevI = currI > 0 ? subparts[currI - 1] : null;
      setPrev(prevI);
      const nextI = currI < subparts.length - 1 ? subparts[currI + 1] : null;
      setNext(nextI);
      setLoading(false);
    }
    
    getSet();
  }, [partId, subparts]);

  /*** RETURN ***/
  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }
  else {
    return (
      <article>

        {/* bread crumb trail */}
        <p className="bread-crumbs">
          You are here:
          <Link to='../parts' className={'link-plain'} tabIndex={0}> Parts | </Link>
          <Link to={`../parts/${cat}`} className={'link-plain'} tabIndex={0}>{cat} | </Link>
          <span>{partId}: {part.size} {part.type}</span> 
        </p>

        {/* previous and next parts */}
        <div className="row next">
          {(prev != null) ? (
            <Link to={`../parts/${cat}/${prev.partId}`} className='link-plain' style={{marginBottom:10}}>
              &#x2B9C; Previous part: {prev.partId}: {prev.size} {prev.type}</Link>
          ) : <p></p>}
          {(next != null) ? (
            <Link to={`../parts/${cat}/${next.partId}`} className='link-plain' style={{marginBottom:10}}>
              Next part: {next.partId}: {next.size} {next.type} &#x2B9E;</Link>
          ) : <p></p>}
        </div>

        <div className="row" id="part-details-sec">

          {/* part image */}
          <div>
            <img src={`../../assets/parts/${partId}.png`} alt={`part ${partId}`} style={{width:100}}/>
          </div>

          {/* part info */}
          <section className={"col set-info"}>
            <h2>{part.partId}: {part.size} {part.type}</h2>
            <h3>{part.yearFrom} - {part.yearTo}</h3>
            <div className="row">
              <img src='../../assets/bricklink.png' alt='bricklink logo' className="icon" style={{marginRight:10}}/>
              <a href={`https://www.bricklink.com/v2/catalog/catalogitem.page?P=${partId}#T=C`} >
                See in Bricklink</a>
            </div>
          </section>

        </div>
        <div>

        <section aria-labelledby="part-version-heading">
          <h2 id="part-version-heading">Versions</h2>

          {versRows.map((row, index) =>
            <div key={index} className={"cat-container"} style={{position:'relative'}}>
              <h3 style={{margin:5}}>{partId}-{row.versId} {row.year} </h3>

                <div className="row" style={{justifyContent:'space-between'}}>

                  {/* version images */}
                  <div className="col">
                    <div className="row">
                      <img src={`../../assets/parts/${partId}-out${row.out}.png`} alt='outside view' style={{width:50, backgroundColor:'#F2CD37', marginLeft:10}} />
                      <ul>
                        <li>logo: {row.logo}</li>
                        <li>injection mark: {row.pip}</li>
                      </ul>
                    </div>
                    <div className="row">
                      <img src={`../../assets/parts/${partId}-in${row.in}.png`} alt='inside view' style={{width:50, backgroundColor:'#F2CD37', marginLeft:10}} />
                      <ul>
                        <li>inside: {row.struc}</li>
                      </ul>
                    </div>
                    <div className="row">
                      <img src={`../../assets/parts/${partId}-bot${row.bot}.png`} alt='bottom view' style={{width:50, backgroundColor:'#F2CD37', marginLeft:10}} />
                      <ul>
                      <li>mold id: {row.mold}</li>
                        <li>place id: {row.place}</li>
                        <li>info: {row.info}</li>
                      </ul>
                    </div>
                  </div>

                  {/* colors */}
                  <div className="col">
                    {row.colors.map((col, index) =>
                      <p key={index} style={{margin:5}}>
                        <span className={`color-box ${col}`}></span>
                      </p>
                    )}
                  </div>
                  
                </div>
                  
              <img src='../../assets/edit.png' alt='edit' className="close" onClick={() => editVersion(row)}/>
            </div>
          )}

          {user ? <button onClick={toggleForm}>add version</button> : null}
          {formVisible ? <VersRowForm partId={partId} version={version}
            toggle={toggleForm} onAddRow={addRow} /> : null}

        </section>

        </div>
      </article>
    );
  }
};

export default Set;