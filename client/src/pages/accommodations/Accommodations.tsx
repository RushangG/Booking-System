import { useNavigate } from "react-router-dom";
import { Button } from "@primereact/ui/button";
import { DataTable } from "@primereact/ui/datatable";
import { useMutation, useQuery } from "@apollo/client/react";
import { ALL_ACCOMMODATIONS, DELETE_ACCOMMODATION } from "../../services/Apis/Accommodation";

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

  const { loading, error, data } = useQuery(ALL_ACCOMMODATIONS) as {
    loading: boolean;
    error: Error | undefined;
    data: { accommodations: Accommodation[] };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const accommodations: Accommodation[] = data.accommodations;

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
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold m-0">Accommodations</h2>
          <p className="text-color-secondary mt-2 mb-0">Manage accommodations</p>
        </div>
        <Button label="Add Accommodation" onClick={() => navigate("/accommodation-add-edit")}>
          Add
        </Button>
      </div>

      <div className="surface-card border-round shadow-2 p-3">
        <DataTable.Root data={accommodations}>
          <DataTable.TableContainer>
            <DataTable.Table>
              <DataTable.THead>
                <DataTable.THeadRow>
                  <DataTable.THeadCell><DataTable.THeadTitle>No.</DataTable.THeadTitle></DataTable.THeadCell>
                  <DataTable.THeadCell><DataTable.THeadTitle>Name</DataTable.THeadTitle></DataTable.THeadCell>
                  <DataTable.THeadCell><DataTable.THeadTitle>Type</DataTable.THeadTitle></DataTable.THeadCell>
                  <DataTable.THeadCell><DataTable.THeadTitle>Location</DataTable.THeadTitle></DataTable.THeadCell>
                  <DataTable.THeadCell><DataTable.THeadTitle>Price / Night</DataTable.THeadTitle></DataTable.THeadCell>
                  <DataTable.THeadCell><DataTable.THeadTitle>Actions</DataTable.THeadTitle></DataTable.THeadCell>
                </DataTable.THeadRow>
              </DataTable.THead>

              <DataTable.TBody>
                {({ item, index }: { item: Accommodation; index: number }) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell>{index + 1}</DataTable.Cell>
                    <DataTable.Cell><span className="font-medium">{item.name}</span></DataTable.Cell>
                    <DataTable.Cell>{item.type_id?.name}</DataTable.Cell>
                    <DataTable.Cell>{item.location_id?.city}, {item.location_id?.country}</DataTable.Cell>
                    <DataTable.Cell>${item.price_per_night}</DataTable.Cell>
                    <DataTable.Cell>
                      <div className="flex gap-2">
                        <Button
                          severity="info"
                          size="small"
                          rounded
                          text
                          onClick={() => navigate("/accommodation-add-edit", { state: { accommodation: item } })}
                        >
                          Edit
                        </Button>
                        <Button
                          severity="danger"
                          size="small"
                          rounded
                          text
                          onClick={() => handleDelete(item.id)}
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
      </div>
    </div>
  );
}
