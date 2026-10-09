import { gql } from "@apollo/client";
export const ALL_PERMISSIONS = gql`
  query allPermissions {
    permissions {
      id
      permission_type
    }
  }
`;

export const PERMISSION_BY_ROLE_ID = gql`
  query permissionsByRoleId($id: Int!) {
    role(id: $id) {
      name
      id
      rolesHasPermissions {
        Permission {
          permission_type
          id
        }
      }
    }
  }
`;

export const ASSIGN_PERMISSIONS_TO_ROLE = gql`
  mutation AssignPermissionsToRole($roleId: Int!, $permissionIds: String!) {
    assignPermissionsToRole(roleId: $roleId, permissionIds: $permissionIds) {
      id
      Role {
        id
        name
        description
      }
      Permission {
        id
        permission_type
      }
    }
  }
`;
