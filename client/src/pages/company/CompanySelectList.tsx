import { useNavigate } from "react-router-dom";
import { Button } from "@primereact/ui/button";
import { DataTable } from "@primereact/ui/datatable";
import { useQuery } from "@apollo/client/react";
import { USER_COMPANIES } from "../../services/Apis/Users.ts";
import { useAuth } from "../Layout/ContextProvider.tsx";
import { SignOut } from "@primeicons/react/sign-out";
interface Icompanies {
  id: number;
  name: string;
  address: string;
  industry: string;
}
interface IuserCompany {
  company: {
    id: number;
    name: string;
    address: string;
    industry: string;
  };
}

export function CompanySelectList() {
  const { user, logout, setCompany } = useAuth();

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(USER_COMPANIES, {
    variables: { id: user?.sub },
  }) as {
    loading: boolean;
    error: Error | undefined;
    data: { user: { companiesHasUsers: IuserCompany[] } };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let isAdmin = user?.roles?.includes("Admin") ?? false;


  const companies = data.user.companiesHasUsers
    .map((c: IuserCompany) => c.company)
    .map((company) => ({
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
          severity="danger"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <SignOut />
          Sign out
        </Button>
      </div>

      {companies.length === 0 ? (
        <div className="surface-card border-round shadow-2 p-3">
          <p>No companies available. Please Contact your administrator.</p>
        </div>
      ) : (
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
                  {({ item, index }: { item: Icompanies; index: number }) => (
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
                            onClick={() => {
                              setCompany(item.id);

                              if (isAdmin) {
                                navigate("/users");
                              } else {
                                navigate("/customer", {
                                  state: { companyId: item.id },
                                });
                              }
                            }}
                          >
                            select
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
      )}
    </div>
  );
}
