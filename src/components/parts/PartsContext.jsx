import React, {createContext, useState, useEffect, useCallback} from 'react';
import axios from 'axios';

export const PartsContext = createContext();

export const PartsProvider = ({children}) => {
  //variables
  const [parts, setParts] = useState([]);
  const [subparts, setSubparts] = useState([]);
  const bricksBasic = [
    {partId: '3005', size: '1x1'},
    {partId: '3004', size: '1x2'},
    {partId: '3622', size: '1x3'},
    {partId: '3010', size: '1x4'},
    {partId: '3009', size: '1x6'},
    {partId: '3008', size: '1x8'},
    {partId: '3003', size: '2x2'},
    {partId: '3002', size: '2x3'},
    {partId: '3001', size: '2x4'},
    {partId: '3007', size: '2x8'},
    {partId: '3006', size: '2x10'}
  ]
  const types = [
    {name: 'Bricks, basic', link: 'bricks-basic', img: '3003'},
    {name: 'Plates, basic', link: 'plates-basic', img: '3003'},
    {name: 'Bricks, special', link: 'bricks-special', img: '3003'},
    {name: 'Plates, special', link: 'plates-special', img: '3003'},
  ];
  const colors = ['white', 'red', 'blue', 'yellow', 'black', 'gray', 'trans-clear', 'dark-gray', 'brown', 'green', 'tan', 'trans-yellow', 'trans-red', 'trans-blue', 'trans-green'];
  const logos = ['old', 'small', 'pretty', 'messy', 'premodern', 'spiky', 'modern'];
  const pips = ['low-side', 'side-side', 'mid-side', 'top'];
  const infos = ['none', 'Pat.pend', 'Pat.pend obsc.', 'part no'];
  const strucs = ['none', 'hollow', 'vert. lines', 'split tubes', 'horiz. lines 1', 'horiz. lines 2', 'horiz. lines 3', 'hollow bottom studs', 'cross-support'];

  //get all parts
  const getParts = async () => {
    try {
      const response = await axios.get('/api/parts');
      setParts(response.data);
      localStorage.setItem('parts', JSON.stringify(response.data));
    } catch (err) {
      console.error('Fetching parts failed:', err);
      setParts(null);
      localStorage.removeItem('parts');
    }
  };

  //get parts by category
  const getSubparts = useCallback(async ({cat}) => {
    if (!parts || parts.length === 0) await getParts();
    const ss = parts.filter((part) => part.type === cat);
    setSubparts(ss);
    localStorage.setItem('subparts', JSON.stringify(ss));
  }, [parts]);

  //effects
  useEffect(() => {
    const storedParts = JSON.parse(localStorage.getItem('parts'));
    if (storedParts) setParts(storedParts);
    else getParts();
    const storedSubparts = localStorage.getItem('subparts');
    if (storedSubparts) setSubparts(JSON.parse(storedSubparts));
  }, []);

  return (
    <PartsContext.Provider value = {{bricksBasic, types, colors, logos, pips, infos, strucs, subparts, getSubparts}}>
      {children}
    </PartsContext.Provider>
  );
};