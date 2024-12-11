-- Uso de la base de datos
USE PlataformaCFE;
GO

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    idTrabajador INT PRIMARY KEY IDENTITY(1,1), 
    numeroTrabajador NVARCHAR(100) NOT NULL,
    nombre NVARCHAR(100) NOT NULL,
    password NVARCHAR(100) NOT NULL,
    tipoUsuario INT NOT NULL
);
GO

-- Tabla de Modelos
CREATE TABLE Modelos (
    idModelo INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL
);
GO

-- Tabla de Circuitos
CREATE TABLE Circuitos (
    idCircuito INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL
);
GO

-- Tabla de Frecuencias
CREATE TABLE Frecuencias (
    idFrecuencia INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL
);
GO

-- Tabla de Cables Pigtail
CREATE TABLE CablesPigtail (
    idCableP INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL
);
GO

-- Tabla de Supresores
CREATE TABLE Supresores (
    idSupresor INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL
);
GO

-- Tabla de Cables LT
CREATE TABLE CablesLT (
    idCableLT INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL
);
GO

-- Tabla de Antenas
CREATE TABLE Antenas (
    idAntena INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL
);
GO

-- Tabla de Repetidores de Enlace
CREATE TABLE RepetidoresEnlace (
    idRepetidor INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL
);
GO

-- Tabla de Canales UCM
CREATE TABLE CanalesUCM (
    idCanalUCM INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL
);
GO

-- Tabla de Información Básica de Reportes
CREATE TABLE ReportesInformacionBasica (
    id_reporte INT PRIMARY KEY IDENTITY(1,1),
    nombreReporte NVARCHAR(150) NOT NULL,
    fechaCreacion DATE,
    ultimaModificacion DATE,
    tipoMantenimiento NVARCHAR(50) NOT NULL,
    Modelo NVARCHAR(100), -- Quitada la clave foránea
    responsable NVARCHAR(100), -- Quitada la clave foránea
    horaInicio NVARCHAR(20) NOT NULL,
    horaTermino NVARCHAR(20) NOT NULL,
    licencia NVARCHAR(20) NOT NULL,
    registro NVARCHAR(20) NOT NULL,
    restaurador NVARCHAR(20) NOT NULL,
    Circuito NVARCHAR(100), -- Quitada la clave foránea
    area NVARCHAR(100) NOT NULL,
    ubicacionMapa NVARCHAR(150) NOT NULL,
    direccion NVARCHAR(150) NOT NULL
);
GO

-- Tabla de Información del Sistema de Comunicaciones
CREATE TABLE ReportesSistemaComunicaciones (
    id_reporte INT NOT NULL,
    nsRadioGabinete NVARCHAR(100) NOT NULL,
    potenciaSalida NVARCHAR(100) NOT NULL,
    rss1 NVARCHAR(10) NOT NULL,
    umbralRecepcion NVARCHAR(10) NOT NULL,
    frecuencia NVARCHAR(100), -- Quitada la clave foránea
    rx NVARCHAR(50) NOT NULL,
    tx NVARCHAR(50) NOT NULL,
    CablePigtail NVARCHAR(100), -- Quitada la clave foránea
    Supresor NVARCHAR(100), -- Quitada la clave foránea
    CableLT NVARCHAR(100), -- Quitada la clave foránea
    Antena NVARCHAR(100), -- Quitada la clave foránea
    PRIMARY KEY (id_reporte)
);
GO

-- Tabla de Mantenimiento
CREATE TABLE ReportesMantenimiento (
    id_reporte INT NOT NULL,
    alturaAntena NVARCHAR(50) NOT NULL,
    RepetidorEnlace NVARCHAR(100), -- Quitada la clave foránea
    CanalUCM NVARCHAR(100), -- Quitada la clave foránea
    fotografiasMantto BIT,
    medicionRF BIT,
    medicionFuenteCD BIT,
    medicionBateria BIT,
    limpieza BIT,
    ajusteTornilleria BIT,
    cambioAntena BIT,
    impermeabilizacionConectores BIT,
    redireccionamientoAntena BIT,
    cambioLT BIT,
    cambioSupresor BIT,
    cambioRadio BIT,
    cambioPigtail BIT,
    cambioConectores BIT,
    PRIMARY KEY (id_reporte)
);
GO

-- Tabla de Mediciones
CREATE TABLE ReportesMediciones (
    id_reporte INT NOT NULL,
    potenciaRadio NVARCHAR(50) NOT NULL,
    potenciaIncidente NVARCHAR(50) NOT NULL,
    potenciaReflejada NVARCHAR(50) NOT NULL,
    vswr NVARCHAR(50) NOT NULL,
    voltajeAcometida NVARCHAR(50),
    resistenciaTierra NVARCHAR(50),
    voltajeFuente NVARCHAR(50),
    voltajeBateria NVARCHAR(50),
    resitenciaBateria NVARCHAR(50),
    porcentajeBateria NVARCHAR(50),
    anguloAzimut NVARCHAR(50),
    PRIMARY KEY (id_reporte)
);
GO

-- Tabla de Instalación de Equipo
CREATE TABLE ReportesInstalacion (
    id_reporte INT NOT NULL,
    placaNomeclatura BIT,
    selladoGabinete BIT,
    protectorAntifauna BIT,
    cuchillaByPass BIT,
    cuchillaLaterale BIT,
    bajanteTierra BIT,
    terminalPAT BIT,
    apartarrayos BIT,
    cableRF BIT,
    calibreBajante NVARCHAR(100),
    Observaciones NVARCHAR(MAX),
    configuracionRadio NVARCHAR(MAX),
    PRIMARY KEY (id_reporte)
);
GO

-- Tabla de Imágenes
CREATE TABLE ReportesImagenes (
    id_reporte INT NOT NULL,
    imagenEstructura NVARCHAR(MAX),
    imagenGabinete NVARCHAR(MAX),
    imagenRadio NVARCHAR(MAX),
    imagenSupresor NVARCHAR(MAX),
    imagenRestaurador NVARCHAR(MAX),
    imagenTerminalTierra NVARCHAR(MAX),
    imagenBajanteTierra NVARCHAR(MAX),
    imagenPlaca NVARCHAR(MAX),
    imagenAdicional NVARCHAR(MAX),
    PRIMARY KEY (id_reporte)
);
GO
