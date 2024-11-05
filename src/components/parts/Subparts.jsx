import React, {useState, useEffect, useContext} from "react";
import {useNavigate, Link} from 'react-router-dom';
import {PartsContext} from './PartsContext';
import {AuthContext} from '../AuthContext';
import NewPartForm from './NewPartForm';

const Subparts = ({cat}) => {
  //variables
  const {user} = useContext(AuthContext);
  const {types, subparts, getSubparts} = useContext(PartsContext);
  const type = types.find((t) => t.link === cat);
  const navigate = useNavigate();
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  //functions
  const toggleForm = () => setFormVisible(!formVisible);

  //effects
  useEffect(() => {
    getSubparts({cat});
    setLoading(false);
  }, [cat, getSubparts]);
  
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
      <article aria-labelledby="subparts-heading">

        {/* bread crumb trail */}
        <p className="bread-crumbs">
          You are here:
          <Link to='../parts' className={'link-plain'} tabIndex={0}> Parts | </Link>
          {type.name}
        </p>

        <h2 id="subparts-heading">{type.name}</h2>
        <table><tbody>
          {subparts.map((part, index) =>
          <tr key={index}
            onClick={() => navigate(`/parts/${cat}/${part.partId}`)}>
              <td>{part.partId}</td>
              <td>{part.size}</td>
              <td>{part.yearFrom}</td>
              <td>{part.yearTo}</td>
            </tr>
          )}
        </tbody></table>

        {/* add set (TO BE REMOVED WHEN DONE) */}
        {user ? <button onClick={toggleForm}>add part</button> : null}
        {formVisible ? <NewPartForm toggle={toggleForm} /> : null}

      </article>
    );
  }
};

export default Subparts;