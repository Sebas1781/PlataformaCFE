import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPrint, FaSearch } from "react-icons/fa";

export const GenerarTabla = ({ header = [], title = "", description = "", data = [] }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleEdit = (id) => console.log(`Editando reporte con ID: ${id}`);
  const handleDelete = (id) => console.log(`Eliminando reporte con ID: ${id}`);
  const handlePrint = (id) => navigate(`/imprimir/${id}`);

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold text-emerald-600">{title}</h1>
      <p className="text-gray-700 mb-4">{description}</p>

      {/* Buscador y Filtro */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm px-2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar..."
            className="w-full px-2 py-2 text-base font-semibold focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <select
            id="filter"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-emerald-600"
          >
            <option value="" disabled>Filtrar por:</option>
            <option value="ventas">Ventas</option>
            <option value="compras">Compras</option>
            <option value="inventarios">Inventarios</option>
            <option value="recursos-humanos">Recursos Humanos</option>
          </select>
        </div>
      </div>

      {/* Tabla en escritorio */}
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <table className="min-w-full">
            <thead className="bg-emerald-600 text-white">
              <tr>
                {header.map((col) => (
                  <th key={col.id} className="px-6 py-3 text-left text-sm font-medium">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, rowIndex) => (
                <tr key={row.id} className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  {header.map((col) => (
                    <td key={col.id} className="px-6 py-4 text-sm">
                      {col.id === "actions" ? (
                        <div className="flex space-x-2">
                          <button onClick={() => handleEdit(row.id)} className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                          <button onClick={() => handleDelete(row.id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                          <button onClick={() => handlePrint(row.id)} className="text-green-500 hover:text-green-700"><FaPrint /></button>
                        </div>
                      ) : row[col.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vista de fichas en móvil */}
      <div className="block md:hidden">
        {currentItems.map((row) => (
          <div key={row.id} className="bg-white rounded-lg shadow-md mb-4 p-4 border border-gray-200">
            {header.map((col) => (
              <div key={col.id} className="mb-2">
                <span className="font-semibold text-emerald-600">{col.label}:</span>
                <p className="text-gray-700">{row[col.id]}</p>
              </div>
            ))}
            {/* Botones de acción */}
            <div className="flex space-x-4 mt-2">
              <button onClick={() => handleEdit(row.id)} className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
              <button onClick={() => handleDelete(row.id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
              <button onClick={() => handlePrint(row.id)} className="text-green-500 hover:text-green-700"><FaPrint /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1 ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
