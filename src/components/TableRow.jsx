import React from 'react';

const TableRow = ({ freq, gross, tax, net }) => (
  <tr
    className="flex sm:flex-row flex-col sm:justify-between w-full text-lg px-[10px] py-[16px]
     border-[#ddd] border-[1px] rounded-[15px] mb-[10px] text-left font-normal hover:shadow-md">
    <td
      before="Frequency: "
      className="sm:w-[25%] sm:flex sm:items-center overflow-auto sm:mr-[3px] sm:flex-wrap sm:before:content-none before:content-[attr(before)] before:font-bold">
      {freq}
    </td>
    <td
      before="Gross Income: "
      className="sm:w-[25%] sm:flex sm:items-center overflow-auto sm:mr-[3px] sm:flex-wrap sm:before:content-none before:content-[attr(before)] before:font-bold">
      ${gross}
    </td>
    <td
      before="Tax: "
      className="sm:w-[25%] sm:flex sm:items-center overflow-auto sm:mr-[3px] sm:flex-wrap sm:before:content-none before:content-[attr(before)] before:font-bold">
      ${tax}
    </td>
    <td
      before="Net Income: "
      className="sm:w-[25%] sm:flex sm:items-center overflow-auto sm:flex-wrap sm:before:content-none before:content-[attr(before)] before:font-bold">
      ${net}
    </td>
  </tr>
);

export default TableRow;
