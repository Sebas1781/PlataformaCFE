// src/components/global/DataTables.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash, FaSearch, FaPrint } from "react-icons/fa";

/* =====================================
   1. Componente: UsersTable
   ===================================== */
export const UsersTable = ({
  header = [],
  title = "",
  description = "",
  titleBtn = "",
  data = [],
}) => {
  const navigate = useNavigate();
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(data);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const handleEdit = (id) => {
    if (!id) {
      console.error("ID de usuario no definido");
      return;
    }
    console.log(`Editando usuario con ID: ${id}`);
    navigate(`/editar/usuario/${id}`);
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("ID de usuario no definido");
      return;
    }

    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar el usuario con ID: ${id}?`
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.post("http://localhost:1433/api/eliminarUsuario", {
        idTrabajador: id,
      });

      if (response.status === 200) {
        console.log(`Usuario con ID ${id} eliminado correctamente`);
        setTableData((prevData) => prevData.filter((user) => user.idTrabajador !== id));
      } else {
        console.error("Error al eliminar el usuario:", response.data.error);
      }
    } catch (error) {
      console.error("Error al ejecutar la solicitud de eliminación:", error);
    }
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-semibold text-emerald-600">{title}</h1>
      <p className="text-gray-700 mb-4">{description}</p>

      {/* Botón para agregar nuevo usuario */}
      <div className="mt-4">
        <button
          onClick={() => navigate("/nuevo/usuario")}
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition duration-300 mb-4"
        >
          {titleBtn}
        </button>
      </div>

      {/* Tabla en escritorio */}
      <div className="hidden lg:block overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="min-w-full">
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
            {currentItems.length > 0 ? (
              currentItems.map((row, rowIndex) => (
                <tr
                  key={`row-${row.idTrabajador || rowIndex}`}
                  className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  {header.map((col) => {
                    if (col.id === "actions") {
                      return (
                        <td
                          key={`cell-${row.idTrabajador || rowIndex}-${col.id}`}
                          className="px-6 py-4 text-sm text-gray-700"
                        >
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(row.idTrabajador)}
                              className="px-2 py-1 text-blue-500 hover:text-blue-700 transition"
                              title="Editar"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(row.idTrabajador)}
                              className="px-2 py-1 text-red-500 hover:text-red-700 transition"
                              title="Eliminar"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      );
                    } else if (col.id === "name") {
                      // Aquí mostramos Restaurador (arriba) y Tipo de Mantenimiento (abajo)
                      return (
                        <td
                          key={`cell-${row.idTrabajador || rowIndex}-${col.id}`}
                          className="px-6 py-4 text-sm text-gray-700"
                        >
                          <div>{row.restaurador}</div>
                          <div className="text-gray-500">{row.tipoMantenimiento}</div>
                        </td>
                      );
                    } else {
                      return (
                        <td
                          key={`cell-${row.idTrabajador || rowIndex}-${col.id}`}
                          className="px-6 py-4 text-sm text-gray-700"
                        >
                          {row[col.id]}
                        </td>
                      );
                    }
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={header.length || 1} className="px-6 py-4 text-center text-gray-500">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Vista en modo móvil (tarjetas) */}
      <div className="block lg:hidden">
        {currentItems.length > 0 ? (
          currentItems.map((row, rowIndex) => (
            <div
              key={`card-${row.idTrabajador || rowIndex}`}
              className="p-4 border-b border-gray-200 bg-white rounded-lg shadow-md mb-4"
            >
              {header.map((col) => {
                if (col.id === "actions") {
                  return (
                    <div
                      key={`card-cell-${row.idTrabajador || rowIndex}-${col.id}`}
                      className="flex justify-between mb-2"
                    >
                      <span className="font-semibold text-emerald-600">{col.label}:</span>
                      <span className="text-gray-700">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(row.idTrabajador)}
                            className="px-2 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
                            title="Editar"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(row.idTrabajador)}
                            className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                            title="Eliminar"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </span>
                    </div>
                  );
                } else if (col.id === "name") {
                  // En móvil también: Restaurador en la línea de arriba, Tipo de Mantenimiento en la de abajo
                  return (
                    <div
                      key={`card-cell-${row.idTrabajador || rowIndex}-${col.id}`}
                      className="flex flex-col mb-2"
                    >
                      <span className="font-semibold text-emerald-600">{col.label}:</span>
                      <span className="text-gray-700">{row.restaurador}</span>
                      <span className="text-gray-500">{row.tipoMantenimiento}</span>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={`card-cell-${row.idTrabajador || rowIndex}-${col.id}`}
                      className="flex justify-between mb-2"
                    >
                      <span className="font-semibold text-emerald-600">{col.label}:</span>
                      <span className="text-gray-700">{row[col.id]}</span>
                    </div>
                  );
                }
              })}
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No hay datos disponibles</div>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={`page-${index + 1}`}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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

/* =====================================
   2. Componente: GenerarTabla
   ===================================== */
export const GenerarTabla = ({
  header = [],
  title = "",
  description = "",
  data = [],
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtra la data según el término de búsqueda
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handlers
  const handleEdit = (id) => console.log(`Editando reporte con ID: ${id}`);
  const handleDelete = (id) => console.log(`Eliminando reporte con ID: ${id}`);
  const handlePrint = (id) => navigate(`/imprimir/${id}`);
  const handleAdd = () => {
    console.log("Agregando nuevo reporte...");
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold text-emerald-600">{title}</h1>
      <p className="text-gray-700 mb-4">{description}</p>

      {/* Buscador, Botón "Agregar" y Filtro */}
      <div className="mb-4">
        {/* Sección MOBILE */}
        <div className="block md:hidden flex flex-col gap-2">
          {/* Buscador */}
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

          {/* Botón Agregar */}
          <button onClick={handleAdd} className="bg-emerald-600 text-white px-4 py-2 rounded">
            Agregar
          </button>

          {/* Filtro */}
          <div>
            <select
              id="filter"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-emerald-600 w-full"
            >
              <option value="" disabled>
                Filtrar por:
              </option>
              <option value="ventas">Ventas</option>
              <option value="compras">Compras</option>
              <option value="inventarios">Inventarios</option>
              <option value="recursos-humanos">Recursos Humanos</option>
            </select>
          </div>
        </div>

        {/* Sección DESKTOP */}
        <div className="hidden md:flex md:items-center md:justify-between">
          {/* Buscador a la izquierda */}
          <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm px-2 w-1/3">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="w-full px-2 py-2 text-base font-semibold focus:outline-none"
            />
          </div>

          {/* Filtro y botón Agregar a la derecha */}
          <div className="flex items-center gap-2">
            <select
              id="filter"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-emerald-600"
            >
              <option value="" disabled>
                Filtrar por:
              </option>
              <option value="ventas">Ventas</option>
              <option value="compras">Compras</option>
              <option value="inventarios">Inventarios</option>
              <option value="recursos-humanos">Recursos Humanos</option>
            </select>

            <button onClick={handleAdd} className="bg-emerald-600 text-white px-4 py-2 rounded">
              Agregar
            </button>
          </div>
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
                <tr
                  key={row.id}
                  className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  {header.map((col) => {
                    if (col.id === "actions") {
                      return (
                        <td key={col.id} className="px-6 py-4 text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(row.id)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(row.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash />
                            </button>
                            <button
                              onClick={() => handlePrint(row.id)}
                              className="text-green-500 hover:text-green-700"
                            >
                              <FaPrint />
                            </button>
                          </div>
                        </td>
                      );
                    }

                    if (col.id === "name") {
                      // Mostrar restaurador y tipo de mantenimiento en dos líneas
                      return (
                        <td key={col.id} className="px-6 py-4 text-sm">
                          <div className="font-semibold">{row.restaurador}</div>
                          <div className="text-gray-600">{row.tipoMantenimiento}</div>
                        </td>
                      );
                    }

                    // Columnas normales
                    return (
                      <td key={col.id} className="px-6 py-4 text-sm">
                        {row[col.id]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vista de fichas en móvil */}
      <div className="block md:hidden">
        {currentItems.map((row) => (
          <div
            key={row.id}
            className="bg-white rounded-lg shadow-md mb-4 p-4 border border-gray-200"
          >
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {header.map((col) => {
                if (col.id === "actions") {
                  // Fila Acciones
                  return (
                    <React.Fragment key={col.id}>
                      <div>
                        <span className="font-semibold text-emerald-600">
                          {col.label}:
                        </span>
                        <p className="text-gray-700">Editar</p>
                      </div>
                      <div className="flex justify-center items-center space-x-4">
                        <button
                          onClick={() => handleEdit(row.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                        <button
                          onClick={() => handlePrint(row.id)}
                          className="text-green-500 hover:text-green-700"
                        >
                          <FaPrint />
                        </button>
                      </div>
                    </React.Fragment>
                  );
                }

                if (col.id === "name") {
                  // En móvil también dos líneas en la misma columna
                  return (
                    <div key={col.id}>
                      <span className="font-semibold text-emerald-600">
                        {col.label}:
                      </span>
                      <p className="font-semibold">{row.restaurador}</p>
                      <p className="text-gray-600">{row.tipoMantenimiento}</p>
                    </div>
                  );
                }

                return (
                  <div key={col.id}>
                    <span className="font-semibold text-emerald-600">
                      {col.label}:
                    </span>
                    <p className="text-gray-700">{row[col.id]}</p>
                  </div>
                );
              })}
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
                currentPage === index + 1
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
