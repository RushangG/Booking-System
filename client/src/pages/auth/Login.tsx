import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useMutation } from "@apollo/client/react";
import { AuthLogin } from "../../services/Auth/AuthApi";
import { useAuth } from "../Layout/ContextProvider.tsx";  

interface LoginResponse {
  login: {
    accessToken: string;
    refreshToken: string;
  };
}

export function Login() {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(AuthLogin);

  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    const result = (await login({
      variables: {
        email,
        password,
      },
    })) as { data: LoginResponse | undefined };

    if (result.data) {
      localStorage.setItem("accessToken", result.data.login.accessToken);
      localStorage.setItem("refreshToken", result.data.login.refreshToken);
       await authLogin();
      navigate("/customer");
    }

    console.log("login result", result.data);
  }

  return (
    <div className="flex justify-content-center align-items-center min-h-screen surface-ground p-3">
      <div className="surface-card border-round shadow-2 p-5 w-full md:w-6 lg:w-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold m-0">Login</h2>

          <p className="text-color-secondary mt-2">Login to your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>

            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>

            <InputText
              id="password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
              required
            />
          </div>

          <Button
            type="submit"
            label="Login"
            className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
          >
            Login
          </Button>
        </form>

        <div className="text-center mt-4">
          <span className="text-color-secondary">Don't have an account?</span>

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
