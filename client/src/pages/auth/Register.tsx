import { useState } from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export function Register() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(registerData);

  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen surface-ground p-3">
      <div className="surface-card border-round shadow-2 p-5 w-full md:w-6 lg:w-4">

        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold m-0">
            Create Account
          </h2>

          <p className="text-color-secondary mt-2">
            Register your account
          </p>
        </div>

        <form onSubmit={handleRegister}>

          
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block font-medium mb-2"
            >
              Name
            </label>

            <InputText
              id="name"
              name="name"
              value={registerData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full"
            />
          </div>

          
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium mb-2"
            >
              Email
            </label>

            <InputText
              id="email"
              name="email"
              type="email"
              value={registerData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full"
            />
          </div>

          
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-medium mb-2"
            >
              Password
            </label>

            <InputText
              id="password"
              name="password"
              type="password"
              value={registerData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full"
            />
          </div>

        
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block font-medium mb-2"
            >
              Confirm Password
            </label>

            <InputText
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={registerData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            label="Register"
            icon="pi pi-user-plus"
            className="w-full h-2rem"
          >
          Register</Button>
        </form>

        <div className="text-center mt-4">
          <span className="text-color-secondary">
            Already have an account?
          </span>

          <Link
            to="/login"
            className="ml-2 text-primary no-underline font-medium"
          >
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}