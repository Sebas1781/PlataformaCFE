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
CREATE TABLE Frecuencias(
	idFrecuencia INT PRIMARY KEY IDENTITY(1,1),
	Nombre NVARCHAR(100) NOT NULL
);

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

-- Tabla de Reportes
CREATE TABLE Reportes(
    id_reporte INT PRIMARY KEY IDENTITY(1,1), -- Agregado el autoincremento
	nombreReporte NVARCHAR (150) NOT NULL,
	fechaCreacion DATE,
	ultimaModificacion DATE,
    tipoMantenimiento NVARCHAR (50) NOT NULL,
	ModeloID INT NOT NULL FOREIGN KEY REFERENCES Modelos(idModelo),
	responsable INT NOT NULL FOREIGN KEY REFERENCES Usuarios(idTrabajador),
	horaInicio NVARCHAR (20) NOT NULL,
	horaTermino NVARCHAR (20) NOT NULL,
	licencia NVARCHAR (20) NOT NULL,
	registro NVARCHAR (20) NOT NULL,
	restaurador NVARCHAR (20) NOT NULL,
	CircuitoID INT NOT NULL FOREIGN KEY REFERENCES Circuitos(idCircuito),
	area NVARCHAR (100) NOT NULL,
	latitud NVARCHAR (100) NOT NULL,
	longitud NVARCHAR (100) NOT NULL,
	direccion NVARCHAR (150) NOT NULL,
	nsRadioGabinete NVARCHAR (100) NOT NULL,
	potenciaSalida NVARCHAR (100) NOT NULL,
	rss1 NVARCHAR (10) NOT NULL,
	umbralRecepcion NVARCHAR (10) NOT NULL,
	frecuenciaID INT NOT NULL FOREIGN KEY REFERENCES Frecuencias(idFrecuencia),
	rx NVARCHAR (50) NOT NULL,
	tx NVARCHAR (50) NOT NULL,
	CablePigtailID INT NOT NULL FOREIGN KEY REFERENCES CablesPigtail(idCableP),
	SupresorID INT NOT NULL FOREIGN KEY REFERENCES Supresores(idSupresor),
	CableLTID INT NOT NULL FOREIGN KEY REFERENCES CablesLT(idCableLT),
	AntenaID INT NOT NULL FOREIGN KEY REFERENCES Antenas(idAntena),
	alturaAntena VARCHAR (50) NOT NULL,
	RepetidorEnlaceID INT NOT NULL FOREIGN KEY REFERENCES RepetidoresEnlace(idRepetidor),
	CanalUCMID INT NOT NULL FOREIGN KEY REFERENCES CanalesUCM(idCanalUCM),
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
	potenciaRadio NVARCHAR (50) NOT NULL,
	potenciaIncidente NVARCHAR (50) NOT NULL,
	potenciaReflejada NVARCHAR (50) NOT NULL,
	vswr VARCHAR (50) NOT NULL,
	voltajeAcometida NVARCHAR (50),
	resistenciaTierra NVARCHAR (50),
	voltajeFuente NVARCHAR (50),
	voltajeBateria NVARCHAR (50),
	resitenciaBateria NVARCHAR (50),
	porcentajeBateria NVARCHAR (50),
	anguloAzimut NVARCHAR (50),
	placaNomeclatura BIT,
    selladoGabinete BIT,
    protectorAntifauna BIT,
    cuchillaByPass BIT,
    cuchillaLaterale BIT,
    bajanteTierra BIT,
    terminalPAT BIT,
    apartarrayos BIT,
    cableRF BIT,
    calibreBajante NVARCHAR (100),
    Observaciones NVARCHAR (MAX),
    configuracionRadio NVARCHAR (MAX),
	imagenEstructura NVARCHAR (MAX),
    imagenGabinete NVARCHAR (MAX),
    imagenRadio  NVARCHAR (MAX),
    imagenSupresor NVARCHAR (MAX),
    imagenRestaurador NVARCHAR (MAX),
    imagenTerminalTierra NVARCHAR (MAX),
    imagenBajanteTierra NVARCHAR (MAX),
    imagenPlaca NVARCHAR (MAX),
    imagenAdicional NVARCHAR (MAX)
);
GO
