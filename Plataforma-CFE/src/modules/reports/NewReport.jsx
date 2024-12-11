import { GeneraFormularioReporte } from "../../components/global/GlobalForms";
import { reportFields } from "../../data/formConfig"; // Asegúrate de que este import sea correcto

const NewReport = () => {
    const initValues = {
        tipoMantenimiento: '',
        modelo: '',
        fecha: '',
        horaInicio: '',
        responsable: '',
        licencia: '',
        registro: '',
        restaurador: '',
        circuito: '',
        area: '',
        ubicacionMapa: { lat: 0, lng: 0 },
        direccion: '',
        nsRadioGabinete: '',
        potenciaSalida: '',
        rssi: -120,
        umbralRecepcion: -50,
        frecuencia: '',
        rx: '',
        tx: '',
        cablePigtail: '',
        supresor: '',
        cableLT: '',
        alturaAntena: '',
        repetidorEnlace: '',
        canalUCM: '',
        fotografiasMantto: 0,
        medicionRF: 0,
        medicionFuenteCD: 0,
        medicionBateria: 0,
        limpieza: 0,
        ajusteTornilleria: 0,
        cambioAntena: 0,
        impermeabilizacionConectores: 0,
        redireccionamientoAntena: 0,
        cambioLT: 0,
        cambioSupresor: 0,
        cambioRadio: 0,
        cambioPigtail: 1,
        cambioConectores: 0,
        potenciaRadio: '',
        potenciaIncidente: '',
        potenciaReflejada: '',
        vswr: '',
        voltajeAcometida: '',
        resistenciaTierra: '',
        voltajeFuente: '',
        resistenciaBateria: '',
        porcentajeBateria: '',
        anguloAzimut: '',
        placaNomenclatura: 0,
        selladoGabinete: 0,
        protectorAntifauna: 0,
        cuchillasByPass: 0,
        cuchillasLaterale: 0,
        bajanteTierra: 0,
        terminalPAT: 0,
        apartarrayos: 0,
        cableRF: 0,
        calibreBajante: '',
        Observaciones: '',
        configuracionRadio: '',
        imagenEstructura: null,
        imagenGabinete: null,
        imagenRadio: null,
        imagenSupresor: null,
        imagenRestaurador: null,
        imagenTerminalTierra: null,
        imagenBajanteTierra: null,
        imagenPlaca: null,
        imagenAdicional: null,
        horaTermino: '',
    };

    const formProps = {
        data: reportFields,
        initValues,
        title: "Nuevo Reporte",
        description: "Ingrese los datos necesarios para crear un nuevo reporte",
        titleBtn: "Crear Reporte",
        msgSuccess: "Reporte creado exitosamente",
        msgError: "Error al crear el reporte",
        sendData: "InsertReporte",
    };

    return <GeneraFormularioReporte {...formProps} />;
};

export default NewReport;
