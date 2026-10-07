import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useMutation } from "@apollo/client/react";
import { CREATE_COMPANY } from "../../services/Apis/Company";
export function CompanyAddEdit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    industry: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [createCompany] = useMutation(CREATE_COMPANY, {
    variables: {
      name: formData.name,
      address: formData.address,
      industry: formData.industry,
    },
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await createCompany({
      variables: {
        name: formData.name,
        address: formData.address,
        industry: formData.industry,
      },
    });

    if (response.data) {
      alert("Company created successfully!");
      navigate("/company");
    }
    console.log(formData);
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen surface-ground p-3">
      <div className="surface-card border-round shadow-2 p-5 w-full md:w-6 lg:w-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold m-0">Create Company</h2>

          <p className="text-color-secondary mt-2">
            Fill in the details to create a new company
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
              placeholder="Enter your name"
              className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block font-medium mb-2">
              address
            </label>

            <InputText
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="industry" className="block font-medium mb-2">
              industry
            </label>

            <InputText
              id="industry"
              name="industry"
              type="text"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Enter your industry"
              className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
              required
            />
          </div>

          <Button
            type="submit"
            label="create"
            icon="pi pi-user-plus"
            className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
