import React from 'react';

interface ISearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search(props: ISearchProps) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search..."
        value={props.query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setQuery(e.target.value)}
      />
    </div>
  );
}
