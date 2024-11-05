import React from "react";
import {Link} from 'react-router-dom';

const Part = ({cat, part}) => {
  return (
    <div>
      {/* bread crumb trail */}
      <p className="bread-crumbs">
          You are here:
          <Link to='../parts' className={'link-plain'} tabIndex={0}> Parts | </Link>
          <Link to={`../parts/${cat}`} className={'link-plain'} tabIndex={0}>{cat} | </Link>
          <span>{part}</span> 
        </p>
      <h2>Part</h2>
    </div>
  );
};

export default Part;