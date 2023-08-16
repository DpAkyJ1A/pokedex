import React, { useState } from 'react';
import Generations from './Generations';
import Types from './Types';

export default function Filter() {
  const [openFilter, setOpenFilter] = useState(false);
  const [filterToggleText, setFilterToggleText] = useState('↓ Filters ↓');

  return (
    <div className={`filter ${openFilter ? 'filter_open' : ''}`}>
      <div className="filter__content">
        <Types />
        <Generations />
      </div>
      <span
        onClick={() => {
          setOpenFilter(!openFilter);
          setFilterToggleText(filterToggleText.startsWith('↓') ? '↑ Filters ↑' : '↓ Filters ↓');
        }}
        className="filter__toggle"
      >
        {filterToggleText}
      </span>
    </div>
  );
}
