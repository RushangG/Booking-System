import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@primereact/ui/button";
import { Check } from "@primeicons/react/check";
import { ChevronDown } from "@primeicons/react/chevron-down";
import { Times } from "@primeicons/react/times";
import { Select, type SelectValueChangeEvent } from "@primereact/ui/select";
import { DataTable } from "@primereact/ui/datatable";
import { useQuery } from "@apollo/client/react";
import { GET_COMPANY_USERS } from "../../services/Apis/Company.ts";
import { USER_ALL } from "../../services/Apis/Users.ts";

interface Iuser {
  id: number;
  createdAt: string;
  name: string;
  email: string;
}

export function CompanyUsers() {
  const navigate = useNavigate();
  const location = useLocation();
  const companyId = location.state?.companyId;

  const [selected, setSelected] = useState<string[]>([]);


  const toppings = [
    { label: "Pepperoni", value: "pepperoni" },
    { label: "Mushrooms", value: "mushrooms" },
    { label: "Onions", value: "onions" },
    { label: "Black Olives", value: "olives" },
    { label: "Green Peppers", value: "peppers" },
    { label: "Mozzarella", value: "mozzarella" },
    { label: "Basil", value: "basil" },
    { label: "Tomatoes", value: "tomatoes" },
  ];

  if (!companyId) {
    return <p>Company ID not found</p>;
  }

  const { loading, error, data } = useQuery(GET_COMPANY_USERS, {
    variables: {
      id: companyId,
    },
  }) as {
    loading: boolean;
    error: Error | undefined;
    data: {
      company: {
        id: number;
        name: string;
        companiesHasUsers: {
          user: Iuser;
        }[];
      };
    };
  };

   
  if (loading) return <p>Loading...</p>;

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log(
    "Users data:",
    data.company.companiesHasUsers.map((c: any) => c.user),
  );

  const users: Iuser[] = data.company.companiesHasUsers.map((c: any) => c.user);

  const getLabel = () => {
    const first =
      toppings.find((t) => t.value === selected[0])?.label ?? selected[0];
    return selected.length > 1
      ? `${first} (+${selected.length - 1} more)`
      : first;
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold m-0">
              Manage Users for Company: {data.company.name}
            </h2>

            <p className="text-color-secondary mt-2 mb-0">
              Assign and manage users associated with this company
            </p>
          </div>

          <Button label="Add User" onClick={() => navigate("/user-add-edit")}>
            Add
          </Button>
        </div>

        <div className="surface-card border-round shadow-2 p-3">
          <DataTable.Root data={users}>
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
                      <DataTable.THeadTitle>Created At</DataTable.THeadTitle>
                    </DataTable.THeadCell>

                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Actions</DataTable.THeadTitle>
                    </DataTable.THeadCell>
                  </DataTable.THeadRow>
                </DataTable.THead>

                <DataTable.TBody>
                  {({ item, index }: { item: Iuser; index: number }) => (
                    <DataTable.Row key={item.id}>
                      <DataTable.Cell>{index + 1}</DataTable.Cell>

                      <DataTable.Cell>
                        <span className="font-medium">{item.name}</span>
                      </DataTable.Cell>

                      <DataTable.Cell>{item.email}</DataTable.Cell>

                      <DataTable.Cell>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </DataTable.Cell>

                      <DataTable.Cell>
                        <div className="flex gap-2">
                          <Button
                            severity="info"
                            size="small"
                            rounded
                            text
                            onClick={() =>
                              navigate("/user-add-edit", {
                                state: {
                                  user: item,
                                },
                              })
                            }
                          >
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

        <div className="flex justify-center mt-4">
          <Select.Root
            value={selected}
            onValueChange={(e: SelectValueChangeEvent) =>
              setSelected(e.value as string[])
            }
            options={toppings}
            optionLabel="label"
            optionValue="value"
            multiple
            className="w-full md:w-56"
          >
            <Select.Trigger>
              <Select.Value placeholder="Select toppings">
                {getLabel()}
              </Select.Value>
              {selected.length > 0 && (
                <Select.Clear>
                  <Times />
                </Select.Clear>
              )}
              <Select.Indicator>
                <ChevronDown />
              </Select.Indicator>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.List>
                    {toppings.map((topping, index) => (
                      <Select.Option
                        key={topping.value}
                        index={index}
                        uKey={topping.value}
                        className="gap-2"
                      >
                        <Select.OptionIndicator className="data-unselected:invisible">
                          <Check />
                        </Select.OptionIndicator>
                        {topping.label}
                      </Select.Option>
                    ))}
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
    </>
  );
}
