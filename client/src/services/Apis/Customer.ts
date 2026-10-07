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
