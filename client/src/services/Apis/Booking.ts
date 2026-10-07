import { gql } from "@apollo/client";

export const ALL_BOOKINGS = gql`
  query Bookings {
    bookings {
      id
      check_in
      check_out
      created_by
      customer {
        id
        name
        email
      }
      accommodation {
        id
        name
        price_per_night
      }
      status {
        id
        name
      }
    }
  }
`;

export const CREATE_BOOKING = gql`
  mutation CreateBooking($createBookingInput: CreateBookingInput!) {
    createBooking(createBookingInput: $createBookingInput) {
      id
      check_in
      check_out
    }
  }
`;

export const UPDATE_BOOKING = gql`
  mutation UpdateBooking($updateBookingInput: UpdateBookingInput!) {
    updateBooking(updateBookingInput: $updateBookingInput) {
      id
      check_in
      check_out
    }
  }
`;

export const DELETE_BOOKING = gql`
  mutation RemoveBooking($id: Int!) {
    removeBooking(id: $id) {
      id
    }
  }
`;

export const ALL_BOOKING_STATUSES = gql`
  query BookingStatuses {
    bookingStatuses {
      id
      name
    }
  }
`;

