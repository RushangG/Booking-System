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
    createCompany(
      createCompanyInput: {
        name: $name
        address: $address
        industry: $industry
      }
    ) {
      id
      name
      address
      industry
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany(
    $id: Int!
    $name: String!
    $address: String!
    $industry: String!
  ) {
    updateCompany(
      updateCompanyInput: {
        id: $id
        name: $name
        address: $address
        industry: $industry
      }
    ) {
      id
      name
      address
      industry
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation RemoveCompany($id: Int!) {
    removeCompany(id: $id)
  }
`;

export const GET_COMPANY_USERS = gql`
  query Company($id: Int!) {
    company(id: $id) {
      id
      name
      companiesHasUsers {
        user {
          id
          createdAt
          name
          email
        }
      }
    }
  }
`;

export const ASSIGN_USERS_TO_COMPANY = gql`
  mutation AssignUsersToCompany($companyId: Int!, $userId: String!) {
    assignUsersToCompany(companyId: $companyId, userId: $userId) {
      id
      createdAt
      user {
        id
        name
        email
      }
      company {
        id
        name
        address
        industry
      }
    }
  }
`;

export const REMOVE_USER_FROM_COMPANY = gql`
  mutation RemoveUserFromCompany($companyId: Int!, $userId: Int!) {
    removeUserFromCompany(companyId: $companyId, userId: $userId)
  }
`;


export const GET_COMPANY_CUSTOMERS = gql`
  query Company($id: Int!) {
    company(id: $id) {
        id
        name
        address
        industry
        customerCompanies {
            id
            Customer {
                id
                name
                email
                phone
            }
        }
    }
}`;

export const ASSIGN_CUSTOMERS_TO_COMPANY = gql`
mutation AssignCustomersToCompany($companyId: Int!, $customerIds: String!) {
    assignCustomersToCompany(companyId: $companyId, customerIds: $customerIds) {
        id
        Customer {
            id
            name
            email
            phone
        }
        Company {
            id
            name
            address
            industry
        }
    }
}


`;

export const REMOVE_CUSTOMER_FROM_COMPANY = gql`
mutation RemoveCustomerFromCompany($companyId: Int!, $customerId: Int!) {
    removeCustomerFromCompany(companyId: $companyId, customerId: $customerId)
}`;