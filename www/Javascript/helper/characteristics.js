import { fetchJson } from "./fetch.js";

let characteristicsCache = null;

/**
 * Busca todas as características da API e armazena em cache.
 * @returns {Promise<Object>} Uma promessa que resolve com um objeto contendo todas as características.
 */
export async function getAllCharacteristics() {
  if (characteristicsCache) {
    return characteristicsCache;
  }
  
  try {
    characteristicsCache = await fetchJson("/api/characteristics");
    return characteristicsCache;
  } catch (error) {
    console.error("Erro ao buscar características:", error);
    return {};
  }
}

/**
 * Busca características de um tipo específico da API.
 * @param {string} type - Tipo da característica (genus, type, luminosity, temperature, humidity, size).
 * @returns {Promise<Array>} Uma promessa que resolve com um array de características do tipo especificado.
 */
export async function getCharacteristicsByType(type) {
  try {
    return await fetchJson(`/api/characteristics/${type}`);
  } catch (error) {
    console.error(`Erro ao buscar características do tipo ${type}:`, error);
    return [];
  }
}

/**
 * Limpa o cache de características.
 */
export function clearCharacteristicsCache() {
  characteristicsCache = null;
}