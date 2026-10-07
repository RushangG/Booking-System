import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";
import { PermissionProvider } from "./pages/Layout/PermissionProvider ";
import { useAuth } from "./pages/Layout/ContextProvider.tsx";
function App() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("user", user);

  const userPermission = user?.permissions || [];

  console.log("userPermission", userPermission);

  // const userPermission = [
  //   "VIEW_CUSTOMER",
  //   "VIEW_COMPANY",
  //   "VIEW_BOOKING",
  //   "VIEW_ACCOMMODATION",
  //   "VIEW_USERS",
  //   "ADD_CUSTOMER",
  // ];

  return (
    <PermissionProvider userPermission={userPermission}>
      <RouterProvider router={router} />
    </PermissionProvider>
  );
}

export default App;
