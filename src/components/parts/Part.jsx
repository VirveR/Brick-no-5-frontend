import React, {useState, useEffect, useContext} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from "../AuthContext";
import {PartsContext} from './PartsContext';
import {SetsContext} from '../sets/SetsContext';
import VersRowForm from './VersRowForm.jsx';

const Set = ({cat, partId}) => {
  //variables
  const {user, coll} = useContext(AuthContext);
  const {subparts} = useContext(PartsContext);
  const {sets} = useContext(SetsContext);
  const [pets, setPets] = useState([]);
  const [collPart, setCollPart] = useState([]);
  const [part, setPart] = useState(null);
  const [versRows, setVersRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [visibleSets, setVisibleSets] = useState({});
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [version, setVersion] = useState(null);

  //functions
  const toggleForm = () => setFormVisible(!formVisible);
  const toggleVisibleSets = (rowIndex, color) => {
    const key = `${rowIndex}-${color}`;
    setVisibleSets((prevState) => ({
      ...prevState, [key]: !prevState[key]
    }));
  };
  const addRow = (newRow) => setVersRows([...versRows, newRow]);
  const editVersion = (version) => {setVersion(version); toggleForm();}

  //effects
  //get part information
  useEffect(() => {
    const getPart = async () => {
      const response = await axios.get(`/api/parts/${partId}`);
      const data = await response.data;
      setPart(data);
      setVersRows(data.versions);
      //collection
      if (coll.length > 0) {
        const filteredColl = coll.parts.filter((part) => part.partId === partId);
        setCollPart(filteredColl);
      }
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

  //get sets including part groupped by color
  useEffect(() => {
    const updatedVersRows = versRows.map( vers => {
      const start = vers.yearFrom;
      const end = vers.yearTo;
      
      const filteredSets = sets.filter(set =>
        set.year >= start && set.year <= end
      );

      const setsByColor = {};
      filteredSets.forEach(set => {
        set.needs.filter(row => row.partId === partId)
          .forEach(row => {
            if (!setsByColor[row.color]) {
              setsByColor[row.color] = [];
            }
            setsByColor[row.color].push({id: set.setId, name: set.name, year: set.year, quant: row.quant});
          });
      });
      return {...vers, sets: setsByColor}
    });

    setPets(updatedVersRows);
  }, [versRows, sets, partId]);

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

          {pets.map((row, rowIndex) =>
            <div key={rowIndex} className={"cat-container"} style={{position:'relative'}}>
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
                  
                </div>

                {/* colors */}
                <table><tbody>
                  {Object.entries(row.sets).map(([color, sets]) => {
                    const key = `${rowIndex}-${color}`;
                    const total = sets.map(s => s.quant).reduce((acc, a) => acc + a, 0);
                    const collMatch = collPart.find((p) => p.versId === row.versId && p.color === color);
                    return (
                      <React.Fragment key={key}>
                        <tr style={{margin:0, marginRight:5, cursor:'pointer'}} onClick={() => toggleVisibleSets(rowIndex, color)}>
                          <td><span className={`color-box ${color}`}></span> {color}</td>
                          <td></td>
                          <td>total {total}</td>
                          <td> in {sets.length} sets</td> 
                          <td>|</td>
                          <td>you have {collMatch ? collMatch.quant : 0}</td>
                          {/* Add part to collection */}
                          <td>
                            <form>
                              <input id='collQuant' name='collQuant' type='number' style={{width:50}}/>
                              <span style={{padding:3}}>&#10133;</span>
                            </form>
                          </td>
                        </tr>

                        {visibleSets[key] && (
                          <tr>
                            <td colSpan='4' style={{padding:8}}>
                              <table><tbody>
                                {sets.map((set, setIndex) => (
                                  <tr key={setIndex}>
                                    <td style={{padding:0, paddingRight:10}}>{set.year}</td> 
                                    <td style={{padding:0, paddingRight:10}}>{set.id}</td>
                                    <td style={{padding:0, paddingRight:10}}>{set.name}</td>
                                    <td>needs {set.quant}</td>
                                    <td>has x</td>
                                  </tr>
                                ))}
                              </tbody></table>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody></table>
                  
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