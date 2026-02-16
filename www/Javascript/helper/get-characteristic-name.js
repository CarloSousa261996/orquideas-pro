const characteristicNames = {
  genus: "Género",
  type: "Tipo",
  luminosity: "Luminosidade",
  temperature: "Temperatura",
  humidity: "Humidade",
  size: "Tamanho",
};

export function getCharacteristicName(characteristic) {
  return characteristicNames[characteristic] || null;
}
