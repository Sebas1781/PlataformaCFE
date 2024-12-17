import { GenerarTabla } from "../../components/global/DataTables";
import { reportHeader } from "../../data/tableHeaders";

const ReportTables = () => {
  const formProps = {
    header: reportHeader, // Encabezados correctos
    title: "Listado de Reportes",
    description: "Esta tabla muestra todos los reportes disponibles.",
    titleBtn: "Agregar Reporte",
    sendData: "agregarReporte",
    data: [
      { id: 1, name: "Reporte de Ventas", createdBy: "Admin", creationDate: "2024-11-01", lastModified: "2024-11-10", actions: "Editar" },
      { id: 2, name: "Reporte de Compras", createdBy: "Editor", creationDate: "2024-11-05", lastModified: "2024-11-15", actions: "Editar" },
      { id: 3, name: "Reporte de Inventario", createdBy: "Admin", creationDate: "2024-10-20", lastModified: "2024-10-25", actions: "Editar" },
      { id: 4, name: "Reporte de Recursos Humanos", createdBy: "RRHH", creationDate: "2024-09-15", lastModified: "2024-09-18", actions: "Editar" },
      { id: 5, name: "Reporte Financiero", createdBy: "Finanzas", creationDate: "2024-08-10", lastModified: "2024-08-12", actions: "Editar" },
      { id: 6, name: "Reporte de Auditoría", createdBy: "Auditor", creationDate: "2024-07-01", lastModified: "2024-07-05", actions: "Editar" },
      { id: 7, name: "Reporte de Marketing", createdBy: "Marketing", creationDate: "2024-06-20", lastModified: "2024-06-22", actions: "Editar" },
      { id: 8, name: "Reporte de Producción", createdBy: "Producción", creationDate: "2024-05-15", lastModified: "2024-05-18", actions: "Editar" },
      { id: 9, name: "Reporte de Calidad", createdBy: "Calidad", creationDate: "2024-04-10", lastModified: "2024-04-12", actions: "Editar" },
      { id: 10, name: "Reporte de Logística", createdBy: "Logística", creationDate: "2024-03-05", lastModified: "2024-03-07", actions: "Editar" },
      { id: 11, name: "Reporte de Clientes", createdBy: "Atención al Cliente", creationDate: "2024-02-28", lastModified: "2024-03-01", actions: "Editar" },
      { id: 12, name: "Reporte de Proveedores", createdBy: "Compras", creationDate: "2024-02-15", lastModified: "2024-02-17", actions: "Editar" },
      { id: 13, name: "Reporte de Desempeño", createdBy: "RRHH", creationDate: "2024-01-25", lastModified: "2024-01-27", actions: "Editar" },
      { id: 14, name: "Reporte de Seguridad", createdBy: "Seguridad", creationDate: "2024-01-10", lastModified: "2024-01-12", actions: "Editar" },
      { id: 15, name: "Reporte General", createdBy: "Admin", creationDate: "2024-12-01", lastModified: "2024-12-05", actions: "Editar" },
    ],
  };

  return <GenerarTabla {...formProps} />;
};

export default ReportTables;
