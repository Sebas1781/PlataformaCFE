import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintReports = ({ data = [] }) => {
  const printRef = useRef(); // Referencia al contenido que se imprimirá

  const handlePrint = useReactToPrint({
    content: () => printRef.current, // Define qué imprimir
    documentTitle: "Reporte de Datos", // Título del PDF
  });

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold text-emerald-600 mb-4">Impresión de Reportes</h1>
      <div ref={printRef} className="bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Elaborado por</th>
              <th className="px-4 py-2">Fecha de creación</th>
              <th className="px-4 py-2">Última modificación</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.createdBy}</td>
                  <td className="px-4 py-2">{row.creationDate}</td>
                  <td className="px-4 py-2">{row.lastModified}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        onClick={handlePrint}
        className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition duration-300"
      >
        Imprimir PDF
      </button>
    </div>
  );
};

export default PrintReports;
