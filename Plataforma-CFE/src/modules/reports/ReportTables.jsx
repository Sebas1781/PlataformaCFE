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
      ],
    };
    
    return <GenerarTabla {...formProps} />;
}
export default ReportTables;
