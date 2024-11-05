import React, {useState, useContext, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {SetsContext} from './SetsContext';
import {AuthContext} from '../AuthContext';
import NewSetForm from './NewSetForm';

const Subsets = ({cat}) => {
  //variables
  const {user} = useContext(AuthContext);
  const {decades, subsets, getSubsetsDecade} = useContext(SetsContext);
  const navigate = useNavigate();
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  //functions
  const toggleForm = () => setFormVisible(!formVisible);

  //effects
  useEffect(() => {
    getSubsetsDecade({cat: cat});
    //prev & next index for navigation
    const currI = decades.findIndex((dec) => dec.name === cat);
    const prevI = currI > 0 ? decades[currI - 1] : null;
    setPrev(prevI);
    const nextI = currI < decades.length - 1 ? decades[currI + 1] : null;
    setNext(nextI);
    setLoading(false);
  }, [cat, getSubsetsDecade])

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
      <article aria-labelledby="subsets-heading">

        {/* bread crumb trail */}
        <p className="bread-crumbs">
          You are here:
          <Link to='../sets' className={'link-plain'} tabIndex={0}> Sets | </Link>
          {cat}
        </p>

        {/* previous and next category */}
        <div className="row next">
          {(prev != null) ? (
            <Link to={`../sets/${prev.name}`} className='link-plain' style={{marginBottom:10}}>
              &#x2B9C; {prev.name}</Link>
          ) : <p></p>}
          {(next != null) ? (
            <Link to={`../sets/${next.name}`} className='link-plain' style={{marginBottom:10}}>
              {next.name} &#x2B9E;</Link>
          ) : <p></p>}
        </div>

        <h2 id="subsets-heading">{cat} Sets</h2>
        <table><tbody>
          {subsets.map((set, index) =>
          <tr key={index}
            onClick={() => navigate(`/sets/${cat}/${set.setId}`)}>
              <td>{set.year}</td>
              <td>{set.setId}</td>
              <td>{set.name}</td>
            </tr>
          )}
        </tbody></table>

        {/* add set (TO BE REMOVED WHEN DONE) */}
        {user ? <button onClick={toggleForm}>add set</button> : null}
        {formVisible ? <NewSetForm toggle={toggleForm} /> : null}

      </article>
    );
  }
};

export default Subsets;