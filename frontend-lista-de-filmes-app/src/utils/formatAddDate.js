export function formatAddDate(dateString) {
  if (!dateString) return 'Data não disponível';

  try {
    return new Date(dateString).toLocaleDateString('pt-BR');
  } catch (error) {
    return 'Data inválida';
  }
}
