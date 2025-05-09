import React from 'react';

function CardRecommendation({ recommendation }) {
  return (
    <div className="p-5 rounded-md border border-gray-300 shadow-md">
      <h3 className="text-xl mb-2">
        <span className="font-semibold">Categoria:</span>{' '}
        {recommendation.category ?? ''}
      </h3>
      <hr />
      <h4 className="text-lg font-semibold">Produtos:</h4>
      <p className="text-blue-500">{recommendation.name}</p>
    </div>
  );
}

export default CardRecommendation;
