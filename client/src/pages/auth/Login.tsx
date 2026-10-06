import { useState } from "react";
import { Link } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export  function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    // Connect GraphQL login API here
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen surface-ground p-3">
      <div className="surface-card border-round shadow-2 p-5 w-full md:w-6 lg:w-4">
        
       
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold m-0">
            Login
          </h2>

          <p className="text-color-secondary mt-2">
            Login to your account
          </p>
        </div>

        <form onSubmit={handleLogin}>
          
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium mb-2"
            >
              Email
            </label>

            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            label="Login"
            icon="pi pi-sign-in"
            className="w-full h-2rem"
        
          > Login </Button>
        </form>

        <div className="text-center mt-4">
          <span className="text-color-secondary">
            Don't have an account?
          </span>

          <Link
            to="/register"
            className="ml-2 text-primary no-underline font-medium"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}