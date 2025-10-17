import React from 'react';
import { Product } from '../types';

interface ProductRecommendationProps {
  products: Product[];
}

const ProductRecommendation: React.FC<ProductRecommendationProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Studio.K 推薦</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border rounded-lg p-4 text-center">
            <a href={product.link} target="_blank" rel="noopener noreferrer">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2" />
            </a>
            <h4 className="font-semibold">{product.name}</h4>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendation;
