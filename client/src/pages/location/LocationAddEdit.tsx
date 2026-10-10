
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useLocation as useRouterLocation } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useMutation } from "@apollo/client/react";
import {
  CREATE_LOCATION,
  UPDATE_LOCATION,
  AllLocations,
} from "../../services/Apis/Locations";
import { Guard } from "../Layout/Guard";

type LocationItem = {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  address: string;
  createdAt: string;
};

type LocationFormData = {
  name: string;
  city: string;
  state: string;
  country: string;
  address: string;
};

const initialFormData: LocationFormData = {
  name: "",
  city: "",
  state: "",
  country: "",
  address: "",
};

export function LocationAddEdit() {
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();

  const updatedLocation = routerLocation.state?.location as
    | LocationItem
    | undefined;

  const [formData, setFormData] =
    useState<LocationFormData>(initialFormData);

  const [createLocation, { loading: creating }] =
    useMutation(CREATE_LOCATION);

  const [updateLocation, { loading: updating }] =
    useMutation(UPDATE_LOCATION);

  const submitting = creating || updating;

  useEffect(() => {
    if (updatedLocation) {
      setFormData({
        name: updatedLocation.name ?? "",
        city: updatedLocation.city ?? "",
        state: updatedLocation.state ?? "",
        country: updatedLocation.country ?? "",
        address: updatedLocation.address ?? "",
      });
    }
  }, [updatedLocation]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (updatedLocation) {
        await updateLocation({
          variables: {
            id: updatedLocation.id,
            name: formData.name,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            address: formData.address,
          },
          refetchQueries: [{ query: AllLocations }],
          awaitRefetchQueries: true,
        });

        alert("Location updated successfully!");
      } else {
        await createLocation({
          variables: {
            name: formData.name,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            address: formData.address,
          },
          refetchQueries: [{ query: AllLocations }],
          awaitRefetchQueries: true,
        });

        alert("Location created successfully!");
      }

      navigate("/location");
    } catch (err) {
      console.error("Location save failed:", err);

      alert(
        err instanceof Error
          ? err.message
          : "Failed to save location."
      );
    }
  }

  return (
    <Guard requiredPermission={["location:create", "location:update"]}>
    <div className="flex justify-content-center align-items-center min-h-screen surface-ground p-3">
      <div className="surface-card border-round shadow-2 p-5 w-full md:w-6 lg:w-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold m-0">
            {updatedLocation ? "Update Location" : "Create Location"}
          </h2>

          <p className="text-color-secondary mt-2">
            {updatedLocation
              ? "Update location details"
              : "Enter the details for a new location"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Location Name
            </label>
            <InputText
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter location name"
              className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block font-medium mb-2">
              City
            </label>
            <InputText
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
            className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"

              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="state" className="block font-medium mb-2">
              State
            </label>
            <InputText
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
                className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block font-medium mb-2">
              Country
            </label>
            <InputText
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
              className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block font-medium mb-2">
              Address
            </label>
            <InputText
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
            className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
              required
            />
          </div>

          <div className="flex gap-2">
           

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
            >
              {submitting
                ? "Saving..."
                : updatedLocation
                  ? "Update"
                  : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
    </Guard>
  );
}
