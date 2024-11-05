import React, {useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import {PartsContext} from './PartsContext';
import Subparts from './Subparts';
import Part from './Part';

function Parts() {
  //variables
  const {cat, part} = useParams();
  const {types, bricksBasic} = useContext(PartsContext);

  /*** RETURN ***/

  //parts main view
  if (!cat) {
    return (
      <article aria-label='parts'>
        {/* bread crumb trail */}
        <p className="bread-crumbs">
          You are here: Parts
        </p>

        <h2>Parts</h2>

        {/* part categories */}
        <section aria-labelledby='basic-brix-heading'>
            <div className='row' style={{justifyContent:'space-between',marginBottom:50}}>
              {types.map((type, index) => 
                <div className={'cat-container col'} key={index}>
                  <Link to = {'/parts/' + type.link} className={"link-plain col"} tabIndex={0}>
                    <h3 style={{margin:3}}>{type.name}</h3>
                    <img src={'../assets/parts/' + type.img + '.png'} alt="" className="img-m" style={{alignSelf:'center'}}/>
                  </Link>
                </div>)}
            </div>
          </section>
      </article>
    );
  }
  
  //parts category view
  else {
    if (!part) {
      return (
        <Subparts cat={cat} />
      );
    }

    //one part view
    else {
      return (
        <Part cat={cat} part={part}/>
      );
    }
  }
};

export default Parts;