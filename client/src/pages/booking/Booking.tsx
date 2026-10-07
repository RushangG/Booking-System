import { useNavigate } from "react-router-dom";
import { Button } from "@primereact/ui/button";
import { DataTable } from "@primereact/ui/datatable";
import { useMutation, useQuery } from "@apollo/client/react";
import { ALL_BOOKINGS, DELETE_BOOKING } from "../../services/Apis/Booking";

type Customer = {
  id: number;
  name: string;
  email: string;
};

type Accommodation = {
  id: number;
  name: string;
  price_per_night: number;
};

type BookingStatus = {
  id: number;
  name: string;
};

type Booking = {
  id: number;
  check_in: string;
  check_out: string;
  created_by: number;
  customer?: Customer;
  accommodation?: Accommodation;
  status?: BookingStatus;
};

export function Booking() {
  const navigate = useNavigate();
  const [deleteBooking] = useMutation(DELETE_BOOKING);

  const { loading, error, data } = useQuery(ALL_BOOKINGS) as {
    loading: boolean;
    error: Error | undefined;
    data: { bookings: Booking[] };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const bookings: Booking[] = data.bookings;

  function handleDelete(id: number) {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      deleteBooking({
        variables: { id },
        refetchQueries: [{ query: ALL_BOOKINGS }],
        awaitRefetchQueries: true,
      });
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold m-0">Bookings</h2>
          <p className="text-color-secondary mt-2 mb-0">Manage bookings</p>
        </div>
        <Button label="Add Booking" onClick={() => navigate("/booking-add-edit")}>
          Add
        </Button>
      </div>

      <div className="surface-card border-round shadow-2 p-3">
        <DataTable.Root data={bookings}>
          <DataTable.TableContainer>
            <DataTable.Table>
              <DataTable.THead>
                <DataTable.THeadRow>
                  <DataTable.THeadCell><DataTable.THeadTitle>No.</DataTable.THeadTitle></DataTable.THeadCell>
                  <DataTable.THeadCell><DataTable.THeadTitle>Customer</DataTable.THeadTitle></DataTable.THeadCell>
                  <DataTable.THeadCell><DataTable.THeadTitle>Accommodation</DataTable.THeadTitle></DataTable.THeadCell>
                  <DataTable.THeadCell><DataTable.THeadTitle>Check In</DataTable.THeadTitle></DataTable.THeadCell>
                  <DataTable.THeadCell><DataTable.THeadTitle>Check Out</DataTable.THeadTitle></DataTable.THeadCell>
                  <DataTable.THeadCell><DataTable.THeadTitle>Status</DataTable.THeadTitle></DataTable.THeadCell>
                  <DataTable.THeadCell><DataTable.THeadTitle>Actions</DataTable.THeadTitle></DataTable.THeadCell>
                </DataTable.THeadRow>
              </DataTable.THead>

              <DataTable.TBody>
                {({ item, index }: { item: Booking; index: number }) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell>{index + 1}</DataTable.Cell>
                    <DataTable.Cell>
                      <span className="font-medium">{item.customer?.name ?? "N/A"}</span>
                    </DataTable.Cell>
                    <DataTable.Cell>{item.accommodation?.name ?? "N/A"}</DataTable.Cell>
                    <DataTable.Cell>{item.check_in ? new Date(item.check_in).toLocaleDateString() : ""}</DataTable.Cell>
                    <DataTable.Cell>{item.check_out ? new Date(item.check_out).toLocaleDateString() : ""}</DataTable.Cell>
                    <DataTable.Cell>{item.status?.name ?? "N/A"}</DataTable.Cell>
                    <DataTable.Cell>
                      <div className="flex gap-2">
                        <Button
                          severity="info"
                          size="small"
                          rounded
                          text
                          onClick={() => navigate("/booking-add-edit", { state: { booking: item } })}
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
