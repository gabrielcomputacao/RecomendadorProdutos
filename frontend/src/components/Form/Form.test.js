import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';


jest.mock('../../utils/validationForm', () => {
 
  return {
    validationForm: jest.fn().mockReturnValue({
      isValid: false,
      message: ['Todos os campos são obrigatórios']
    })
  };
});

jest.mock('../../hooks/useProducts', () => () => ({
  preferences: [
    'Personalização de funis de vendas',
    'Relatórios avançados de desempenho de vendas',
  ],
  features: [
    'Automação de fluxos de trabalho de vendas',
    'Rastreamento de interações com clientes',
  ],
  products: [
    {
      id: 1,
      name: 'RD Station CRM',
      category: 'Vendas',
      preferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Relatórios avançados de desempenho de vendas',
      ],
      features: [
        'Gestão de leads e oportunidades',
        'Automação de fluxos de trabalho de vendas',
        'Rastreamento de interações com clientes',
      ],
    },
  ],
}));


jest.mock('../../hooks/useForm', () => () => ({
  formData: {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  },
  handleChange: jest.fn(),
}));


jest.mock('../../hooks/useRecommendations', () => () => ({
  getRecommendations: jest.fn().mockReturnValue([]),
}));


import Form from './Form';

describe('Form', () => {
  let validationFormMock;

  beforeEach(() => {
    
    jest.clearAllMocks();
    
    
    const validationModule = require('../../utils/validationForm');
    validationFormMock = validationModule.validationForm;
    
   
    validationFormMock.mockReturnValue({
      isValid: false,
      message: ['Todos os campos são obrigatórios']
    });
  });

  test('Verifica se está chamando a função validationForm e se não esta setando os dados de recommendations', async () => {
    const mockSetRecommendations = jest.fn();
    
   
    render(<Form setRecommendations={mockSetRecommendations} />);
    
    
    const button = screen.getByRole('button', { name: /Obter recomendação/i });
    fireEvent.click(button);
    
    expect(validationFormMock).toHaveBeenCalled();
    
    expect(mockSetRecommendations).not.toHaveBeenCalled();

  });
  test('Está aparecendo mensagem de validação', async () => {
    const mockSetRecommendations = jest.fn();
    
   
    render(<Form setRecommendations={mockSetRecommendations} />);
    
    
    const button = screen.getByRole('button', { name: /Obter recomendação/i });
    fireEvent.click(button);
    
   
   
    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
    
    

  });
});