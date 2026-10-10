import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@primereact/ui/button";
import { DataTable } from "@primereact/ui/datatable";
import { useMutation, useQuery } from "@apollo/client/react";
import { ALL_BOOKINGS, DELETE_BOOKING } from "../../services/Apis/Booking";
import { Guard } from "../Layout/Guard";
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
  const [selectedStatus, setSelectedStatus] = useState("");

  const [deleteBooking] = useMutation(DELETE_BOOKING);

  const { error, data, refetch } = useQuery(ALL_BOOKINGS, {
    variables: {
      status: selectedStatus === "" ? null : Number(selectedStatus),
    },
    fetchPolicy: "network-only",
  }) as {
    error: Error | undefined;
    data: { bookings: Booking[] } | undefined;
    refetch: (variables?: { status: number | null }) => Promise<unknown>;
  };

  const bookings = data?.bookings ?? [];

  async function handleStatusChange(value: string) {
    setSelectedStatus(value);

    await refetch({
      status: value === "" ? null : Number(value),
    });
  }

  async function handleDelete(id: number) {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteBooking({
          variables: { id },
          refetchQueries: [
            {
              query: ALL_BOOKINGS,
              variables: {
                status: selectedStatus === "" ? null : Number(selectedStatus),
              },
            },
          ],
          awaitRefetchQueries: true,
        });
      } catch (err) {
        console.error("Failed to delete booking:", err);
        alert("Failed to delete booking.");
      }
    }
  }

  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <Guard
      requiredPermission={["booking:view"]}
      fallback={<p>You do not have permission to view this page.</p>}
    >
      <div className="p-4">
        <div className="flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold m-0">Bookings</h2>
            <p className="text-color-secondary mt-2 mb-0">Manage bookings</p>
          </div>

          <Guard requiredPermission={["booking:create"]}>
            <Button onClick={() => navigate("/booking-add-edit")}>
              Add Booking
            </Button>
          </Guard>
        </div>

        <div className="surface-card border-round shadow-2 p-3">
          <div className="flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <h3 className="m-0">All Bookings</h3>

            <div className="flex align-items-center gap-2">
              <label htmlFor="bookingStatus" className="font-medium">
                Filter by Status
              </label>

              <select
                id="bookingStatus"
                value={selectedStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="p-2 border-1 border-round surface-card"
              >
                <option value="">All Statuses</option>
                <option value="1">Pending</option>
                <option value="2">Confirmed</option>
                <option value="3">Cancelled</option>
              </select>
            </div>
          </div>

          <DataTable.Root data={bookings}>
            <DataTable.TableContainer>
              <DataTable.Table>
                <DataTable.THead>
                  <DataTable.THeadRow>
                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>No.</DataTable.THeadTitle>
                    </DataTable.THeadCell>
                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Customer</DataTable.THeadTitle>
                    </DataTable.THeadCell>
                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Accommodation</DataTable.THeadTitle>
                    </DataTable.THeadCell>
                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Check In</DataTable.THeadTitle>
                    </DataTable.THeadCell>
                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Check Out</DataTable.THeadTitle>
                    </DataTable.THeadCell>
                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Status</DataTable.THeadTitle>
                    </DataTable.THeadCell>

                    <Guard
                      requiredPermission={["booking:update", "booking:delete"]}
                    >
                      <DataTable.THeadCell>
                        <DataTable.THeadTitle>Actions</DataTable.THeadTitle>
                      </DataTable.THeadCell>
                    </Guard>
                  </DataTable.THeadRow>
                </DataTable.THead>

                <DataTable.TBody>
                  {({ item, index }: { item: Booking; index: number }) => (
                    <DataTable.Row key={item.id}>
                      <DataTable.Cell>{index + 1}</DataTable.Cell>
                      <DataTable.Cell>
                        {item.customer?.name ?? "N/A"}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        {item.accommodation?.name ?? "N/A"}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        {item.check_in
                          ? new Date(item.check_in).toLocaleDateString()
                          : "N/A"}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        {item.check_out
                          ? new Date(item.check_out).toLocaleDateString()
                          : "N/A"}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        {item.status?.name ?? "N/A"}
                      </DataTable.Cell>
                      <DataTable.Cell>

                        <div className="flex gap-2">

                          <Guard requiredPermission={["booking:update"]}>
                          <Button
                            severity="info"
                            size="small"
                            rounded
                            text
                            onClick={() =>
                              navigate("/booking-add-edit", {
                                state: { booking: item },
                              })
                            }
                          >
                            Edit
                          </Button>
                          </Guard>

                          <Guard requiredPermission={["booking:delete"]}>
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
              </DataTable.Table>
            </DataTable.TableContainer>
          </DataTable.Root>
        </div>
      </div>
    </Guard>
  );
}
