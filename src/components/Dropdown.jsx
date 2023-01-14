import React, { useState } from 'react';

function Dropdown({ options }) {
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  return (
    <select
      className="outline-none focus:border-oceanBlue focus:border focus:ring-oceanBlue h-full 
    rounded-md bg-transparent py-0 pl-2 pr-2 text-gray-500 sm:text-sm"
      value={selectedOption}
      onChange={e => setSelectedOption(e.target.value)}>
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
