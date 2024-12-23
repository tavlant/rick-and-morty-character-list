import React, { useState } from 'react';
import { translations } from '../translations';

interface FiltersProps {
  onFilterChange: (filters: { status: string; species: string }) => void;
  language: 'en' | 'de';
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, language }) => {
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');

  const statusOptions = [
    { value: '', label: translations[language].filterByStatus },
    { value: 'Alive', label: translations[language].alive },
    { value: 'Dead', label: translations[language].dead },
    { value: 'Unknown', label: translations[language].unknown },
  ]

  const speciesOptions = [
    { value: '', label: translations[language].filterBySpecies },
    { value: 'Human', label: translations[language].human },
    { value: 'Alien', label: translations[language].alien },
    { value: 'Mythological', label: translations[language].mythological },
    { value: 'Animal', label: translations[language].animal },
    { value: 'Robot', label: translations[language].robot },
    { value: 'Cronenberg', label: translations[language].cronenberg },
  ];

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    onFilterChange({ status: newStatus, species });
  };

  const handleSpeciesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSpecies = event.target.value;
    setSpecies(newSpecies);
    onFilterChange({ status, species: newSpecies });
  };

  return (
    <div className="flex space-x-4">
      <select value={status} onChange={handleStatusChange} className="dropdown rounded-lg border-gray-300 p-2">
        {statusOptions.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <select value={species} onChange={handleSpeciesChange} className="dropdown rounded-lg border-gray-300 p-2">
        {speciesOptions.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;