import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($status: String, $species: String, $offset: Int) {
    characters(filter: { status: $status, species: $species }, page: $offset) {
      info {
        next
      }
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
      }
    }
  }
`;