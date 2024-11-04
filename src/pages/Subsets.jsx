import React, {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {SetsContext} from '../components/SetsContext';
import {AuthContext} from '../components/AuthContext';
import NewSetForm from '../components/sets/NewSetForm';

const Subsets = ({cat}) => {
  //variables
  const {user} = useContext(AuthContext);
  const {subsets, getSubsetsDecade} = useContext(SetsContext);
  const navigate = useNavigate();
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  //functions
  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  //effects
  useEffect(() => {
    getSubsetsDecade({cat: cat});
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