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
  const selectedPreferencesNormalized = formData.selectedPreferences
    ? formData.selectedPreferences.map((preference) =>
        normalizeText(preference)
      )
    : [];
  const selectedFeaturesNormalized = formData.selectedFeatures
    ? formData.selectedFeatures.map((feature) => normalizeText(feature))
    : [];

  const selectedProducts = products.filter((product) => {
    const matchPreference =
      selectedPreferencesNormalized.length > 0 &&
      hasMatch(product.preferences, selectedPreferencesNormalized);

    const matchFeature =
      selectedFeaturesNormalized.length > 0 &&
      hasMatch(product.features, selectedFeaturesNormalized);

    return matchFeature || matchPreference;
  });

  if (formData.selectedRecommendationType === 'SingleProduct') {
    const filteredBestProduct =
      selectedProducts.length > 0
        ? selectedProducts.reduce((bestProduct, currentProducts) => {
            const valueCurrent = currentProducts.features.filter((feature) =>
              formData.selectedFeatures
                ? formData.selectedFeatures.includes(feature)
                : false
            ).length;

            const bestValue = bestProduct
              ? bestProduct.features.filter((feature) =>
                  formData.selectedFeatures
                    ? formData.selectedFeatures.includes(feature)
                    : false
                ).length
              : 0;

            return valueCurrent >= bestValue ? currentProducts : bestProduct;
          }, null)
        : [];

    return filteredBestProduct.length > 0
      ? [filteredBestProduct]
      : [selectedProducts[selectedProducts.length - 1]];
  }

  return selectedProducts;
};

export default { getRecommendations };
