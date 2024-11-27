// src/components/globals/GlobalTables.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const GlobalTables = ({ columns, data }) => {
    if (data.length === 0) {
        return <p className="text-center text-gray-500">No hay nada que mostrar</p>;
    }

    return (
        <div className="max-w-[900px] mx-auto">
            <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                    <div className="flex items-center justify-between">
                        <div></div>
                        {/* Botón verde de Imprimir Reporte */}
                        <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                            <button className="flex items-center gap-2 rounded bg-emerald-600 py-2.5 px-4 text-xs font-semibold text-white shadow-md hover:shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M19.5 6.75h-15a3 3 0 00-3 3v9.75a3 3 0 003 3h15a3 3 0 003-3V9.75a3 3 0 00-3-3zm1.5 12.75a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5V9.75a1.5 1.5 0 011.5-1.5h15a1.5 1.5 0 011.5 1.5zm-4.5-9H18v-1.5h1.5z"></path>
                                </svg>
                                Imprimir Reporte
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
                                        </p>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-100">
                                    {columns.map((column, colIndex) => {
                                        if (column.field === "actions") {
                                            // Renderizar los botones de acciones (Editar y Eliminar)
                                            return (
                                                <td key={colIndex} className="p-4 border-b border-slate-200">
                                                    <div className="flex gap-2">
                                                        {/* Botón de Editar */}
                                                        <button
                                                            className="text-yellow-500 hover:text-yellow-600"
                                                            title="Editar"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        {/* Botón de Eliminar */}
                                                        <button
                                                            className="text-red-500 hover:text-red-600"
                                                            title="Eliminar"
                                                        >
                                                            <FaTrashAlt />
                                                        </button>
                                                    </div>
                                                </td>
                                            );
                                        }

                                        if (column.field === "fullName") {
                                            // Renderizar el nombre completo y el cuadro desplegable
                                            return (
                                                <td key={colIndex} className="p-4 border-b border-slate-200">
                                                    <div>
                                                        <p>{row[column.field]}</p>
                                                        <select className="mt-2 w-full border border-gray-300 rounded-md px-2 py-1 text-sm">
                                                            <option value="reporte1">Reporte 1</option>
                                                            <option value="reporte2">Reporte 2</option>
                                                            <option value="reporte3">Reporte 3</option>
                                                        </select>
                                                    </div>
                                                </td>
                                            );
                                        }

                                        // Renderizar el resto de las columnas
                                        return (
                                            <td key={colIndex} className="p-4 border-b border-slate-200">
                                                {row[column.field] || "-"}
                                            </td>
                                        );
                                    })}
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
