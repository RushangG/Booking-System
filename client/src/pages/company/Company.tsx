import { useNavigate } from "react-router-dom";
import { Button } from "@primereact/ui/button";
import { DataTable } from "@primereact/ui/datatable";
import { useQuery } from "@apollo/client/react";
import { AllCompany } from "../../services/Apis/Company";

type Company = {
  id: number;
  name: string;
  address: string;
  industry: string;
};

export function Company() {
  const navigate = useNavigate();
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
                    <DataTable.THeadTitle>id</DataTable.THeadTitle>
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
                {({ item }: { item: Company }) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell>{item.id}</DataTable.Cell>

                    <DataTable.Cell>
                      <span className="font-medium">{item.name}</span>
                    </DataTable.Cell>

                    <DataTable.Cell>{item.address}</DataTable.Cell>

                    <DataTable.Cell>{item.industry}</DataTable.Cell>

                    <DataTable.Cell>
                      <div className="flex gap-2">
                        <Button severity="info" size="small" rounded text>
                          Edit
                        </Button>

                        <Button severity="danger" size="small" rounded text>
                          Delete
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
