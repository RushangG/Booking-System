import { gql } from "@apollo/client";

export const USER_ALL = gql`
  query Users {
    users {
      id
      createdAt
      name
      email
    }
  }
`;

export const USER_BY_ID = gql`
  query User($id: Int!) {
    user(id: $id) {
      id
      createdAt
      name
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(
      createUserInput: { name: $name, email: $email, password: $password }
    ) {
      id
      createdAt
      name
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $name: String!, $email: String!) {
    updateUser(updateUserInput: { id: $id, name: $name, email: $email }) {
      id
      createdAt
      name
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation RemoveUser($id: Int!) {
    removeUser(id: $id)
  }
`;

export const USER_COMPANIES = gql`
  query User($id: Int!) {
    user(id: $id) {
      companiesHasUsers {
        company {
          id
          name
          address
          industry
        }
      }
    }
  }
`;
