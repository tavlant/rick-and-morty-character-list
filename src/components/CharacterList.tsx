import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../apollo/queries';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import { translations } from '../translations';

interface CharacterListProps {
  statusFilter: string;
  speciesFilter: string;
  language: 'en' | 'de';
}

const CharacterList: React.FC<CharacterListProps> = ({ statusFilter, speciesFilter, language }) => {
  const [sortOption] = useState('name');
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { status: statusFilter, species: speciesFilter, offset: 1 },
  });
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!data) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetchingMore && data.characters.info.next) {
        setIsFetchingMore(true);
        fetchMore({
          variables: {
            offset: Math.ceil(data.characters.results.length / 20) + 1,
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prevResult;
            return {
              characters: {
                ...fetchMoreResult.characters,
                results: [
                  ...prevResult.characters.results,
                  ...fetchMoreResult.characters.results,
                ],
              },
            };
          },
        }).finally(() => setIsFetchingMore(false));
      }
    });

    const target = loadMoreRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [data, fetchMore, isFetchingMore]);

  if (loading) return <Spinner />;
  if (error) {
    console.error('Error fetching data:', error);
    return <ErrorMessage message="Failed to fetch data. Please try again later." />;
  }

  console.log('Fetched data:', data);

  const characters = data.characters.results;

  const sortedCharacters = [...characters].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return a.origin.name.localeCompare(b.origin.name);
    }
  });

  return (
    <div className="container mx-auto p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedCharacters.map(character => (
          <li key={character.id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold">{character.name}</h3>
            <p>{translations[language].status}: <span className={`font-bold ${character.status === 'Alive' ? 'text-green-500' : character.status === 'Dead' ? 'text-red-500' : 'text-gray-500'}`}>{character.status.charAt(0).toUpperCase() + character.status.slice(1)}</span></p>
            <p>{translations[language].species}: {character.species}</p>
            <p>{translations[language].gender}: {character.gender}</p>
            <p>{translations[language].origin}: {character.origin.name}</p>
          </li>
        ))}
      </ul>
      {isFetchingMore && <Spinner />}
      <div ref={loadMoreRef} id="load-more" className="h-10" />
      {!isFetchingMore && !data.characters.info.next && (
        <p className="text-center text-gray-500 mt-4">{translations[language].noMoreCharacters}</p>
      )}
    </div>
  );
};

export default CharacterList;