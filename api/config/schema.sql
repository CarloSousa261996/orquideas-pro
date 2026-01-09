-- Estrutura inicial da base de dados para Orquídeas
CREATE TABLE genus (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(100) NOT NULL UNIQUE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE type (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(100) NOT NULL UNIQUE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE luminosity (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(100) NOT NULL UNIQUE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE temperature (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(100) NOT NULL UNIQUE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE humidity (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(100) NOT NULL UNIQUE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE size (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(100) NOT NULL UNIQUE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE orchid (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(100) NOT NULL,
  genus_id INT NOT NULL,
  type_id INT NOT NULL,
  luminosity_id INT NOT NULL,
  temperature_id INT NOT NULL,
  humidity_id INT NOT NULL,
  size_id INT NOT NULL,
  image VARCHAR(255),
  FOREIGN KEY (genus_id) REFERENCES genus(id),
  FOREIGN KEY (type_id) REFERENCES type(id),
  FOREIGN KEY (luminosity_id) REFERENCES luminosity(id),
  FOREIGN KEY (temperature_id) REFERENCES temperature(id),
  FOREIGN KEY (humidity_id) REFERENCES humidity(id),
  FOREIGN KEY (size_id) REFERENCES size(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Índices para performance
CREATE INDEX idx_genus_description ON genus(description);
CREATE INDEX idx_type_description ON type(description);
CREATE INDEX idx_orchid_description ON orchid(description);
