import React from "react";
import { useNavigate } from "react-router-dom";

export const GenerarTabla = ({ header = [], title = "", description = "", titleBtn = "", sendData = "", data = [] }) => {
  const navigate = useNavigate(); // Hook para redirigir

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-semibold text-emerald-600">{title}</h1>
      <p className="text-gray-700 mb-4">{description}</p>
      <button
        onClick={() => navigate("/nuevo/reporte")} // Redirige a /new-report
        className="mb-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition duration-300"
      >
        {titleBtn}
      </button>
      {/* Contenedor Responsivo */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="min-w-full hidden lg:table">
          <thead className="bg-emerald-600 text-white">
            <tr>
              {header.map((col) => (
                <th
                  key={col.id}
                  className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  {header.map((col) => (
                    <td key={col.id} className="px-6 py-4 text-sm text-gray-700">
                      {row[col.id]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={header.length || 1}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Diseño en móvil */}
        <div className="block lg:hidden">
          {data.length > 0 ? (
            data.map((row) => (
              <div
                key={row.id}
                className="p-4 border-b border-gray-200 bg-white flex flex-col space-y-2"
              >
                {header.map((col) => (
                  <div key={col.id} className="flex justify-between">
                    <span className="font-medium text-gray-600">{col.label}:</span>
                    <span className="text-gray-700">{row[col.id]}</span>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No hay datos disponibles</div>
          )}
        </div>
      </div>
    </div>
  );
};
