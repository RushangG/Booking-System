import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useMutation } from "@apollo/client/react";

import { CREATE_USER, UPDATE_USER } from "../../services/Apis/Users";

export function UsersAddEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = location.state?.user;

  console.log("User data:", user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [createUser] = useMutation(CREATE_USER);

  const [updateUser] = useMutation(UPDATE_USER);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (user) {
        const response = await updateUser({
          variables: {
            id: user.id,
            name: formData.name,
            email: formData.email,
          },
        });

        if (response.data) {
          alert("User updated successfully!");

          navigate("/users");

          return;
        }
      }

      const response = await createUser({
        variables: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      });

      if (response.data) {
        alert("User created successfully!");

        navigate("/users");
      }
    } catch (error: any) {
      console.error("User save failed:", error);

      alert(`Failed to save user. ${error.errors?.[0]?.message}`);
    }
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen surface-ground p-3">
      <div className="surface-card border-round shadow-2 p-5 w-full md:w-6 lg:w-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold m-0">
            {user ? "Update User" : "Create User"}
          </h2>

          <p className="text-color-secondary mt-2">
            {user
              ? "Update user details"
              : "Fill in the details to create a new user"}
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
              placeholder="Enter user name"
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
              placeholder="Enter user email"
              className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
              required
            />
          </div>

          {!user && (
            <div className="mb-4">
              <label htmlFor="password" className="block font-medium mb-2">
                Password
              </label>

              <InputText
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={user ? "Enter new password" : "Enter password"}
                className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
                required={!user}
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
          >
            {user ? "Update" : "Create"}
          </Button>
        </form>
      </div>
    </div>
  );
}
