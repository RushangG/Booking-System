import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  CREATE_BOOKING,
  UPDATE_BOOKING,
  ALL_BOOKINGS,
  ALL_BOOKING_STATUSES,
} from "../../services/Apis/Booking";
import { CUSTOMER_ALL } from "../../services/Apis/Customer";
import { ALL_ACCOMMODATIONS } from "../../services/Apis/Accommodation";
import { useAuth } from "../../pages/Layout/ContextProvider";
import { Guard } from "../Layout/Guard";
type Customer = { id: number; name: string; email: string };
type Accommodation = { id: number; name: string };
type BookingStatus = { id: number; name: string };

function formatDateForInput(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return !isNaN(d.getTime()) ? d.toISOString().split("T")[0] : "";
}

export function BookingAddEdit() {
  const { companyId } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;
  console.log("company data:", companyId, booking);

  const [formData, setFormData] = useState({
    customer_id: "",
    accommodation_id: "",
    status_id: "",
    check_in: "",
    check_out: "",
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        customer_id: String(booking.customer?.id ?? ""),
        accommodation_id: String(booking.accommodation?.id ?? ""),
        status_id: String(booking.status?.id ?? ""),
        check_in: formatDateForInput(booking.check_in),
        check_out: formatDateForInput(booking.check_out),
      });
    }
  }, [booking]);

  const { data: customersData } = useQuery(CUSTOMER_ALL) as {
    data: { customerAll: Customer[] };
  };

  const { data: accommodationsData } = useQuery(ALL_ACCOMMODATIONS) as {
    data: { accommodations: Accommodation[] };
  };

  const { data: statusesData } = useQuery(ALL_BOOKING_STATUSES) as {
    data: { bookingStatuses: BookingStatus[] };
  };

  const [createBooking] = useMutation(CREATE_BOOKING);
  const [updateBooking] = useMutation(UPDATE_BOOKING);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = {
      customer_id: parseInt(formData.customer_id),
      accommodation_id: parseInt(formData.accommodation_id),
      status_id: parseInt(formData.status_id),
      check_in: new Date(formData.check_in),
      check_out: new Date(formData.check_out),
    };

    if (input.check_in > input.check_out) {
      alert("Check-in date cannot be later than check-out date.");
      return;
    }

    if (booking) {
      const res = await updateBooking({
        variables: {
          updateBookingInput: {
            id: booking.id,
            ...input,
          },
        },
        refetchQueries: [{ query: ALL_BOOKINGS }],
      });
      if (res.data) {
        alert("Booking updated successfully!");
        navigate("/booking");
      }
      return;
    }

    const res = await createBooking({
      variables: {
        createBookingInput: input,
      },
      refetchQueries: [{ query: ALL_BOOKINGS }],
    });
    if (res.data) {
      alert("Booking created successfully!");
      navigate("/booking");
    }
  };

  return (
    <Guard requiredPermission={["booking:create", "booking:update"]}>
      <div className="flex justify-content-center align-items-center min-h-screen surface-ground p-3">
        <div className="surface-card border-round shadow-2 p-5 w-full md:w-6 lg:w-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold m-0">
              {booking ? "Update Booking" : "Create Booking"}
            </h2>
            <p className="text-color-secondary mt-2">
              {booking
                ? "Update booking details"
                : "Fill in details to create a new booking"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="customer_id" className="block font-medium mb-2">
                Customer
              </label>
              <select
                id="customer_id"
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
                className="w-full h-2rem border-1 border-round p-2"
                required
              >
                <option value="">Select Customer</option>
                {customersData?.customerAll?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="accommodation_id"
                className="block font-medium mb-2"
              >
                Accommodation
              </label>
              <select
                id="accommodation_id"
                name="accommodation_id"
                value={formData.accommodation_id}
                onChange={handleChange}
                className="w-full h-2rem border-1 border-round p-2"
                required
              >
                <option value="">Select Accommodation</option>
                {accommodationsData?.accommodations?.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="status_id" className="block font-medium mb-2">
                Booking Status
              </label>
              <select
                id="status_id"
                name="status_id"
                value={formData.status_id}
                onChange={handleChange}
                className="w-full h-2rem border-1 border-round p-2"
                required
              >
                <option value="">Select Status</option>
                {statusesData?.bookingStatuses?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="check_in" className="block font-medium mb-2">
                Check In
              </label>
              <InputText
                id="check_in"
                name="check_in"
                type="date"
                value={formData.check_in}
                onChange={handleChange}
                className="w-full h-2rem border-1 border-round p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="check_out" className="block font-medium mb-2">
                Check Out
              </label>
              <InputText
                id="check_out"
                name="check_out"
                type="date"
                value={formData.check_out}
                onChange={handleChange}
                className="w-full h-2rem border-1 border-round p-2"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-2rem border-1 border-round p-2"
            >
              {booking ? "Update" : "Create"}
            </Button>
          </form>
        </div>
      </div>
    </Guard>
  );
}
