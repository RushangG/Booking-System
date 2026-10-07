import { gql } from "@apollo/client";

export const AuthLogin = gql`
  mutation Login($email: String!, $password: String!) {
    login(authLoginInput: { email: $email, password: $password }) {
      accessToken
      refreshToken
    }
  }
`;

export const AuthRegister = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(
      authRegisterInput: { name: $name, email: $email, password: $password }
    )
  }
`;
