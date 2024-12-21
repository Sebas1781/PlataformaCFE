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
    @resitenciaBateria NVARCHAR(50), -- Manteniendo el error tipográfico
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

        -- Generación automática de nombreReporte combinando direccion, responsable y fechaCreacion
        DECLARE @nombreReporte NVARCHAR(255);
        SET @nombreReporte = CONCAT(@direccion, ' - ', @responsable, ' - ', CONVERT(NVARCHAR(20), GETDATE(), 120));

        -- Insert en la tabla principal con nombreReporte generado
        INSERT INTO ReportesInformacionBasica (
            nombreReporte, fechaCreacion, ultimaModificacion,
            tipoMantenimiento, Modelo, responsable, horaInicio, horaTermino,
            licencia, registro, restaurador, Circuito, area, ubicacionMapa, direccion
        )
        VALUES (
            @nombreReporte, GETDATE(), GETDATE(),
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


-------- Modificar reporte ------------

CREATE PROCEDURE sp_modificar_reporte
    @id_reporte INT,
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
    @cablePigtail NVARCHAR(100),
    @supresor NVARCHAR(100),
    @cableLT NVARCHAR(100),
    @alturaAntena NVARCHAR(50),
    @repetidorEnlace NVARCHAR(100),
    @canalUCM NVARCHAR(100),
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
    @resistenciaBateria NVARCHAR(50),
    @porcentajeBateria NVARCHAR(50),
    @anguloAzimut NVARCHAR(50),
    @placaNomenclatura BIT,
    @selladoGabinete BIT,
    @protectorAntifauna BIT,
    @cuchillasByPass BIT,
    @cuchillasLaterale BIT,
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

        -- Actualizar la tabla principal
        UPDATE ReportesInformacionBasica
        SET
            tipoMantenimiento = @tipoMantenimiento,
            modelo = @modelo,
            fecha = @fecha,
            horaInicio = @horaInicio,
            horaTermino = @horaTermino,
            responsable = @responsable,
            licencia = @licencia,
            registro = @registro,
            restaurador = @restaurador,
            circuito = @circuito,
            area = @area,
            ubicacionMapa = @ubicacionMapa,
            direccion = @direccion
        WHERE id_reporte = @id_reporte;

        -- Actualizar las demás tablas por el ID
        UPDATE ReportesSistemaComunicaciones
        SET
            nsRadioGabinete = @nsRadioGabinete,
            potenciaSalida = @potenciaSalida,
            rss1 = @rssi,
            umbralRecepcion = @umbralRecepcion,
            frecuencia = @frecuencia,
            rx = @rx,
            tx = @tx,
            CablePigtail = @cablePigtail,
            Supresor = @supresor,
            CableLT = @cableLT
        WHERE id_reporte = @id_reporte;

        UPDATE ReportesMantenimiento
        SET
            alturaAntena = @alturaAntena,
            RepetidorEnlace = @repetidorEnlace,
            CanalUCM = @canalUCM,
            fotografiasMantto = @fotografiasMantto,
            medicionRF = @medicionRF,
            medicionFuenteCD = @medicionFuenteCD,
            medicionBateria = @medicionBateria,
            limpieza = @limpieza,
            ajusteTornilleria = @ajusteTornilleria,
            cambioAntena = @cambioAntena,
            impermeabilizacionConectores = @impermeabilizacionConectores,
            redireccionamientoAntena = @redireccionamientoAntena,
            cambioLT = @cambioLT,
            cambioSupresor = @cambioSupresor,
            cambioRadio = @cambioRadio,
            cambioPigtail = @cambioPigtail,
            cambioConectores = @cambioConectores
        WHERE id_reporte = @id_reporte;

        UPDATE ReportesMediciones
        SET
            potenciaRadio = @potenciaRadio,
            potenciaIncidente = @potenciaIncidente,
            potenciaReflejada = @potenciaReflejada,
            vswr = @vswr,
            voltajeAcometida = @voltajeAcometida,
            resistenciaTierra = @resistenciaTierra,
            voltajeFuente = @voltajeFuente,
            voltajeBateria = @voltajeBateria,
            resistenciaBateria = @resistenciaBateria,
            porcentajeBateria = @porcentajeBateria,
            anguloAzimut = @anguloAzimut
        WHERE id_reporte = @id_reporte;

        UPDATE ReportesInstalacion
        SET
            placaNomenclatura = @placaNomenclatura,
            selladoGabinete = @selladoGabinete,
            protectorAntifauna = @protectorAntifauna,
            cuchillasByPass = @cuchillasByPass,
            cuchillasLaterale = @cuchillasLaterale,
            bajanteTierra = @bajanteTierra,
            terminalPAT = @terminalPAT,
            apartarrayos = @apartarrayos,
            cableRF = @cableRF,
            calibreBajante = @calibreBajante,
            Observaciones = @Observaciones,
            configuracionRadio = @configuracionRadio
        WHERE id_reporte = @id_reporte;

        UPDATE ReportesImagenes
        SET
            imagenEstructura = @imagenEstructura,
            imagenGabinete = @imagenGabinete,
            imagenRadio = @imagenRadio,
            imagenSupresor = @imagenSupresor,
            imagenRestaurador = @imagenRestaurador,
            imagenTerminalTierra = @imagenTerminalTierra,
            imagenBajanteTierra = @imagenBajanteTierra,
            imagenPlaca = @imagenPlaca,
            imagenAdicional = @imagenAdicional
        WHERE id_reporte = @id_reporte;

        COMMIT TRANSACTION;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH
END;
GO

-- ------------- Eliminar Reporte ------------------
CREATE PROCEDURE sp_eliminar_reporte
    @id_reporte INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Eliminar de ReportesImagenes
        DELETE FROM ReportesImagenes
        WHERE id_reporte = @id_reporte;

        -- Eliminar de ReportesInstalacion
        DELETE FROM ReportesInstalacion
        WHERE id_reporte = @id_reporte;

        -- Eliminar de ReportesMediciones
        DELETE FROM ReportesMediciones
        WHERE id_reporte = @id_reporte;

        -- Eliminar de ReportesMantenimiento
        DELETE FROM ReportesMantenimiento
        WHERE id_reporte = @id_reporte;

        -- Eliminar de ReportesSistemaComunicaciones
        DELETE FROM ReportesSistemaComunicaciones
        WHERE id_reporte = @id_reporte;

        -- Eliminar de ReportesInformacionBasica
        DELETE FROM ReportesInformacionBasica
        WHERE id_reporte = @id_reporte;

        COMMIT TRANSACTION;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW; -- Re-lanza el error para que el cliente pueda capturarlo
    END CATCH
END;
GO
--obtener circuitos:

CREATE PROCEDURE sp_ObtenerNombreCircuito
    @idCircuito INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Nombre
    FROM Circuitos
    WHERE idCircuito = @idCircuito;
END
GO

-- Obtener Antenas
CREATE PROCEDURE sp_ObtenerAntenas
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM Antenas;
END
GO

-- Obtener CablesLT
CREATE PROCEDURE sp_ObtenerCablesLT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM CablesLT;
END
GO

-- Obtener CablesPigtail
CREATE PROCEDURE sp_ObtenerCablesPigtail
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM CablesPigtail;
END
GO

-- Obtener Canales UCM
CREATE PROCEDURE sp_ObtenerCanalesUCM
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM CanalesUCM;
END
GO

-- Obtener Frecuencias
CREATE PROCEDURE sp_ObtenerFrecuencias
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM Frecuencias;
END
GO

-- Obtener Modelos
CREATE PROCEDURE sp_ObtenerModelos
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM Modelos;
END
GO

-- Obtener Repetidores de Enlace
CREATE PROCEDURE sp_ObtenerRepetidoresEnlace
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM RepetidoresEnlace;
END
GO

-- Obtener Supresores
CREATE PROCEDURE sp_ObtenerSupresores
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM Supresores;
END
GO

-- Obtener Usuarios (para el dropdown de representante, solo se ocupa el nombre)
CREATE PROCEDURE sp_ObtenerUsuariosRepresentantes
AS
BEGIN
    SET NOCOUNT ON;
    SELECT nombre FROM Usuarios;
END
GO

--Obtener todos los usuarios para tablas:

CREATE PROCEDURE sp_obtener_usuarios
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        idTrabajador,
        numeroTrabajador,
        nombre
    FROM
        dbo.Usuarios; -- Asegúrate de que el nombre y esquema de la tabla sean correctos
END
GO