import { useNavigate } from "react-router-dom";
import { Button } from "@primereact/ui/button";
import { DataTable } from "@primereact/ui/datatable";
import { useMutation, useQuery } from "@apollo/client/react";
import { AllCompany, DELETE_COMPANY } from "../../services/Apis/Company";

type Company = {
  id: number;
  name: string;
  address: string;
  industry: string;
};

export function Company() {
  const navigate = useNavigate();
  const [deleteCompany] = useMutation(DELETE_COMPANY);

  const { loading, error, data } = useQuery(AllCompany) as {
    loading: boolean;
    error: Error | undefined;
    data: { companies: Company[] };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("Company data:", data.companies);

  const companies: Company[] = data.companies.map((company: Company) => ({
    id: company.id,
    name: company.name,
    address: company.address,
    industry: company.industry,
  }));

  function handleDeleteCompany(id: number) {
    if (window.confirm("Are you sure you want to delete this company?")) {
      deleteCompany({
        variables: {
          id: id,
        },
        refetchQueries: [{ query: AllCompany }],
        awaitRefetchQueries: true,
      });
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold m-0">Companies</h2>

          <p className="text-color-secondary mt-2 mb-0">Manage companies</p>
        </div>

        <Button
          label="Add Company"
          onClick={() => navigate("/company-add-edit")}
        >
          Add
        </Button>
      </div>

      <div className="surface-card border-round shadow-2 p-3">
        <DataTable.Root data={companies}>
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
                    <DataTable.THeadTitle>Address</DataTable.THeadTitle>
                  </DataTable.THeadCell>

                  <DataTable.THeadCell>
                    <DataTable.THeadTitle>Industry</DataTable.THeadTitle>
                  </DataTable.THeadCell>

                  <DataTable.THeadCell>
                    <DataTable.THeadTitle>Actions</DataTable.THeadTitle>
                  </DataTable.THeadCell>
                </DataTable.THeadRow>
              </DataTable.THead>

              <DataTable.TBody>
                {({ item, index }: { item: Company; index: number }) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell>{index + 1}</DataTable.Cell>

                    <DataTable.Cell>
                      <span className="font-medium">{item.name}</span>
                    </DataTable.Cell>

                    <DataTable.Cell>{item.address}</DataTable.Cell>

                    <DataTable.Cell>{item.industry}</DataTable.Cell>

                    <DataTable.Cell>
                      <div className="flex gap-2">
                        <Button
                          severity="info"
                          size="small"
                          rounded
                          text
                          onClick={() =>
                            navigate("/company-add-edit/", {
                              state: { company: item },
                            })
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          severity="danger"
                          size="small"
                          rounded
                          text
                          onClick={() => handleDeleteCompany(item.id)}
                        >
                          Delete
                        </Button>

                        <Button
                          severity="success"
                          size="small"
                          rounded
                          onClick={() =>
                            navigate("/company-users", {
                              state: { companyId: item.id },
                            })
                          }
                        >
                          Company Users
                        </Button>

                        <Button
                          severity="warning"
                          size="small"
                          rounded
                          onClick={() =>
                            navigate("/assign-customer-to-company", {
                              state: { companyId: item.id },
                            })
                          }
                        >
                          Assign Customer
                        </Button>

                        <Button
                          severity="warning"
                          size="small"
                          rounded
                          onClick={() =>
                            navigate("/customer-add-edit", {
                              state: {
                                companyId: item.id,
                                companyName: item.name,
                              },
                            })
                          }
                        >
                          Add Customer
                        </Button>
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
  );
}
