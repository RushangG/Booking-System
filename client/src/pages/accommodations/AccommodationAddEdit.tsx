import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  CREATE_ACCOMMODATION,
  UPDATE_ACCOMMODATION,
  ALL_ACCOMMODATION_TYPES,
  ALL_LOCATIONS,
  ALL_ACCOMMODATIONS,
} from "../../services/Apis/Accommodation";
import { Guard } from "../Layout/Guard";
type AccommodationType = { id: number; name: string };
type LocationOption = {
  id: number;
  name: string;
  city: string;
  country: string;
};

export function AccommodationAddEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const accommodation = location.state?.accommodation;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price_per_night: "",
    type_id: "",
    location_id: "",
  });

  useEffect(() => {
    if (accommodation) {
      setFormData({
        name: accommodation.name,
        description: accommodation.description,
        price_per_night: String(accommodation.price_per_night),
        type_id: String(accommodation.type_id?.id ?? ""),
        location_id: String(accommodation.location_id?.id ?? ""),
      });
    }
  }, [accommodation]);

  const { data: typesData } = useQuery(ALL_ACCOMMODATION_TYPES) as {
    data: { accommodationTypes: AccommodationType[] };
  };

  const { data: locationsData } = useQuery(ALL_LOCATIONS) as {
    data: { locations: LocationOption[] };
  };

  const [createAccommodation] = useMutation(CREATE_ACCOMMODATION);
  const [updateAccommodation] = useMutation(UPDATE_ACCOMMODATION);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = {
      name: formData.name,
      description: formData.description,
      price_per_night: parseFloat(formData.price_per_night),
      type_id: parseInt(formData.type_id),
      location_id: parseInt(formData.location_id),
    };

    if (accommodation) {
      const res = await updateAccommodation({
        variables: {
          updateAccommodationInput: { id: accommodation.id, ...input },
        },
        refetchQueries: [{ query: ALL_ACCOMMODATIONS }],
      });
      if (res.data) {
        alert("Accommodation updated!");
        navigate("/accommodation");
      }
      return;
    }

    const res = await createAccommodation({
      variables: { createAccommodationInput: input },
      refetchQueries: [{ query: ALL_ACCOMMODATIONS }],
    });
    if (res.data) {
      alert("Accommodation created!");
      navigate("/accommodation");
    }
  };

  return (
    <Guard
      requiredPermission={["accommodation:create", "accommodation:update"]}
    >
      <div className="flex justify-content-center align-items-center min-h-screen surface-ground p-3">
        <div className="surface-card border-round shadow-2 p-5 w-full md:w-6 lg:w-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold m-0">
              {accommodation ? "Update Accommodation" : "Create Accommodation"}
            </h2>
            <p className="text-color-secondary mt-2">
              {accommodation
                ? "Update accommodation details"
                : "Fill in details to create a new accommodation"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-2">
                Name
              </label>
              <InputText
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Accommodation name"
                className="w-full h-2rem border-1 border-round p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-2">
                Description
              </label>
              <InputText
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full h-2rem border-1 border-round p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price_per_night"
                className="block font-medium mb-2"
              >
                Price Per Night
              </label>
              <InputText
                id="price_per_night"
                name="price_per_night"
                type="number"
                value={formData.price_per_night}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full h-2rem border-1 border-round p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="type_id" className="block font-medium mb-2">
                Accommodation Type
              </label>
              <select
                id="type_id"
                name="type_id"
                value={formData.type_id}
                onChange={handleChange}
                className="w-full h-2rem border-1 border-round p-2"
                required
              >
                <option value="">Select type</option>
                {typesData?.accommodationTypes?.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="location_id" className="block font-medium mb-2">
                Location
              </label>
              <select
                id="location_id"
                name="location_id"
                value={formData.location_id}
                onChange={handleChange}
                className="w-full h-2rem border-1 border-round p-2"
                required
              >
                <option value="">Select location</option>
                {locationsData?.locations?.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} — {l.city}, {l.country}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              className="w-full h-2rem border-1 border-round p-2"
            >
              {accommodation ? "Update" : "Create"}
            </Button>
          </form>
        </div>
      </div>
    </Guard>
  );
}
