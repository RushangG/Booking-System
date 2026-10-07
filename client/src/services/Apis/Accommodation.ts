import { gql } from "@apollo/client";

export const ALL_ACCOMMODATIONS = gql`
  query Accommodations {
    accommodations {
      id
      name
      description
      price_per_night
      type_id {
        id
        name
      }
      location_id {
        id
        name
        city
        country
      }
    }
  }
`;

export const CREATE_ACCOMMODATION = gql`
  mutation CreateAccommodation($createAccommodationInput: CreateAccommodationInput!) {
    createAccommodation(createAccommodationInput: $createAccommodationInput) {
      id
      name
      description
      price_per_night
    }
  }
`;

export const UPDATE_ACCOMMODATION = gql`
  mutation UpdateAccommodation($updateAccommodationInput: UpdateAccommodationInput!) {
    updateAccommodation(updateAccommodationInput: $updateAccommodationInput) {
      id
      name
      description
      price_per_night
    }
  }
`;

export const DELETE_ACCOMMODATION = gql`
  mutation RemoveAccommodation($id: Int!) {
    removeAccommodation(id: $id) {
      id
    }
  }
`;

export const ALL_ACCOMMODATION_TYPES = gql`
  query AccommodationTypes {
    accommodationTypes {
      id
      name
    }
  }
`;

export const ALL_LOCATIONS = gql`
  query Locations {
    locations {
      id
      name
      city
      country
    }
  }
`;

