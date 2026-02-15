-- Estrutura inicial da base de dados para Orquídeas
CREATE TABLE genus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE
) CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE
) CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE luminosity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE
) CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE temperature (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE
) CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE humidity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE
) CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE size (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE
) CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE orchid (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100) NOT NULL UNIQUE,
    genus_id INT NOT NULL,
    type_id INT NOT NULL,
    luminosity_id INT NOT NULL,
    temperature_id INT NOT NULL,
    humidity_id INT NOT NULL,
    size_id INT NOT NULL,
    image VARCHAR(255),
    FOREIGN KEY (genus_id) REFERENCES genus (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (type_id) REFERENCES type (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (luminosity_id) REFERENCES luminosity (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (temperature_id) REFERENCES temperature (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (humidity_id) REFERENCES humidity (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (size_id) REFERENCES size (id) ON DELETE CASCADE ON UPDATE CASCADE
) CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Índices para performance
CREATE INDEX idx_genus_description ON genus (description);

CREATE INDEX idx_genus_name ON genus (name);

CREATE INDEX idx_type_description ON type(description);

CREATE INDEX idx_type_name ON type(name);

CREATE INDEX idx_luminosity_name ON luminosity (name);

CREATE INDEX idx_temperature_name ON temperature (name);

CREATE INDEX idx_humidity_name ON humidity (name);

CREATE INDEX idx_size_name ON size (name);

CREATE INDEX idx_orchid_description ON orchid (description);