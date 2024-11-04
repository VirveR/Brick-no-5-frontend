import React, {createContext, useState, useEffect, useCallback} from 'react';
import axios from 'axios';

export const SetsContext = createContext();

export const SetsProvider = ({children}) => {
  //variables
  const [sets, setSets] = useState([]);
  const [subsets, setSubsets] = useState(() => {
    const savedSubsets = localStorage.getItem('subsets');
    return savedSubsets ? JSON.parse(savedSubsets) : [];
  });
  const decades = [
    {name: '1950s', img: '306-2'},
    {name: '1960s', img: '315-3'},
    {name: '1970s', img: '347-1'},
    {name: '1980s', img: '6363-1'},
    {name: '1990s', img: '6075-1'}
  ];
  const themes = [
    {name: 'cat 1', img: '621-2'},
    {name: 'cat 2', img: '722-2'}
  ];
  const bricksBasic = [
    {partId: '3005', size: '1x1'},
    {partId: '3004', size: '1x2'},
    {partId: '3622', size: '1x3'},
    {partId: '3010', size: '1x4'},
    {partId: '3009', size: '1x6'},
    {partId: '3008', size: '1x8'},
    {partId: '6111', size: '1x10'},
    {partId: '3003', size: '2x2'},
    {partId: '3002', size: '2x3'},
    {partId: '3001', size: '2x4'},
    {partId: '2456', size: '2x6'},
    {partId: '3007', size: '2x8'},
    {partId: '3006', size: '2x10'} 
  ];

  //get all sets
  const getSets = async () => {
    try {
      const response = await axios.get('/api/sets');
      setSets(response.data);
      localStorage.setItem('sets', JSON.stringify(response.data));
    } catch (err) {
      console.error('Fetching sets failed:', err);
      setSets(null);
      localStorage.removeItem('sets');
    }
  };

  //get sets by category
  const getSubsetsDecade = useCallback(async ({cat}) => {
    const d = parseInt(cat.slice(0, 4));
    if (!sets || sets.length === 0) await getSets();
    const ss = sets.filter((set) => ((set.year >= d) && (set.year < d + 10)));
    setSubsets(ss);
    localStorage.setItem('subsets', JSON.stringify(ss));
  }, [sets]);

  //effects
  useEffect(() => {
    const storedSets = JSON.parse(localStorage.getItem('sets'));
    if (storedSets) setSets(storedSets);
    else getSets();
    const storedSubsets = localStorage.getItem('subsets');
    if (storedSubsets) setSubsets(JSON.parse(storedSubsets));
  }, []);

  return (
    <SetsContext.Provider value = {{decades, themes, bricksBasic, subsets, setSubsets, getSubsetsDecade}}>
      {children}
    </SetsContext.Provider>
  );
};