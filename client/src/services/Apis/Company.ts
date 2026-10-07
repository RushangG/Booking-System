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
  mutation CreateCompany($name: String!, $address: String!, $industry: String!) {
    createCompany(
      createCompanyInput: { name: $name, address: $address, industry: $industry }
    ) {
      id
      name
      address
      industry
    }
}`;



export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($id: Int!, $name: String!, $address: String!, $industry: String!) {
    updateCompany(
      updateCompanyInput: { id: $id, name: $name, address: $address, industry: $industry }
    ) {
      id
      name
      address
      industry
    }
}`;

export const DELETE_COMPANY = gql`
  mutation RemoveCompany($id: Int!) {
    removeCompany(id: $id) 
}`;
