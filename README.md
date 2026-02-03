Vehicle registration and entry/exit control

Node.js, Express, MySQL

## Ejecución Local

1. Instalar dependencias: `npm install`

2. Configurar el archivo `.env` con tus credenciales de MySQL.
   PORT=
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=bd_rv
   URL_FRONTEND=http://localhost:3000

3. Ejecutar el script SQL incluido para crear la base de datos y los procedimientos.
   MYSQL
   DDL

CREATE DATABASE IF NOT EXISTS bd_rv;

USE bd_rv;

CREATE TABLE brand (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(40) NOT NULL
);

CREATE TABLE model (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(40) NOT NULL
);

CREATE TABLE Vehicles (
id INT AUTO_INCREMENT PRIMARY KEY,
id_brand INT NOT NULL,
id_model INT NOT NULL,
Plate VARCHAR(40) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
is_active BOOLEAN NOT NULL,
INDEX idx_brand (id_brand),
INDEX idx_model (id_model),
FOREIGN KEY (id_brand) REFERENCES brand(id),
FOREIGN KEY (id_model) REFERENCES model(id)
);

CREATE TABLE register_movement (
id INT AUTO_INCREMENT PRIMARY KEY,
id_Vehicles INT NOT NULL,
movements ENUM('in', 'out'),
motorcyclist VARCHAR(100) NOT NULL,
mileage BIGINT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_Vehicles) REFERENCES Vehicles(id)
);

DROP PROCEDURE IF EXISTS sp_vehicles_list;
DELIMITER //
CREATE PROCEDURE sp_vehicles_list(
)
BEGIN
SELECT v.id,
v.Plate,
b.title AS brand_name,
m.title AS model_name,
v.created_at,
v.updated_at
FROM Vehicles v
INNER JOIN brand b ON v.id_brand = b.id
INNER JOIN model m ON v.id_model = m.id
WHERE is_active = 1
ORDER BY v.created_at ASC;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_brand_list;
DELIMITER //
CREATE PROCEDURE sp_brand_list()
BEGIN
SELECT id, title
FROM brand
ORDER BY title ASC;

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_model_list;
DELIMITER //
CREATE PROCEDURE sp_model_list()
BEGIN
SELECT id, title
FROM model
ORDER BY title ASC;

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_vehicle_add;
DELIMITER //
CREATE PROCEDURE sp_vehicle_add(
IN p_id_brand INT,
IN p_id_model INT,
IN p_plate VARCHAR(20)
)
BEGIN
INSERT INTO Vehicles (id_brand, id_model, Plate, is_active)
VALUES (p_id_brand, p_id_model, p_plate,1);

    SELECT
        v.id,
        v.Plate,
        b.title AS brand_name,
        m.title AS model_name,
        v.created_at
    FROM Vehicles v
    INNER JOIN brand b ON v.id_brand = b.id
    INNER JOIN model m ON v.id_model = m.id
    WHERE v.id = LAST_INSERT_ID();

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_vehicle_delete;
DELIMITER //
CREATE PROCEDURE sp_vehicle_delete(
IN p_id_vehicle INT
)
BEGIN
IF NOT EXISTS (SELECT 1 FROM Vehicles WHERE id = p_id_vehicle) THEN
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'El vehículo no existe';
ELSE
UPDATE Vehicles
SET is_active = 0,
updated_at = CURRENT_TIMESTAMP
WHERE id = p_id_vehicle;

        SELECT p_id_vehicle AS id;
    END IF;

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_vehicle_update;
DELIMITER //
CREATE PROCEDURE sp_vehicle_update(
IN p_id INT,
IN p_id_brand INT,
IN p_id_model INT,
IN p_plate VARCHAR(20)
)
BEGIN
IF NOT EXISTS (SELECT 1 FROM Vehicles WHERE id = p_id) THEN
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Vehículo no encontrado';
ELSE
UPDATE Vehicles
SET id_brand = p_id_brand,
id_model = p_id_model,
Plate = p_plate,
updated_at = CURRENT_TIMESTAMP
WHERE id = p_id;

        SELECT v.id, v.Plate, b.title AS brand_name, m.title AS model_name, v.updated_at
        FROM Vehicles v
        INNER JOIN brand b ON v.id_brand = b.id
        INNER JOIN model m ON v.id_model = m.id
        WHERE v.id = p_id;
    END IF;

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_register_movement_add;
DELIMITER //
CREATE PROCEDURE sp_register_movement_add(
IN p_id_vehicles INT,
IN p_movements enum('in','out'),
IN p_motorcyclist VARCHAR(100),
IN p_mileage BIGINT
)
BEGIN
INSERT INTO register_movement (id_Vehicles, movements, motorcyclist, mileage)
VALUES (p_id_vehicles, p_movements, p_motorcyclist, p_mileage);

    SELECT
        id, id_Vehicles, movements, motorcyclist, mileage, created_at
    FROM register_movement
    WHERE id = LAST_INSERT_ID();

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_register_movement_list;
DELIMITER //
CREATE PROCEDURE sp_register_movement_list(
IN p_motorcyclist VARCHAR(100),
IN p_id_vehicles INT,
IN p_created_at TIMESTAMP
)
BEGIN
SELECT
rm.id,
v.Plate,
b.title AS brand_name,
m.title AS model_name,
rm.movements,
rm.motorcyclist,
rm.created_at,
rm.mileage,
v.id AS vehicle_id
FROM register_movement rm
INNER JOIN Vehicles v ON rm.id_Vehicles = v.id
INNER JOIN brand b ON v.id_brand = b.id
INNER JOIN model m ON v.id_model = m.id
WHERE (p_motorcyclist IS NULL OR p_motorcyclist = '' OR rm.motorcyclist LIKE CONCAT('%', p_motorcyclist, '%'))
AND (p_id_vehicles IS NULL OR p_id_vehicles = 0 OR rm.id_Vehicles = p_id_vehicles)
AND (p_created_at IS NULL OR DATE(rm.created_at) = p_created_at)
ORDER BY rm.created_at DESC;  
END //
DELIMITER ;

DML
INSERT INTO brand
VALUES
(1, 'Toyota'),
(2, 'Volkswagen'),
(3, 'Honda'),
(4, 'Hyundai'),
(5, 'Kia'),
(6, 'Ford'),
(7, 'Chevrolet'),
(8, 'Tesla'),
(9, 'Jeep'),
(10, 'BMW'),
(11, 'Mercedes-Benz'),
(12, 'Audi'),
(13, 'Lexus'),
(14, 'BYD'),
(15, 'MG'),
(16, 'Xiaomi'),
(17, 'Peugeot'),
(18, 'Renault'),
(19, 'Citroën'),
(20, 'Mazda'),
(21, 'Subaru'),
(22, 'Mitsubishi'),
(23, 'Nissan'),
(24, 'Fiat'),
(25, 'SEAT'),
(26, 'Cupra'),
(27, 'Alfa Romeo'),
(28, 'Changan'),
(29, 'Geely'),
(30, 'GWM'),
(31, 'Chery'),
(32, 'Omoda'),
(33, 'Porsche'),
(34, 'Ferrari'),
(35, 'McLaren'),
(36, 'Lamborghini'),
(37, 'Aston Martin');

INSERT INTO model
VALUES
(1, 'Agya'),
(2, 'Wigo'),
(3, 'Yaris'),
(4, 'Corolla'),
(5, 'Camry'),
(6, 'Prius'),
(7, 'Crown'),
(8, 'Raize'),
(9, 'Yaris Cross'),
(10, 'Corolla Cross'),
(11, 'RAV4'),
(12, '4Runner'),
(13, 'Highlander'),
(14, 'Grand Highlander'),
(15, 'Prado'),
(16, 'Sequoia'),
(17, 'bZ4X'),
(18, 'Hilux'),
(19, 'Tacoma'),
(20, 'Tundra'),
(21, 'GR86'),
(22, 'GR Supra'),
(23, 'GR Yaris'),
(24, 'GR Corolla'),
(25, 'Sienna'),
(26, 'Hiace'),
(27, 'Model Y'),
(28, 'F-150'),
(29, 'Tucson'),
(30, 'Sportage'),
(31, 'Kicks'),
(32, 'Tiguan'),
(33, 'Versa'),
(34, 'K3'),
(35, 'Swift'),
(36, 'Jetta'),
(37, 'Civic'),
(38, 'Qashqai'),
(39, 'Seltos'),
(40, 'CX-30'),
(41, 'Stepway'),
(42, 'MG ZS'),
(43, 'Sandero'),
(44, 'Clio');

4. Iniciar el servidor: `npm run dev`.

## API Endpoints

- `GET /api/brand/list` - Listar todas las Marcas de auto.
- `GET /api/model/list` - Listar todos los modelos de auto.
- `GET /api/vehicles/list` - Listar todos los vehículos.
- `POST /api/vehicles` - Registrar nuevo vehiculo.
- `POST /api/movements` - Registrar nuevo Movimiento de entrada/salida de vehiculos.
- `POST /api/movements/list` - Listar todos los Registros de entrada/salida.
- `DELETE /api/vehicles/:id_vehicle` - Eliminar vehiculo.
- `PUT /api/vehicles/:id_vehicle` - Editar un vehiculo existente.

[rv-backend-production.up.railway.app](https://rv-backend-production.up.railway.app/)
