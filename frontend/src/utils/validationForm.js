export function validationForm(formData) {
  const message = [];

  if (!formData.selectedRecommendationType) {
        message.push("Obrigatório envio do campo tipo de recomendação.")
  }

  if (
    formData.selectedPreferences.length === 0 &&
    formData.selectedFeatures.length === 0
  ) {
        message.push("Necessário preencher algum campo de preferências ou de funcionalidades.")
  }

  return  message.length  === 0 ? { isValid: true } : { isValid: false, message };
}
