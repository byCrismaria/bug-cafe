/**
 * Formata um valor numérico para o formato de moeda Real (BRL).
 * @param {number|string} price - O valor a ser formatado.
 * @param {boolean} isModifier - Se true e price > 0, adiciona "+" antes do valor.
 * @returns {string} Valor formatado (ex: "R$ 12,00" ou "+ R$ 2,00").
 */
export const formatPrice = (price, isModifier = false) => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numericPrice)) return 'R$ 0,00';

  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericPrice);

  return isModifier && numericPrice > 0 ? `+ ${formatted}` : formatted;
};

/**
 * Gera URL de imagem placeholder baseada no nome do produto.
 * @param {string} name - Nome do produto.
 * @param {object} options - Opções de personalização.
 * @param {number} options.width - Largura da imagem (default: 400).
 * @param {number} options.height - Altura da imagem (default: 300).
 * @param {string} options.bgColor - Cor de fundo hex sem # (default: 'A1887F').
 * @param {string} options.textColor - Cor do texto hex sem # (default: 'FFFFFF').
 * @returns {string} URL do placeholder.
 */
export const getPlaceholderImage = (name, { width = 400, height = 300, bgColor = 'A1887F', textColor = 'FFFFFF' } = {}) => {
  const text = name.split(' ')[0].toUpperCase().substring(0, 5);
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${text}`;
};
