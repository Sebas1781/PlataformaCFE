// src/components/globals/GlobalForms.jsx
import React from 'react';
import PropTypes from 'prop-types';

const GlobalTables = ({ columns, data }) => {
    if (data.length === 0) {
        return <p className="text-center text-gray-500">No hay nada que mostrar</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 bg-white rounded-lg">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        {columns.map((column, index) => (
                            <th key={index} className="px-4 py-2 text-left border-b border-gray-300">
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-100">
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="px-4 py-2 border-b border-gray-300">
                                    {row[column.field] || '-'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
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
