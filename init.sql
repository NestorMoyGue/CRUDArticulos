-- Insertar artículos solo si la tabla está vacía
INSERT INTO Articulos (nombre, fecha_modif, marca, estado)
SELECT * FROM (
    SELECT 'Notebook Lenovo', NOW(), 'Lenovo', TRUE UNION ALL
    SELECT 'Impresora HP', NOW(), 'HP', TRUE UNION ALL
    SELECT 'Mouse Logitech', NOW(), 'Logitech', FALSE UNION ALL
    SELECT 'Teclado Redragon', NOW(), 'Redragon', TRUE
) AS datos
WHERE NOT EXISTS (
    SELECT 1 FROM Articulos
);

-- Insertar usuario administrador solo si no existe
INSERT INTO Usuarios (nombre, email, password)
SELECT 'Administrador', 'administrador@gmail.com', '$2a$12$HQfqjVxSB5BxcBIPcEQB3.D0TEccGtRcLxr/YUAVBd7RG5cGjQYgG'
WHERE NOT EXISTS (
    SELECT 1 FROM Usuarios WHERE email = 'administrador@gmail.com'
);
