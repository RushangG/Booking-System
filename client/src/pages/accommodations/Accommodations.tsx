import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@primereact/ui/button";
import { DataTable } from "@primereact/ui/datatable";
import { InputText } from "primereact/inputtext";

import { useMutation, useQuery } from "@apollo/client/react";
import {
  ALL_ACCOMMODATIONS,
  DELETE_ACCOMMODATION,
} from "../../services/Apis/Accommodation";
import { Guard } from "../Layout/Guard";

type AccommodationType = {
  id: number;
  name: string;
};

type Location = {
  id: number;
  name: string;
  city: string;
  country: string;
};

type Accommodation = {
  id: number;
  name: string;
  description: string;
  price_per_night: number;
  type_id: AccommodationType;
  location_id: Location;
};

export function Accommodation() {
  const navigate = useNavigate();
  const [deleteAccommodation] = useMutation(DELETE_ACCOMMODATION);
  const [searchTerm, setSearchTerm] = useState("");

  const { error, data } = useQuery(ALL_ACCOMMODATIONS, {
    variables: {
      SearchLocation: searchTerm,
    },
  }) as {
    error: Error | undefined;
    data: { accommodations: Accommodation[] };
  };

  if (error) return <p>Error: {error.message}</p>;

  const accommodations: Accommodation[] = data?.accommodations;

  function handleDelete(id: number) {
    if (window.confirm("Are you sure you want to delete this accommodation?")) {
      deleteAccommodation({
        variables: { id },
        refetchQueries: [{ query: ALL_ACCOMMODATIONS }],
        awaitRefetchQueries: true,
      });
    }
  }

  return (
    <Guard
      requiredPermission={["accommodation:view"]}
      fallback={<p>You do not have permission to view this page.</p>}
    >
      <div className="p-4">
        <div className="flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold m-0">Accommodations</h2>
            <p className="text-color-secondary mt-2 mb-0">
              Manage accommodations
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="search" className="block font-medium mb-2">
              Search by Location
            </label>
            <InputText
              id="search"
              name="search"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Accommodation Location"
              className="w-full h-2rem border-1 border-round p-2"
              required
            />
          </div>

          <Guard requiredPermission={["accommodation:create"]}>
            <Button
              label="Add Accommodation"
              onClick={() => navigate("/accommodation-add-edit")}
            >
              Add
            </Button>
          </Guard>
        </div>

        <div className="surface-card border-round shadow-2 p-3">
          <DataTable.Root data={accommodations}>
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
                      <DataTable.THeadTitle>Type</DataTable.THeadTitle>
                    </DataTable.THeadCell>
                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Location</DataTable.THeadTitle>
                    </DataTable.THeadCell>
                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Price / Night</DataTable.THeadTitle>
                    </DataTable.THeadCell>

                    <Guard
                      requiredPermission={[
                        "accommodation:update",
                        "accommodation:delete",
                      ]}
                    >
                      <DataTable.THeadCell>
                        <DataTable.THeadTitle>Actions</DataTable.THeadTitle>
                      </DataTable.THeadCell>
                    </Guard>
                  </DataTable.THeadRow>
                </DataTable.THead>

                {data?.accommodations.length === 0 ? (
                  <DataTable.TBody>
                    <DataTable.Row>
                      <DataTable.Cell colSpan={6} className="text-center">
                        No accommodations found.
                      </DataTable.Cell>
                    </DataTable.Row>
                  </DataTable.TBody>
                ) : (
                  <DataTable.TBody>
                    {({
                      item,
                      index,
                    }: {
                      item: Accommodation;
                      index: number;
                    }) => (
                      <DataTable.Row key={item.id}>
                        <DataTable.Cell>{index + 1}</DataTable.Cell>
                        <DataTable.Cell>
                          <span className="font-medium">{item.name}</span>
                        </DataTable.Cell>
                        <DataTable.Cell>{item.type_id?.name}</DataTable.Cell>
                        <DataTable.Cell>
                          {item.location_id?.city}, {item.location_id?.country}
                        </DataTable.Cell>
                        <DataTable.Cell>${item.price_per_night}</DataTable.Cell>
                        <DataTable.Cell>
                          <div className="flex gap-2">
                            <Guard
                              requiredPermission={["accommodation:update"]}
                            >
                              <Button
                                severity="info"
                                size="small"
                                rounded
                                text
                                onClick={() =>
                                  navigate("/accommodation-add-edit", {
                                    state: { accommodation: item },
                                  })
                                }
                              >
                                Edit
                              </Button>
                            </Guard>

                            <Guard
                              requiredPermission={["accommodation:delete"]}
                            >
                              <Button
                                severity="danger"
                                size="small"
                                rounded
                                text
                                onClick={() => handleDelete(item.id)}
                              >
                                Delete
                              </Button>
                            </Guard>
                          </div>
                        </DataTable.Cell>
                      </DataTable.Row>
                    )}
                  </DataTable.TBody>
                )}
              </DataTable.Table>
            </DataTable.TableContainer>
          </DataTable.Root>
        </div>
      </div>
    </Guard>
  );
}
