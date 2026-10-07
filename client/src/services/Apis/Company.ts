import { gql } from "@apollo/client";

export const AllCompany = gql`
  query Companies {
    companies {
      id
      name
      address
      industry
    }
  }
`;

export const CREATE_COMPANY = gql`
  mutation CreateCompany(
    $name: String!
    $address: String!
    $industry: String!
  ) {
    createCompany(name: $name, address: $address, industry: $industry) {
      id
      name
      address
      industry
    }
  }
`;
