// src/components/globals/GlobalTables.jsx
import React from 'react';
import PropTypes from 'prop-types';

const GlobalTables = ({ columns, data }) => {
    if (data.length === 0) {
        return <p className="text-center text-gray-500">No hay nada que mostrar</p>;
    }

    return (
        <div className="max-w-[900px] mx-auto"> {/* Reduced max-width from 720px to 600px */}
            <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                    <div className="flex items-center justify-between">
                        <div>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0 sm:flex-row">

                            <button className="flex items-center gap-2 rounded bg-emerald-600 py-2.5 px-4 text-xs font-semibold text-white shadow-md hover:shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                                </svg>
                                Add member
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-0 overflow-scroll">
                    <table className="w-full mt-4 text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className="p-4 border-y border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                                    >
                                        <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal text-slate-500">
                                            {column.label}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                            </svg>
                                        </p>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-100">
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex} className="p-4 border-b border-slate-200">
                                            {row[column.field] || '-'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between p-3">
                    <p className="block text-sm text-slate-500">Page 1 of 10</p>
                    <div className="flex gap-1">
                        <button className="rounded border border-slate-300 py-2.5 px-3 text-xs font-semibold text-slate-600 hover:opacity-75">
                            Previous
                        </button>
                        <button className="rounded border border-slate-300 py-2.5 px-3 text-xs font-semibold text-slate-600 hover:opacity-75">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

GlobalTables.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            field: PropTypes.string.isRequired,
        })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GlobalTables;
