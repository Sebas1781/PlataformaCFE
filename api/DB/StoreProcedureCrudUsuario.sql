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
GO
--Eliminar usuario por ID
CREATE PROCEDURE DeleteUser
	@idTrabajador INT

AS
BEGIN 
	DELETE FROM Usuarios
	WHERE idTrabajador = @idTrabajador;
END;
GO

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
GO

-- Buscar usuario por ID
CREATE PROCEDURE GetUserById
	@idTrabajador INT
AS
BEGIN

	SELECT idTrabajador, numeroTrabajador, nombre,tipoUsuario
	FROM Usuarios
	WHERE idTrabajador = @idTrabajador
END;
GO
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
GO
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
        tipoUsuario
    FROM Usuarios;
END;
GO
/*-----------------------------------------------------
    Reportes crear reporte
-------------------------------------------------------*/
CREATE PROCEDURE sp_insertar_reporte
    @tipoMantenimiento NVARCHAR(50),
    @modelo NVARCHAR(100),
    @fecha DATE,
    @horaInicio NVARCHAR(20),
    @horaTermino NVARCHAR(20),
    @responsable NVARCHAR(100),
    @licencia NVARCHAR(20),
    @registro NVARCHAR(20),
    @restaurador NVARCHAR(20),
    @circuito NVARCHAR(100),
    @area NVARCHAR(100),
    @ubicacionMapa NVARCHAR(150),
    @direccion NVARCHAR(150),
    @nsRadioGabinete NVARCHAR(100),
    @potenciaSalida NVARCHAR(100),
    @rssi NVARCHAR(10),
    @umbralRecepcion NVARCHAR(10),
    @frecuencia NVARCHAR(100),
    @rx NVARCHAR(50),
    @tx NVARCHAR(50),
    @CablePigtail NVARCHAR(100),
    @Supresor NVARCHAR(100),
    @CableLT NVARCHAR(100),
    @Antena NVARCHAR(100),
    @alturaAntena NVARCHAR(50),
    @RepetidorEnlace NVARCHAR(100),
    @CanalUCM NVARCHAR(100),
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
    @potenciaRadio NVARCHAR(50),
    @potenciaIncidente NVARCHAR(50),
    @potenciaReflejada NVARCHAR(50),
    @vswr NVARCHAR(50),
    @voltajeAcometida NVARCHAR(50),
    @resistenciaTierra NVARCHAR(50),
    @voltajeFuente NVARCHAR(50),
    @voltajeBateria NVARCHAR(50),
    @resitenciaBateria NVARCHAR(50),
    @porcentajeBateria NVARCHAR(50),
    @anguloAzimut NVARCHAR(50),
    @placaNomeclatura BIT,
    @selladoGabinete BIT,
    @protectorAntifauna BIT,
    @cuchillaByPass BIT,
    @cuchillaLaterale BIT,
    @bajanteTierra BIT,
    @terminalPAT BIT,
    @apartarrayos BIT,
    @cableRF BIT,
    @calibreBajante NVARCHAR(100),
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
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Insert en la tabla principal
        INSERT INTO ReportesInformacionBasica (
            nombreReporte, fechaCreacion, ultimaModificacion,
            tipoMantenimiento, Modelo, responsable, horaInicio, horaTermino,
            licencia, registro, restaurador, Circuito, area, ubicacionMapa, direccion
        )
        VALUES (
            'Reporte Automático', GETDATE(), GETDATE(),
            @tipoMantenimiento, @modelo, @responsable, @horaInicio, @horaTermino,
            @licencia, @registro, @restaurador, @circuito, @area, @ubicacionMapa, @direccion
        );

        DECLARE @new_id INT = SCOPE_IDENTITY();

        -- Insert en ReportesSistemaComunicaciones
        INSERT INTO ReportesSistemaComunicaciones (
            id_reporte, nsRadioGabinete, potenciaSalida, rss1, umbralRecepcion, frecuencia,
            rx, tx, CablePigtail, Supresor, CableLT, Antena
        )
        VALUES (
            @new_id, @nsRadioGabinete, @potenciaSalida, @rssi, @umbralRecepcion, @frecuencia,
            @rx, @tx, @CablePigtail, @Supresor, @CableLT, @Antena
        );

        -- Insert en ReportesMantenimiento
        INSERT INTO ReportesMantenimiento (
            id_reporte, alturaAntena, RepetidorEnlace, CanalUCM, fotografiasMantto,
            medicionRF, medicionFuenteCD, medicionBateria, limpieza, ajusteTornilleria,
            cambioAntena, impermeabilizacionConectores, redireccionamientoAntena, cambioLT, 
            cambioSupresor, cambioRadio, cambioPigtail, cambioConectores
        )
        VALUES (
            @new_id, @alturaAntena, @RepetidorEnlace, @CanalUCM, @fotografiasMantto,
            @medicionRF, @medicionFuenteCD, @medicionBateria, @limpieza, @ajusteTornilleria,
            @cambioAntena, @impermeabilizacionConectores, @redireccionamientoAntena, @cambioLT,
            @cambioSupresor, @cambioRadio, @cambioPigtail, @cambioConectores
        );

        -- Insert en ReportesMediciones
        INSERT INTO ReportesMediciones (
            id_reporte, potenciaRadio, potenciaIncidente, potenciaReflejada,
            vswr, voltajeAcometida, resistenciaTierra, voltajeFuente,
            voltajeBateria, resitenciaBateria, porcentajeBateria, anguloAzimut
        )
        VALUES (
            @new_id, @potenciaRadio, @potenciaIncidente, @potenciaReflejada,
            @vswr, @voltajeAcometida, @resistenciaTierra, @voltajeFuente,
            @voltajeBateria, @resitenciaBateria, @porcentajeBateria, @anguloAzimut
        );

        -- Insert en ReportesInstalacion
        INSERT INTO ReportesInstalacion (
            id_reporte, placaNomeclatura, selladoGabinete, protectorAntifauna,
            cuchillaByPass, cuchillaLaterale, bajanteTierra, terminalPAT,
            apartarrayos, cableRF, calibreBajante, Observaciones, configuracionRadio
        )
        VALUES (
            @new_id, @placaNomeclatura, @selladoGabinete, @protectorAntifauna,
            @cuchillaByPass, @cuchillaLaterale, @bajanteTierra, @terminalPAT,
            @apartarrayos, @cableRF, @calibreBajante, @Observaciones, @configuracionRadio
        );

        -- Insert en ReportesImagenes
        INSERT INTO ReportesImagenes (
            id_reporte, imagenEstructura, imagenGabinete, imagenRadio, imagenSupresor,
            imagenRestaurador, imagenTerminalTierra, imagenBajanteTierra, imagenPlaca, imagenAdicional
        )
        VALUES (
            @new_id, @imagenEstructura, @imagenGabinete, @imagenRadio, @imagenSupresor,
            @imagenRestaurador, @imagenTerminalTierra, @imagenBajanteTierra, @imagenPlaca, @imagenAdicional
        );

        COMMIT TRANSACTION;

        SELECT @new_id AS id_reporte;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW; -- Re-lanza el error para que el cliente pueda capturarlo
    END CATCH
END
GO



