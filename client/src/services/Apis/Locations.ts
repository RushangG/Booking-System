import { gql } from "@apollo/client";
export const AllLocations = gql`
query Locations {
    locations {
        id
        name
        city
        state
        country
        address
        createdAt
    }
}
`;

export const LocationById = gql`
query Location {
    location(id: 1) {
        id
        name
        city
        state
        country
        address
        createdAt
    }
}`;

export const CREATE_LOCATION = gql`
mutation CreateLocation($name: String!, $city: String!, $state: String!, $country: String!, $address: String!) {
    createLocation(
        createLocationInput: {
            name: $name
            city: $city
            state: $state
            country: $country
            address: $address
        }
    ) {
        id
        name
        city
        state
        country
        address
        createdAt
    }
}`;

export const UPDATE_LOCATION = gql`
mutation UpdateLocation($id: Int!, $name: String, $city: String, $state: String, $country: String, $address: String) {
    updateLocation(
        updateLocationInput: {
            id: $id
            name: $name
            city: $city
            state: $state
            country: $country
            address: $address

        }
    ) {
        id
        name
        city
        state
        country
        address
        createdAt
    }
}`;

export const DELETE_LOCATION = gql`
mutation RemoveLocation($id: Int!) {
    removeLocation(id: $id)
}`;