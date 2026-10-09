import { gql } from "@apollo/client";
export const ALL_ROLES = gql`
  query Roles {
    roles {
      id
      name
      description
    }
  }
`;

export const ROLE_BY_ID = gql`
  query User($id: Int!) {
    user(id: $id) {
      usersHasRoles {
        Role {
          id
          name
          description
        }
      }
    }
  }
`;

export const ASSIGN_ROLES_TO_USER = gql`
  mutation AssignRolesToUser($userId: Int!, $roleIds: String!) {
    assignRolesToUser(userId: $userId, roleIds: $roleIds) {
      id
    }
  }
`;
