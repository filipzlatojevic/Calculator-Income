/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { TableRow } from '../components';
import Button from '../components/Button';
import calcHouse from '../../public/assets/calculator-house.png';
import logo from '../../public/assets/logo.png';

function Calculator() {
  const [resultsPage, setResultsPage] = useState(false);
  const [incomeType, setIncomeType] = useState('');
  const [selectedOption, setSelectedOption] = useState('1');
  const [selectedOptionResults, setSelectedOptionResults] = useState(selectedOption);
  const [inputValue, setInputValue] = useState('');
  const [grossWeek, setGrossWeek] = useState(0);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const tax = 0.15;

  useEffect(() => {
    if (inputValue === '0' || !inputValue || !incomeType) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [inputValue, incomeType]);

  const handleCalculate = e => {
    e.preventDefault();

    if (inputValue === '0' || !inputValue || !incomeType) {
      return;
    }

    if (incomeType && inputValue) {
      if (incomeType === 'net') {
        setGrossWeek(parseFloat(inputValue) / (1 - tax) / parseFloat(selectedOption));
      } else if (incomeType === 'gross') {
        setGrossWeek(parseFloat(inputValue) / parseFloat(selectedOption));
      }

      setResultsPage(true);
    }
  };

  const handleSelectInResults = e => {
    setSelectedOptionResults(e.target.value);
  };

  return (
    <section className="w-full min-h-[100vh] flex flex-col items-center justify-start sm:px-[30px] px-[10px]">
      <img className="w-[200px] h-[70px]" src={logo} alt="logo" />
      <div className="w-full flex items-start justify-center">
        <section className="w-[38px] shrink-0 flex items-center flex-col justify-start gap-[10px]">
          <a
            onClick={() => setResultsPage(false)}
            style={{ writingMode: 'vertical-rl' }}
            className={`${
              !resultsPage ? 'bg-lightGreen border-lightGreen' : 'bg-white border-white'
            } cursor-pointer block hover:border-btnGreen border-r-4 shadow-[5px_0_25px_0_rgba(0,0,0,0.30)] rotate-180  
            text-gray-700 pr-[3px] pl-[7px] rounded-br-[6px] rounded-tr-[6px] py-[20px]`}>
            Income details
          </a>
          <a
            onClick={() => setResultsPage(true)}
            style={{ writingMode: 'vertical-rl' }}
            className={`${
              resultsPage ? 'bg-lightGreen border-lightGreen' : 'bg-white border-white'
            } cursor-pointer hover:border-btnGreen border-r-4 shadow-[5px_0_25px_0_rgba(0,0,0,0.30)] rotate-180 
           text-gray-700 pr-[3px] pl-[7px] rounded-br-[6px] rounded-tr-[6px] py-[20px]`}>
            Income
          </a>
        </section>
        <section className="bg-white px-[20px] gap-[20px] flex flex-col justify-start items-start z-10 max-w-[900px] w-full min-h-[500px] shadow-[0_0_25px_0_rgba(0,0,0,0.30)] rounded-b-md rounded-tr-md">
          <div className="w-full pt-[20px] flex flex-wrap gap-[10px] items-center justify-between">
            <div className="flex items-center justify-start gap-[10px] text-[22px]">
              <img className="w-[40px] h-[40px]" src={calcHouse} alt="calculator" />
              Income tax calculator
            </div>

            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className={`${!resultsPage && 'hidden'} flex justify-center items-center py-[5px] px-[12px] 
              rounded-md font-normal min-[450px]:w-auto w-full text-base cursor-pointer border text-oceanBlue border-oceanBlue hover:bg-oceanBlue hover:fill:text-white hover:text-white`}
              table="table-to-xls"
              filename="Income Table"
              sheet="Income Table"
              buttonText="Download"
            />
          </div>

          {!resultsPage && (
            <form className="w-full max-w-[500px]">
              <label htmlFor="income" className="block text-[18px] font-normal text-gray-700">
                What is your total income?
              </label>

              <div className="relative mt-[10px] rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="income"
                  id="income"
                  min="0"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  className="outline-none block py-[7px] w-full rounded-md border border-gray-300 pl-7 sm:pr-[105px] pr-[90px] focus:border-btnGreen focus:ring-btnGreen sm:text-sm"
                  placeholder="0.00"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <select
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}
                    className="outline-none focus:border-btnGreen focus:border focus:ring-btnGreen h-full 
                    rounded-md bg-transparent py-0 sm:pl-2 sm:pr-1 text-gray-500 text-sm">
                    <option value="1">Weekly</option>
                    <option value="2">Fortnightly</option>
                    <option value="4">Monthly</option>
                    <option value="48">Annually</option>
                  </select>
                </div>
              </div>

              <div className="text-[18px]  mt-[20px] font-normal text-gray-700">Please choose the income type</div>
              <div className="w-full flex min-[450px]:flex-row flex-col gap-[10px] mt-[10px]">
                <Button
                  moreClass={`flex-1 whitespace-nowrap border-gray-300 hover:border-btnGreen ${
                    incomeType === 'gross' && 'bg-btnGreen text-white'
                  }`}
                  onClick={() => setIncomeType('gross')}>
                  Gross income
                </Button>
                <Button
                  moreClass={`flex-1 whitespace-nowrap border-gray-300 hover:border-btnGreen ${
                    incomeType === 'net' && 'bg-btnGreen text-white'
                  } `}
                  onClick={() => setIncomeType('net')}>
                  Net income
                </Button>
              </div>
              <Button
                disabled={disabledBtn}
                type="submit"
                onClick={handleCalculate}
                moreClass={`${disabledBtn ? 'bg-gray-400' : 'bg-btnGreen hover:bg-btnHoverGreen'} mt-[20px] w-full text-white`}>
                Calculate
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ml-2" viewBox="0 0 16 16">
                  {' '}
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />{' '}
                </svg>
              </Button>
            </form>
          )}

          {resultsPage && (
            <>
              <aside className="bg-lightGreen rounded-md w-full min-h-[400px] p-[15px]">
                <div className="">
                  <span className="inline-block shadow-md px-[20px] py-[8px] text-[20px] text-gray-600 rounded-md bg-btnGreen">
                    ${Math.round(grossWeek * (1 - tax) * selectedOptionResults).toLocaleString()}{' '}
                  </span>
                  <span className="ml-[8px]">
                    is your net{' '}
                    <select
                      value={selectedOptionResults}
                      onChange={handleSelectInResults}
                      className="underline outline-none cursor-pointer focus:border-btnGreen focus:border focus:ring-btnGreen h-full 
                    rounded-md bg-transparent py-0 mr-1 text-gray-700">
                      <option value="1">Weekly</option>
                      <option value="2">Fortnightly</option>
                      <option value="4">Monthly</option>
                      <option value="48">Annually</option>
                    </select>
                    income
                  </span>
                </div>

                <div>
                  <table
                    id="table-to-xls"
                    className="bg-white shadow-md rounded-md p-[10px] pb-0 flex flex-col mt-[30px] g:overflow-visible 
        overflow-auto">
                    <thead className="sm:block hidden">
                      <tr className="flex justify-between w-full text-base px-[10px] font-bold sm:mb-[12px] mb-[0] text-left">
                        <th className="w-[25%]">Frequency</th>
                        <th className="w-[25%]">Gross Income</th>
                        <th className="w-[25%]">Tax</th>
                        <th className="w-[25%]">Net Income</th>
                      </tr>
                    </thead>

                    <tbody>
                      <TableRow
                        freq="Weekly"
                        gross={Math.round(grossWeek).toLocaleString()}
                        tax={Math.round(grossWeek * tax).toLocaleString()}
                        net={Math.round(grossWeek * (1 - tax)).toLocaleString()}
                      />
                      <TableRow
                        freq="Fortnightly"
                        gross={Math.round(grossWeek * 2).toLocaleString()}
                        tax={Math.round(grossWeek * 2 * tax).toLocaleString()}
                        net={Math.round(grossWeek * 2 * (1 - tax)).toLocaleString()}
                      />
                      <TableRow
                        freq="Monthly"
                        gross={Math.round(grossWeek * 4).toLocaleString()}
                        tax={Math.round(grossWeek * 4 * tax).toLocaleString()}
                        net={Math.round(grossWeek * 4 * (1 - tax)).toLocaleString()}
                      />
                      <TableRow
                        freq="Annually"
                        gross={Math.round(grossWeek * 48).toLocaleString()}
                        tax={Math.round(grossWeek * 48 * tax).toLocaleString()}
                        net={Math.round(grossWeek * 48 * (1 - tax)).toLocaleString()}
                      />
                    </tbody>
                  </table>
                </div>
              </aside>
              <aside
                className="px-[20px] py-[10px] min-[570px]:flex-row flex-col flex gap-[20px] flex-wrap justify-between items-center bg-lightOrange min-h-[110px] 
              rounded-md w-full mb-[20px] border-r-4 border-orange">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="text-orange"
                  viewBox="0 0 16 16">
                  {' '}
                  <path d="M8 .95 14.61 4h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.379l.5 2A.5.5 0 0 1 15.5 17H.5a.5.5 0 0 1-.485-.621l.5-2A.5.5 0 0 1 1 14V7H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 4h.89L8 .95zM3.776 4h8.447L8 2.05 3.776 4zM2 7v7h1V7H2zm2 0v7h2.5V7H4zm3.5 0v7h1V7h-1zm2 0v7H12V7H9.5zM13 7v7h1V7h-1zm2-1V5H1v1h14zm-.39 9H1.39l-.25 1h13.72l-.25-1z" />{' '}
                </svg>
                <div className="text-center">Compare lenders and get your finance</div>
                <Button moreClass="md:w-auto w-full border-orange text-gray-700 hover:bg-orange hover:text-white">Apply now</Button>
              </aside>
            </>
          )}
        </section>
      </div>
    </section>
  );
}

export default Calculator;
