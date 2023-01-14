import React from 'react';

const Input = ({ value, onChange }) => (
  <input
    type="number"
    name="income"
    id="income"
    min="0"
    value={value}
    onChange={onChange}
    className="outline-none block py-[7px] w-full rounded-md border border-gray-300 pl-7 sm:pr-[105px] pr-[90px] focus:border-btnGreen focus:ring-btnGreen sm:text-sm"
    placeholder="0.00"
    required
  />
);

export default Input;
