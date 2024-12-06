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

	PRINT 'Usuario agregado exitosamente';
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

--Eliminar usuario por ID

CREATE PROCEDURE DeleteUser
	@idTrabajador INT

AS
BEGIN 
	DELETE FROM Usuarios
	WHERE idTrabajador = @idTrabajador;
	
	IF @@ROWCOUNT = 0 
	BEGIN
		PRINT 'No se encontro el usuario con el ID proporcionado';
	END
	ELSE
	BEGIN
		PRINT 'Uusuario eliminado correctamente';
	END
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

    IF @@ROWCOUNT = 0
    BEGIN
        PRINT 'No se encontró el usuario con el ID proporcionado';
    END
    ELSE
    BEGIN
        PRINT 'Usuario actualizado exitosamente';
    END
END;

-- Buscar Usuario por numeroTrabajador para el LogIn

CREATE PROCEDURE GetUserByNumeroTrabajador
    @numeroTrabajador VARCHAR(100)
AS
BEGIN
    SELECT idTrabajador, numeroTrabajador, nombre, tipoUsuario, password
    FROM Usuarios
    WHERE numeroTrabajador = @numeroTrabajador
END;