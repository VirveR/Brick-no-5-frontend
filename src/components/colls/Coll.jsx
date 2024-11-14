import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../AuthContext';
import NewCollForm from './NewCollForm';

function Coll() {
  //variables
  const {user} = useContext(AuthContext);
  const [colls, setColls] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  //functions
  const toggleForm = () => setFormVisible(!formVisible);
  const addRow = (newRow) => setColls([...colls, newRow]);

  //effects
  useEffect(() => {
    if (user) {
      setColls(user.colls);
    }
  }, [user]);

  /*** RETURN ***/

  if (!user) {
    return (
      <article>
        <h2>Collection</h2>
          <p>Register or log in to view your collection or create one.</p>
      </article>
    );
  }
  else {
    return (
      <article>
        <h2>Collection</h2>
        

        {/* add collection */}
        {user ? <button onClick={toggleForm}>create collection</button> : null}
          {formVisible ? <NewCollForm user={user} 
            toggle={toggleForm} onAddRow={addRow} /> : null}

      </article>
    );
  }
};

export default Coll;