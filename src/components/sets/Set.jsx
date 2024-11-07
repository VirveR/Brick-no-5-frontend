import React, {useState, useEffect, useContext} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from "../AuthContext";
import {SetsContext} from './SetsContext';
import NeedsRowForm from "./NeedsRowForm";

const Set = ({cat, setId}) => {
  //variables
  const {user} = useContext(AuthContext);
  const [set, setSet] = useState(null);
  const [needsRows, setNeedsRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const {subsets} = useContext(SetsContext);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  //functions
  const toggleForm = () => setFormVisible(!formVisible);
  const addRow = (newRow) => setNeedsRows([...needsRows, newRow]);

  //effects
  useEffect(() => {
    const getSet = async () => {
      const response = await axios.get(`/api/sets/${setId}`);
      const data = await response.data;
      await setSet(data);
      setNeedsRows(data.needs);
      //prev & next index for navigation
      const currI = subsets.findIndex((set) => set.setId === setId);
      const prevI = currI > 0 ? subsets[currI - 1] : null;
      setPrev(prevI);
      const nextI = currI < subsets.length - 1 ? subsets[currI + 1] : null;
      setNext(nextI);
      setLoading(false);
    }
    
    getSet();
  }, [setId, subsets]);

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
      <div className="row" id="set-details-sec">

        {/* bread crumb trail */}
        <p className="bread-crumbs">
          You are here:
          <Link to='../sets' className={'link-plain'} tabIndex={0}> Sets | </Link>
          <Link to={`../sets/${cat}`} className={'link-plain'} tabIndex={0}>{cat} | </Link>
          <span>{setId}: {set.name}</span> 
        </p>

        {/* previous and next sets */}
        <div className="row next">
          {(prev != null) ? (
            <Link to={`../sets/${cat}/${prev.setId}`} className='link-plain' style={{marginBottom:10}}>
              &#x2B9C; Previous set: {prev.setId}: {prev.name}</Link>
          ) : <p></p>}
          {(next != null) ? (
            <Link to={`../sets/${cat}/${next.setId}`} className='link-plain' style={{marginBottom:10}}>
              Next set: {next.setId}: {next.name} &#x2B9E;</Link>
          ) : <p></p>}
        </div>

        {/* set image */}
        <div>
          <img src={`../../assets/sets/${setId}.jpg`} alt='set instruction cover' />
        </div>

        {/* set info */}
        <section className={"set-info col"}>
          <h2>{set.setId}: {set.name}</h2>
          <h3>{set.year}</h3>
          <div className="row">
            <img src='../../assets/bricklink.png' alt='bricklink logo' className="icon" style={{marginRight:10}}/>
            <a href={`https://www.bricklink.com/v2/catalog/catalogitem.page?S=${set.setId}`} >
              See in Bricklink</a>
          </div>
        </section>

        <section aria-labelledby="set-content-heading">
          <h2 id="set-content-heading">Set contents</h2>
          <h3 id="basic-bricks-heading">Bricks, basic</h3>
          <table><tbody>
            {needsRows.map((row, index) =>
              <tr key={index}>
                <td>{row.partId}</td>
                <td>{row.version}</td>
                <td><span className={`color-box ${row.color}`}></span>{row.color}</td>
                <td>{row.quant}</td>
            </tr>
            )}
          </tbody></table>

          {user ? <button onClick={toggleForm}>add row</button> : null}
          {formVisible ? <NeedsRowForm setId = {setId} 
            toggle={toggleForm} onAddRow={addRow} /> : null}
            
        </section>
      </div>
    );
  }
};

export default Set;