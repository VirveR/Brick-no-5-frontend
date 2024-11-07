import React, {useState, useEffect, useContext} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from "../AuthContext";
import {PartsContext} from './PartsContext';
import {SetsContext} from '../sets/SetsContext';
import VersRowForm from './VersRowForm.jsx';

const Set = ({cat, partId}) => {
  //variables
  const {user} = useContext(AuthContext);
  const {subparts, colors} = useContext(PartsContext);
  const {sets} = useContext(SetsContext);
  const [part, setPart] = useState(null);
  const [versRows, setVersRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [version, setVersion] = useState(null);

  //functions
  const toggleForm = () => setFormVisible(!formVisible);
  const addRow = (newRow) => setVersRows([...versRows, newRow]);
  const editVersion = (version) => {setVersion(version); toggleForm();}

  //effects
  useEffect(() => {
    const getPart = async () => {
      const response = await axios.get(`/api/parts/${partId}`);
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
    
    getPart();
  }, [partId, subparts]);

  useEffect(() => {
    if (!partId || !colors || !sets) return;

    const result = colors.map((color) => {
      const setsWithColor = sets.reduce((acc, set) => {
        const needsColor = set.needs.filter((need) =>
          need.partId === partId && need.color === color
        );
        needsColor.forEach((need) => {
          acc.push({setId: set.setId, year: set.year, quant: need.quant});
        });
        return acc;
      }, []);
      return {color: color, sets: setsWithColor};
    });

    const versSets = versRows.map((vers) => {
      const vs = result.filter((color) =>
        color.sets.some(
          (set) => set.year >= vers.yearFrom && set.year <= vers.yearTo
        )
      );
      const vets = vs.reduce((acc, color) => {
        color.sets.forEach((set) => {
          if (set.year >= vers.yearFrom && set.year <= vers.yearTo) {
            acc.push({color: color, setId: set.setId, year: set.year, quant: set.quant});
          }
        })
        return acc;
      }, []);
      return {...vers, sets: vets};
    });

    setVersRows(versSets);
  }, [sets, colors, partId]);

  console.log(versRows);

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

          <p className="small">Disclaimer: These versions are based on my own research. I'm fairly certain, I've got the timeline right, but 
            with a great probability the years are not exact, the nature of reality not being as clear cut as a model.
            There are exceptions and oddities to every version, but these cover the main lines. The gaps in mold identifier
            letters and numbers are due to the limits of my collection. I may change some details, as I research further.
          </p>

          {versRows.map((row, index) =>
            <div key={index} className={"cat-container"} style={{position:'relative'}}>
              <h3 style={{margin:5}}>{partId}-{row.versId} {row.yearFrom} - {row.yearTo} </h3>

                <div className="row" style={{justifyContent:'space-between'}}>

                  {/* version images */}
                  <div className="col">
                    <div className="row">
                      <img src={`../../assets/parts/${partId}-${row.versId}.png`} alt='outside view' style={{height:100, backgroundColor:'#F2CD37', marginLeft:10}} />
                      <ul>
                        <li>logo: {row.logo}</li>
                        <li>injection mark: {row.pip}</li>
                        <li>inside struct.: {row.struc}</li>
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