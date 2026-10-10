import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useMutation } from "@apollo/client/react";
import { CREATE_CUSTOMER, UPDATE_CUSTOMER } from "../../services/Apis/Customer";
import { Guard } from "../Layout/Guard";
export function CustomerAddEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const customer = location.state?.customer;
  const companyId = location.state?.companyId;
  const companyName = location.state?.companyName;

  console.log("Company ID:", companyId);
  console.log("Company Name:", companyName);
  console.log("Customer data:", customer);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      });
    }
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [createCustomer] = useMutation(CREATE_CUSTOMER);

  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (customer) {
        const response = await updateCustomer({
          variables: {
            id: customer.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
        });

        if (response.data) {
          alert("Customer updated successfully!");

          navigate("/customer");
          return;
        }
      }

      const response = await createCustomer({
        variables: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          companyId: companyId ? Number(companyId) : null,
        },
      });

      if (response.data) {
        alert("Customer created successfully!");
        if (companyId) {
          navigate("/company");
        } else {
          navigate("/customer");
        }
      }
    } catch (error) {
      console.error("Customer save failed:", error);
      alert("Failed to save customer.");
    }
  };

  return (
    <Guard
      requiredPermission={["customer:create", "customer:update"]}
      fallback={<p>You do not have permission to view this page.</p>}
    >
      <div className="flex justify-content-center align-items-center min-h-screen surface-ground p-3">
        <div className="surface-card border-round shadow-2 p-5 w-full md:w-6 lg:w-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold m-0">
              {customer ? "Update Customer" : "Create Customer"}
            </h2>

            <p className="text-color-secondary mt-2">
              {customer
                ? "Update customer details"
                : "Fill in the details to create a new customer"}
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
                placeholder="Enter customer name"
                className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-2">
                Email
              </label>

              <InputText
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter customer email"
                className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block font-medium mb-2">
                Phone
              </label>

              <InputText
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter customer phone"
                className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
                required
              />
            </div>

            <div className="mb-4"> </div>

            <Button
              type="submit"
              className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
            >
              {" "}
              {customer ? "Update" : "Create"}
            </Button>
            {companyName && (
              <p>
                Created customer for Company <br /> <b>{companyName}</b>
              </p>
            )}
          </form>
        </div>
      </div>
    </Guard>
  );
}
