import { useState } from 'react';

const useAccordion = (initialState = {}) => {
  const [openItems, setOpenItems] = useState(initialState);

  const toggleItem = (itemId) => {
    setOpenItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return { openItems, toggleItem };
};

export default useAccordion;