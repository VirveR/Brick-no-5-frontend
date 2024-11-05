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
    <SetsContext.Provider value = {{decades, themes, subsets, setSubsets, getSubsetsDecade}}>
      {children}
    </SetsContext.Provider>
  );
};