import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@primereact/ui/button";
import { DataTable } from "@primereact/ui/datatable";
import { CUSTOMER_ALL, DELETE_CUSTOMER } from "../../services/Apis/Customer";
import { GET_COMPANY_CUSTOMERS } from "../../services/Apis/Company";
import { useQuery, useMutation } from "@apollo/client/react";
import { Guard } from "../Layout/Guard";
import { useAuth } from "../Layout/ContextProvider";
type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type CompanyCustomer = {
  id: number;
  name: string;
  Customer: Customer;
};

type companyData = {
  company: {
    id: number;
    name: string;
    customerCompanies: CompanyCustomer[];
  };
};

export function Customer() {
  const { user, companyId } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.roles?.includes("Admin") ?? false;

  const {
    loading: allLoading,
    error: allError,
    data: allData,
  } = useQuery(CUSTOMER_ALL, {
    skip: !isAdmin,
  }) as {
    data: { customerAll: Customer[] };
    loading: boolean;
    error: any;
  };

  const {
    loading: companyLoading,
    error: companyError,
    data: companyData,
  } = useQuery(GET_COMPANY_CUSTOMERS, {
    variables: { id: companyId },
    skip: isAdmin || !companyId,
  }) as {
    data: companyData;
    loading: boolean;
    error: any;
  };

  let companyName = companyData?.company?.name;

  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);

  if (allLoading || companyLoading) return <p>Loading...</p>;
  if (allError || companyError)
    return <p>Error: {allError?.message || companyError?.message}</p>;

  const customers: Customer[] = isAdmin
    ? (allData?.customerAll ?? [])
    : (companyData?.company?.customerCompanies ?? []).map(
        (relation: CompanyCustomer) => relation.Customer,
      );

  async function handleDeleteCustomer(id: number) {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }

    try {
      await deleteCustomer({
        variables: { id },
        refetchQueries: isAdmin
          ? [{ query: CUSTOMER_ALL }]
          : [
              {
                query: GET_COMPANY_CUSTOMERS,
                variables: { id: companyId },
              },
            ],
        awaitRefetchQueries: true,
      });
    } catch (err) {
      console.error("Failed to delete customer:", err);
      window.alert("Failed to delete customer customer use in other records.");
    }
  }

  if (!isAdmin && !companyId) {
    return (
      <p>No company selected. Please select a company to view its customers.</p>
    );
  }

  return (
    <Guard
      requiredPermission={["customer:view"]}
      fallback={<p>You do not have permission to view this page.</p>}
    >
      <div className="p-4">
        <div className="flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold m-0">Customers</h2>

            <p className="text-color-secondary mt-2 mb-0">Manage customers</p>
          </div>

          <Guard requiredPermission={["customer:create"]}>
            <Button
              label="Add Customer"
              onClick={() => {
                isAdmin
                  ? navigate("/customer-add-edit")
                  : navigate("/customer-add-edit", {
                      state: {
                        companyId: companyId,
                        companyName: companyName,
                      },
                    });
              }}
            >
              Add Customer
            </Button>
          </Guard>
        </div>

        <div className="surface-card border-round shadow-2 p-3">
          <DataTable.Root data={customers}>
            <DataTable.TableContainer>
              <DataTable.Table>
                <DataTable.THead>
                  <DataTable.THeadRow>
                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>No.</DataTable.THeadTitle>
                    </DataTable.THeadCell>

                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Name</DataTable.THeadTitle>
                    </DataTable.THeadCell>

                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Email</DataTable.THeadTitle>
                    </DataTable.THeadCell>

                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Phone</DataTable.THeadTitle>
                    </DataTable.THeadCell>

                    <Guard
                      requiredPermission={[
                        "customer:update",
                        "customer:delete",
                      ]}
                    >
                      <DataTable.THeadCell>
                        <DataTable.THeadTitle>Actions</DataTable.THeadTitle>
                      </DataTable.THeadCell>
                    </Guard>
                  </DataTable.THeadRow>
                </DataTable.THead>

                <DataTable.TBody>
                  {({ item, index }: { item: Customer; index: number }) => (
                    <DataTable.Row key={item.id}>
                      <DataTable.Cell>{index + 1}</DataTable.Cell>

                      <DataTable.Cell>
                        <span className="font-medium">{item.name}</span>
                      </DataTable.Cell>

                      <DataTable.Cell>{item.email}</DataTable.Cell>

                      <DataTable.Cell>{item.phone}</DataTable.Cell>

                      <DataTable.Cell>
                        <div className="flex gap-2">
                          <Guard requiredPermission={["customer:update"]}>
                            <Button
                              severity="info"
                              size="small"
                              rounded
                              text
                              onClick={() =>
                                navigate("/customer-add-edit", {
                                  state: { customer: item },
                                })
                              }
                            >
                              Edit
                            </Button>
                          </Guard>

                          <Guard requiredPermission={["customer:delete"]}>
                            <Button
                              severity="danger"
                              size="small"
                              rounded
                              text
                              onClick={() => handleDeleteCustomer(item.id)}
                            >
                              Delete
                            </Button>
                          </Guard>
                        </div>
                      </DataTable.Cell>
                    </DataTable.Row>
                  )}
                </DataTable.TBody>
              </DataTable.Table>
            </DataTable.TableContainer>
          </DataTable.Root>
        </div>
      </div>
    </Guard>
  );
}
