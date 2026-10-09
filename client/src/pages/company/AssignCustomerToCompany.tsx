import { useLocation } from "react-router-dom";
export function AssignCustomerToCompany() {
  const location = useLocation();
  const companyId = location.state?.companyId;
  console.log("Company ID:", companyId);
  return (
    <div>
      <h1>Assign Customer to Company</h1>
      <p>This is the Assign Customer to Company page.</p>
      <p>Company ID: {companyId}</p>
    </div>
  );
}
 