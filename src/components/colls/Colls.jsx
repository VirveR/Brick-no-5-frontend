import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from '../AuthContext';
import NewCollForm from './NewCollForm';

function Coll() {
  //variables
  const {user, loading} = useContext(AuthContext);
  const [colls, setColls] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  //functions
  const toggleForm = () => setFormVisible(!formVisible);
  const addRow = (newRow) => setColls([...colls, newRow]);

  //effects
  useEffect(() => {
    if (user && user.colls && !loading) {
      const getColls = async (co) => {
        const userColls = [];
        for (const coll of co) {
          const response = await axios.get(`/api/colls/${coll._id}`);
          userColls.push(response.data);
        }
        return userColls;
      };

      const getSetColls = async () => {
        const resolved = await getColls(user.colls);
        setColls(resolved);
      }
      
      getSetColls();
    }
  }, [user, user?.colls, loading]);

  /*** RETURN ***/

  if (!user) {
    return (
      <article>
        <h2>Your collections</h2>
          <p>Register or log in to view your collection or create one.</p>
      </article>
    );
  }
  else if (loading) {
    return (
      <article>
        <h2>Your collections</h2>
          <p>Loading...</p>
      </article>
    );
  }
  else {
    return (
      <article>
        <h2>Your collections</h2>
        {colls.map((coll) => 
          <p key={coll._id}>{coll.name}</p>
        )}

        {/* add collection */}
        <button onClick={toggleForm}>create collection</button>
          {formVisible ? <NewCollForm user={user} 
            toggle={toggleForm} onAddRow={addRow} /> : null}

      </article>
    );
  }
};

export default Coll;