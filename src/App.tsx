import React, { useState } from 'react';
import CharacterList from './components/CharacterList';
import Filters from './components/Filters';
import { translations } from './translations';

interface FiltersProps {
  status: string;
  species: string;
}
  

type Language = 'en' | 'de';

const App = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [statusFilter, setStatusFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'de' : 'en'));
  };

  const handleFilterChange = ({ status, species }: FiltersProps) => {
    setStatusFilter(status);
    setSpeciesFilter(species);
  };

  return (
      <div className="app container mx-auto p-4">
        <header className="mb-4 text-center">
          <h1 className="text-3xl font-bold mb-2">{translations[language].title}</h1>
          <button onClick={toggleLanguage} className="mt-2 p-2 bg-blue-500 text-white rounded">
            {translations[language].toggleLanguage}
          </button>
        </header>
        <div className="flex justify-center mb-4">
          <Filters onFilterChange={handleFilterChange} language={language} />
        </div>
        <CharacterList statusFilter={statusFilter} speciesFilter={speciesFilter} language={language} />
      </div>
  );
};

export default App;