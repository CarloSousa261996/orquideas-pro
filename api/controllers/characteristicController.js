import { CharacteristicService } from "../services/characteristicService.js";

const characteristicService = new CharacteristicService();

/**
 * Retorna todas as características agrupadas por tipo.
 * @param {Request} req - Requisição HTTP.
 * @param {Response} res - Resposta HTTP.
 * @returns {Promise<Response>} Uma promessa que resolve com uma resposta contendo todas as características.
 */
export async function getAllCharacteristics(req, res) {
  try {
    const characteristics = await characteristicService.getAllCharacteristics();
    res.json(characteristics);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar características", details: err.message });
  }
}

/**
 * Retorna características de um tipo específico.
 * @param {Request} req - Requisição HTTP com parâmetro type.
 * @param {Response} res - Resposta HTTP.
 * @returns {Promise<Response>} Uma promessa que resolve com uma resposta contendo as características do tipo especificado.
 */
export async function getCharacteristicsByType(req, res) {
  try {
    const { type } = req.params;
    const characteristics = await characteristicService.getCharacteristicsByType(type);
    
    if (characteristics.length === 0) {
      return res.status(404).json({ error: "Tipo de característica não encontrado" });
    }
    
    res.json(characteristics);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar características", details: err.message });
  }
}