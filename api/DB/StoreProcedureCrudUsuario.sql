/*-----------------------------------------------------
    Usuarios
-------------------------------------------------------*/

-- Agregar Usuario
CREATE PROCEDURE AddUser
	@numeroTrabajador VARCHAR(100),
	@nombre VARCHAR(100),
	@password VARCHAR(255),
	@tipoUsuario INT
AS 
BEGIN
	INSERT INTO Usuarios(numeroTrabajador, nombre, password, tipoUsuario)
	VALUES (@numeroTrabajador, @nombre, @password, @tipoUsuario);
END;

--Eliminar usuario por ID
CREATE PROCEDURE DeleteUser
	@idTrabajador INT

AS
BEGIN 
	DELETE FROM Usuarios
	WHERE idTrabajador = @idTrabajador;
END;

-- Actualizar datos del Usuario
CREATE PROCEDURE UserUpdate 
    @IdTrabajador INT,
    @numeroTrabajador VARCHAR(100),
    @nombre VARCHAR(100),
    @password VARCHAR(100),
    @tipoUsuario INT
AS
BEGIN
    UPDATE Usuarios
    SET numeroTrabajador = @numeroTrabajador,
        nombre = @nombre,
        password = @password,
        tipoUsuario = @tipoUsuario
    WHERE idTrabajador = @IdTrabajador;
END;

-- Buscar usuario por ID
CREATE PROCEDURE GetUserById
	@idTrabajador INT
AS
BEGIN

	SELECT idTrabajador, numeroTrabajador, nombre,tipoUsuario
	FROM Usuarios
	WHERE idTrabajador = @idTrabajador
END;

/*-----------------------------------------------------
    Login
-------------------------------------------------------*/

CREATE PROCEDURE iniciarSesion
    @p_numeroTrabajador NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        idTrabajador,
        numeroTrabajador,
        nombre,
        tipoUsuario,
        passwordHash AS password
    FROM Usuarios
    WHERE numeroTrabajador = @p_numeroTrabajador;
END;

/*-----------------------------------------------------
    Obtener datos
-------------------------------------------------------*/

CREATE PROCEDURE obtenerUsuarios
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        idTrabajador,
        numeroTrabajador,
        nombre,
        tipoUsuario,
    FROM Usuarios;
END;

/*-----------------------------------------------------
    Reportes
-------------------------------------------------------*/

CREATE PROCEDURE InsertReporte
    @nombreReporte NVARCHAR(MAX),
    @fechaCreacion DATE,
    @ultimaModificacion DATE,
    @tipoMantenimiento NVARCHAR(MAX),
    @ModeloID INT,
    @responsable INT,
    @horaInicio NVARCHAR(MAX),
    @horaTermino NVARCHAR(MAX),
    @licencia NVARCHAR(MAX),
    @registro NVARCHAR(MAX),
    @restaurador NVARCHAR(MAX),
    @CircuitoID INT,
    @area NVARCHAR(MAX),
    @latitud NVARCHAR(MAX),
    @longitud NVARCHAR(MAX),
    @direccion NVARCHAR(MAX),
    @nsRadioGabinete NVARCHAR(MAX),
    @potenciaSalida NVARCHAR(MAX),
    @rss1 NVARCHAR(MAX),
    @umbralRecepcion NVARCHAR(MAX),
    @frecuenciaID INT,
    @rx NVARCHAR(MAX),
    @tx NVARCHAR(MAX),
    @CablePigtailID INT,
    @SupresorID INT,
    @CableLTID INT,
    @AntenaID INT,
    @alturaAntena NVARCHAR(MAX),
    @RepetidorEnlaceID INT,
    @CanalUCMID INT,
    @fotografiasMantto BIT,
    @medicionRF BIT,
    @medicionFuenteCD BIT,
    @medicionBateria BIT,
    @limpieza BIT,
    @ajusteTornilleria BIT,
    @cambioAntena BIT,
    @impermeabilizacionConectores BIT,
    @redireccionamientoAntena BIT,
    @cambioLT BIT,
    @cambioSupresor BIT,
    @cambioRadio BIT,
    @cambioPigtail BIT,
    @cambioConectores BIT,
    @potenciaRadio NVARCHAR(MAX),
    @potenciaIncidente NVARCHAR(MAX),
    @potenciaReflejada NVARCHAR(MAX),
    @vswr NVARCHAR(MAX),
    @voltajeAcometida NVARCHAR(MAX),
    @resistenciaTierra NVARCHAR(MAX),
    @voltajeFuente NVARCHAR(MAX),
    @voltajeBateria NVARCHAR(MAX),
    @resitenciaBateria NVARCHAR(MAX),
    @porcentajeBateria NVARCHAR(MAX),
    @anguloAzimut NVARCHAR(MAX),
    @placaNomeclatura BIT,
    @selladoGabinete BIT,
    @protectorAntifauna BIT,
    @cuchillaByPass BIT,
    @cuchillaLaterale BIT,
    @bajanteTierra BIT,
    @terminalPAT BIT,
    @apartarrayos BIT,
    @cableRF BIT,
    @calibreBajante NVARCHAR(MAX),
    @Observaciones NVARCHAR(MAX),
    @configuracionRadio NVARCHAR(MAX),
    @imagenEstructura NVARCHAR(MAX),
    @imagenGabinete NVARCHAR(MAX),
    @imagenRadio NVARCHAR(MAX),
    @imagenSupresor NVARCHAR(MAX),
    @imagenRestaurador NVARCHAR(MAX),
    @imagenTerminalTierra NVARCHAR(MAX),
    @imagenBajanteTierra NVARCHAR(MAX),
    @imagenPlaca NVARCHAR(MAX),
    @imagenAdicional NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    -- Insertar el reporte en la tabla correspondiente
    INSERT INTO Reportes (
        nombreReporte,
        fechaCreacion,
        ultimaModificacion,
        tipoMantenimiento,
        ModeloID,
        responsable,
        horaInicio,
        horaTermino,
        licencia,
        registro,
        restaurador,
        CircuitoID,
        area,
        ubicacionMapa,
        direccion,
        nsRadioGabinete,
        potenciaSalida,
        rss1,
        umbralRecepcion,
        frecuenciaID,
        rx,
        tx,
        CablePigtailID,
        SupresorID,
        CableLTID,
        AntenaID,
        alturaAntena,
        RepetidorEnlaceID,
        CanalUCMID,
        fotografiasMantto,
        medicionRF,
        medicionFuenteCD,
        medicionBateria,
        limpieza,
        ajusteTornilleria,
        cambioAntena,
        impermeabilizacionConectores,
        redireccionamientoAntena,
        cambioLT,
        cambioSupresor,
        cambioRadio,
        cambioPigtail,
        cambioConectores,
        potenciaRadio,
        potenciaIncidente,
        potenciaReflejada,
        vswr,
        voltajeAcometida,
        resistenciaTierra,
        voltajeFuente,
        voltajeBateria,
        resitenciaBateria,
        porcentajeBateria,
        anguloAzimut,
        placaNomeclatura,
        selladoGabinete,
        protectorAntifauna,
        cuchillaByPass,
        cuchillaLaterale,
        bajanteTierra,
        terminalPAT,
        apartarrayos,
        cableRF,
        calibreBajante,
        Observaciones,
        configuracionRadio,
        imagenEstructura,
        imagenGabinete,
        imagenRadio,
        imagenSupresor,
        imagenRestaurador,
        imagenTerminalTierra,
        imagenBajanteTierra,
        imagenPlaca,
        imagenAdicional
    ) VALUES (
        @nombreReporte,
        @fechaCreacion,
        @ultimaModificacion,
        @tipoMantenimiento,
        @ModeloID,
        @responsable,
        @horaInicio,
        @horaTermino,
        @licencia,
        @registro,
        @restaurador,
        @CircuitoID,
        @area,
        @latitud,
        @longitud,
        @direccion,
        @nsRadioGabinete,
        @potenciaSalida,
        @rss1,
        @umbralRecepcion,
        @frecuenciaID,
        @rx,
        @tx,
        @CablePigtailID,
        @SupresorID,
        @CableLTID,
        @AntenaID,
        @alturaAntena,
        @RepetidorEnlaceID,
        @CanalUCMID,
        @fotografiasMantto,
        @medicionRF,
        @medicionFuenteCD,
        @medicionBateria,
        @limpieza,
        @ajusteTornilleria,
        @cambioAntena,
        @impermeabilizacionConectores,
        @redireccionamientoAntena,
        @cambioLT,
        @cambioSupresor,
        @cambioRadio,
        @cambioPigtail,
        @cambioConectores,
        @potenciaRadio,
        @potenciaIncidente,
        @potenciaReflejada,
        @vswr,
        @voltajeAcometida,
        @resistenciaTierra,
        @voltajeFuente,
        @voltajeBateria,
        @resitenciaBateria,
        @porcentajeBateria,
        @anguloAzimut,
        @placaNomeclatura,
        @selladoGabinete,
        @protectorAntifauna,
        @cuchillaByPass,
        @cuchillaLaterale,
        @bajanteTierra,
        @terminalPAT,
        @apartarrayos,
        @cableRF,
        @calibreBajante,
        @Observaciones,
        @configuracionRadio,
        @imagenEstructura,
        @imagenGabinete,
        @imagenRadio,
        @imagenSupresor,
        @imagenRestaurador,
        @imagenTerminalTierra,
        @imagenBajanteTierra,
        @imagenPlaca,
        @imagenAdicional
    );

    -- Devuelve el ID del reporte insertado
    SELECT SCOPE_IDENTITY() AS ReporteID;
END;


