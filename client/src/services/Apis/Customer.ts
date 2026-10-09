import { gql } from "@apollo/client";

export const CUSTOMER_ALL = gql`
  query CustomerAll {
    customerAll {
      id
      name
      email
      phone
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer(
    $name: String!
    $email: String!
    $phone: String!
    $companyId: Int
  ) {
    createCustomer(
      createCustomerInput: { name: $name, email: $email, phone: $phone }
      companyId: $companyId
    ) {
      id
      name
      email
      phone
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer(
    $id: Int!
    $name: String!
    $email: String!
    $phone: String!
  ) {
    updateCustomer(
      updateCustomerInput: {
        id: $id
        name: $name
        email: $email
        phone: $phone
      }
    ) {
      id
      name
      email
      phone
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation RemoveCustomer($id: Int!) {
    removeCustomer(id: $id)
  }
`;
