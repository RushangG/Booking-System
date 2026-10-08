import React, { useState } from "react";
import { InputText } from "@primereact/ui/inputtext";
import { Button } from "@primereact/ui/button";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client/core/index.js";

export function Setting() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const RESET_PASSWORD = gql`
    mutation ResetPassword($oldPassword: String!, $newPassword: String!) {
      resetPassword(oldPassword: $oldPassword, newPassword: $newPassword)
    }
  `;

  const [resetPassword] = useMutation(RESET_PASSWORD);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    // Handle form submission logic here
    console.log("Form submitted");
    try {
      let response = await resetPassword({
        variables: {
          oldPassword,
          newPassword,
        },
      });

      if (response.data) {
        setSuccess("Password reset successfully.");
        setError(null);
      } else {
        setError("Failed to reset password. Please check your old password.");
        setSuccess(null);
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      setError("Failed to reset password. Please try again.");
    }
  }

  return (
    <>
      <div className="flex justify-content-center align-items-center min-h-screen surface-ground p-3">
        <div className="surface-card border-round shadow-2 p-5 w-full md:w-6 lg:w-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold m-0">Settings</h2>

            <p className="text-color-secondary mt-2">Update your Password</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="oldPassword" className="block font-medium mb-2">
                Old Password
              </label>

              <InputText
                id="oldPassword"
                type="password"
                value={oldPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOldPassword(e.target.value)
                }
                placeholder="Enter your old password"
                className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="newpassword" className="block font-medium mb-2">
                New Password
              </label>

              <InputText
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter your new password"
                className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
                required
              />
            </div>

            <Button
              type="submit"
              label="Save Changes"
              className="w-full h-2rem border-1 border-color-gray-300 border-round p-2"
            >
              Save Changes
            </Button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
