
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client/react";
import { Button } from "@primereact/ui/button";
import { DataTable } from "@primereact/ui/datatable";
import {
  AllLocations,
  DELETE_LOCATION,
} from "../../services/Apis/Locations";

type LocationItem = {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  address: string;
  createdAt: string;
};

export function Location() {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(AllLocations) as {
    loading: boolean;
    error: Error | undefined;
    data: { locations: LocationItem[] } | undefined;
  };

  const [deleteLocation, { loading: deleting }] =
    useMutation(DELETE_LOCATION);

  const locations = data?.locations ?? [];

  async function handleDeleteLocation(id: number) {
    if (
      !window.confirm("Are you sure you want to delete this location?")
    ) {
      return;
    }

    try {
      await deleteLocation({
        variables: { id },
        refetchQueries: [{ query: AllLocations }],
        awaitRefetchQueries: true,
      });

    
    } catch (err) {
      console.error("Location delete failed:", err);
      alert(
        err instanceof Error
          ? err.message
          : "Failed to delete location."
      );
    }
  }

  if (loading) return <p className="p-4">Loading locations...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold m-0">Locations</h2>
          <p className="text-color-secondary mt-2 mb-0">
            Manage accommodation locations
          </p>
        </div>

        <Button
          onClick={() => navigate("/location-add-edit")}
        >
          Add Location
        </Button>
      </div>

      <div className="surface-card border-round shadow-2 p-3">
        <div className="flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">All Locations</h3>
          <span className="text-color-secondary">
            {locations.length} locations
          </span>
        </div>

        {locations.length === 0 ? (
          <p className="text-color-secondary">
            No locations found. Add your first location.
          </p>
        ) : (
          <DataTable.Root data={locations}>
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
                      <DataTable.THeadTitle>City</DataTable.THeadTitle>
                    </DataTable.THeadCell>
                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>State</DataTable.THeadTitle>
                    </DataTable.THeadCell>
                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Country</DataTable.THeadTitle>
                    </DataTable.THeadCell>
                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Address</DataTable.THeadTitle>
                    </DataTable.THeadCell>
                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Actions</DataTable.THeadTitle>
                    </DataTable.THeadCell>
                  </DataTable.THeadRow>
                </DataTable.THead>

                <DataTable.TBody>
                  {({ item, index }: {
                    item: LocationItem;
                    index: number;
                  }) => (
                    <DataTable.Row key={item.id}>
                      <DataTable.Cell>{index + 1}</DataTable.Cell>
                      <DataTable.Cell>{item.name}</DataTable.Cell>
                      <DataTable.Cell>{item.city}</DataTable.Cell>
                      <DataTable.Cell>{item.state}</DataTable.Cell>
                      <DataTable.Cell>{item.country}</DataTable.Cell>
                      <DataTable.Cell>{item.address}</DataTable.Cell>
                      <DataTable.Cell>
                        <div className="flex gap-2">
                          <Button
                            severity="info"
                            size="small"
                            rounded
                            text
                            onClick={() =>
                              navigate("/location-add-edit", {
                                state: { location: item },
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
                            disabled={deleting}
                            onClick={() => handleDeleteLocation(item.id)}
                          >
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
        )}
      </div>
    </div>
  );
}
