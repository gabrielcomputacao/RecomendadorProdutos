// getRecommendations.js

import { normalizeText } from '../utils/normalizeText';

const hasMatch = (arrayProduct, arrayForm) => {
  if (!arrayProduct.length || !arrayForm.length) return false;

  return arrayProduct.some((product) =>
    arrayForm.some((formProduct) => formProduct === normalizeText(product))
  );
};

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  /**
   * Crie aqui a lógica para retornar os produtos recomendados.
   */

  console.log(formData)

  const selectedPreferencesNormalized = formData.selectedPreferences.map(
    (preference) => normalizeText(preference)
  );
  const selectedFeaturesNormalized = formData.selectedFeatures.map((feature) =>
    normalizeText(feature)
  );

  const selectedProducts = products.filter((product) => {
    const matchPreference =
      !selectedPreferencesNormalized ||
      hasMatch(product.preferences, selectedPreferencesNormalized);

    const matchFeature =
      !selectedFeaturesNormalized ||
      hasMatch(product.features, selectedFeaturesNormalized);

    return matchFeature || matchPreference;
  });

    return selectedProducts;

};

export default { getRecommendations };
