import React, { useEffect, useState } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';
import { validationForm } from '../../utils/validationForm';
import { ErrorMessages } from './ErrorMessages';

function Form({ setRecommendations }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });
  const [messagesInvalidForm, setMessagesInvalidForm] = useState([]);
  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validatedForm = validationForm(formData);

    if (validatedForm?.isValid) {
      const dataRecommendations = getRecommendations(formData);
      setRecommendations(dataRecommendations);

      return;
    }

    setMessagesInvalidForm(validatedForm?.message);
  };

  useEffect(()=>{
      let timeout = '';
      if(messagesInvalidForm?.length > 0){

        timeout = setTimeout(() => {
          setMessagesInvalidForm([])
        }, 3000)
      }

      return () => clearTimeout(timeout)
  }, [messagesInvalidForm])

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      {messagesInvalidForm?.length > 0 && (
        <ErrorMessages messagesInvalidForm={messagesInvalidForm} />
      )}

      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;
