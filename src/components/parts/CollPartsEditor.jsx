import {useState} from 'react';
import axios from 'axios';

const CollPartsEditor = ({parts, coll, collPart}) => {
  const [localParts, setLocalParts] = useState(() => {
    const initialState = {};
    collPart.forEach(part => {
      initialState[`${version}-${color}`] = part.quant;
    });
    return initialState;
  });

  const addParts = (key) => {
    setLocalParts((prev) => ({
      ...prev,
      [key]: Math.max((prev[key] || 0) + 1, 0)
    }));
  };

  const removeParts = (key) => {
    setLocalParts((prev) => ({
      ...prev,
      [key]: Math.max((prev[key] || 0) - 1, 0)
    }));
  };

  const saveChanges = async () => {
    try {
      const updated = Object.entries(localParts).map(([key, quant]) => {
        const [version, color] = key.split('-');
        return {version, color, quant};
      });
      await axios.put(`/api/colls/addpart/${coll._id}`, {parts: updated});
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };
}