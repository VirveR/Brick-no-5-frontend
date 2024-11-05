import React, { useContext } from 'react';
import {useParams, Link} from 'react-router-dom';
import {SetsContext} from './SetsContext';
import Subsets from './Subsets';
import Set from './Set';

const Sets = () => {
  //variables
  const {cat, set} = useParams();
  const {decades, themes} = useContext(SetsContext);
  
  //sets main view
  if (!cat) {
    return (
      <article aria-label='sets'>

        {/* bread crumb trail */}
        <p className="bread-crumbs">
          You are here: Sets
        </p>

        {/* sets by decade */}
        <section aria-labelledby='set-decades-heading'>
          <h2 id='sets-decades-heading'>Sets by decade</h2>
          <div className='row' style={{justifyContent:'space-between',marginBottom:50}}>
            {decades.map((decade, index) => 
              <div className={'cat-container col'} key={index}>
                <Link to = {'/sets/' + decade.name} className={"link-plain col"} tabIndex={0}>
                  <h3 style={{margin:3}}>{decade.name}</h3>
                  <img src={'../assets/sets/' + decade.img + '.jpg'} alt="" className="img-m" />
                </Link>
              </div>)}
          </div>
        </section>

        {/* sets by theme */}
        <section aria-labelledby='set-themes-heading'>
          <h2 id='sets-themes-heading'>Sets by theme</h2>
          <div className='row'>
            {themes.map((theme, index) => 
              <div style={{marginRight:30}} key={index}>
                <Link to = {'/sets/' + theme.name} className="link-plain" tabIndex={0}>
                  <h3 style={{margin:3}}>{theme.name}</h3>
                  <img src={'../assets/sets/' + theme.img + '.jpg'} alt="" className="img-m" />
                </Link>
              </div>)}
          </div>
        </section>

      </article> 
    );
  }

  //sets category view
  else {
    if (!set) {
      return (
        <Subsets cat={cat} />
      );
    }

    //one set view
    else {
      return (
        <Set cat={cat} setId={set}/>
      );
    }
  }
};

export default Sets;