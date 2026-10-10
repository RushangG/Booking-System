
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client/react";
import { Button } from "@primereact/ui/button";
import { DataTable } from "@primereact/ui/datatable";

import {
  GET_COMPANY_CUSTOMERS,
  ASSIGN_CUSTOMERS_TO_COMPANY,
  REMOVE_CUSTOMER_FROM_COMPANY,
} from "../../services/Apis/Company";

import { CUSTOMERS_NOT_IN_COMPANY } from "../../services/Apis/Customer";

interface Customer {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface CompanyCustomersData {
  company: {
    id: number;
    name: string;
    companiesHasCustomers: {
      customer: Customer;
    }[];
  };
}

interface CustomersNotInCompanyData {
  customersNotInCompany: Customer[];
}

export function AssignCustomerToCompany() {
  const location = useLocation();
  const companyId = location.state?.companyId;

  const [selected, setSelected] = useState<number[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    data: companyCustomersData,
    loading: companyCustomersLoading,
    error: companyCustomersError,
    refetch: refetchCompanyCustomers,
  } = useQuery<CompanyCustomersData>(GET_COMPANY_CUSTOMERS, {
    variables: { id: Number(companyId) },
    skip: !companyId,
    fetchPolicy: "network-only",
  });

  const {
    data: availableCustomersData,
    loading: availableCustomersLoading,
    error: availableCustomersError,
    refetch: refetchAvailableCustomers,
  } = useQuery<CustomersNotInCompanyData>(CUSTOMERS_NOT_IN_COMPANY, {
    variables: { companyId: Number(companyId) },
    skip: !companyId,
    fetchPolicy: "network-only",
  });

  const [assignCustomersToCompany, { loading: assigning }] = useMutation(
    ASSIGN_CUSTOMERS_TO_COMPANY,
  );

  const [removeCustomerFromCompany] = useMutation(
    REMOVE_CUSTOMER_FROM_COMPANY,
  );

  if (!companyId) {
    return <p className="p-4 text-red-500">Company ID not found.</p>;
  }

  const customers =
    companyCustomersData?.company?.companiesHasCustomers.map(
      (item) => item.customer,
    ) ?? [];

  const availableCustomers =
    availableCustomersData?.customersNotInCompany ?? [];

  const handleCheckboxChange = (
    customerId: number,
    checked: boolean,
  ) => {
    setSelected((previous) =>
      checked
        ? previous.includes(customerId)
          ? previous
          : [...previous, customerId]
        : previous.filter((id) => id !== customerId),
    );
  };

  const handleAssignCustomers = async () => {
    if (selected.length === 0) return;

    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const currentCustomerIds = customers.map(
        (customer) => customer.id,
      );

      const allCustomerIds = [
        ...new Set([...currentCustomerIds, ...selected]),
      ];

      await assignCustomersToCompany({
        variables: {
          companyId: Number(companyId),
          customerId: allCustomerIds.join(","),
        },
      });

      setSelected([]);
      setSuccessMessage("Customers assigned successfully!");

      await Promise.all([
        refetchCompanyCustomers(),
        refetchAvailableCustomers(),
      ]);
    } catch (error) {
      console.error("Failed to assign customers:", error);
      setErrorMessage("Failed to assign customers. Please try again.");
    }
  };

  const handleRemoveCustomer = async (customerId: number) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this customer from the company?",
      )
    ) {
      return;
    }

    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await removeCustomerFromCompany({
        variables: {
          companyId: Number(companyId),
          customerId,
        },
      });

      setSuccessMessage("Customer removed successfully!");

      await Promise.all([
        refetchCompanyCustomers(),
        refetchAvailableCustomers(),
      ]);
    } catch (error) {
      console.error("Failed to remove customer:", error);
      setErrorMessage("Failed to remove customer. Please try again.");
    }
  };

  if (companyCustomersLoading || availableCustomersLoading) {
    return <div className="p-4">Loading customers...</div>;
  }

  if (companyCustomersError || availableCustomersError) {
    return (
      <div className="p-4 text-red-500">
        {companyCustomersError?.message ??
          availableCustomersError?.message}
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Page header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold m-0">
          Manage Customers for Company:{" "}
          {companyCustomersData?.company?.name}
        </h2>

        <p className="text-color-secondary mt-2 mb-0">
          Assign and manage customers associated with this company.
        </p>
      </div>

      {successMessage && (
        <p className="text-green-500 text-sm">{successMessage}</p>
      )}

      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

      {/* Assigned customers */}
      <div className="surface-card border-round shadow-2 p-3">
        <div className="flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Company Customers</h3>
          <span className="text-color-secondary">
            {customers.length} customers
          </span>
        </div>

        {customers.length === 0 ? (
          <p className="text-color-secondary">
            No customers assigned to this company.
          </p>
        ) : (
          <DataTable.Root data={customers}>
            <DataTable.TableContainer>
              <DataTable.Table>
                <DataTable.THead>
                  <DataTable.THeadRow>
                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>No.</DataTable.THeadTitle>
                    </DataTable.THeadCell>

                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Name</DataTable.THeadTitle>
                    </DataTable.THeadCell>

                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Email</DataTable.THeadTitle>
                    </DataTable.THeadCell>

                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Created At</DataTable.THeadTitle>
                    </DataTable.THeadCell>

                    <DataTable.THeadCell>
                      <DataTable.THeadTitle>Actions</DataTable.THeadTitle>
                    </DataTable.THeadCell>
                  </DataTable.THeadRow>
                </DataTable.THead>

                <DataTable.TBody>
                  {({ item, index }: {
                    item: Customer;
                    index: number;
                  }) => (
                    <DataTable.Row key={item.id}>
                      <DataTable.Cell>{index + 1}</DataTable.Cell>
                      <DataTable.Cell>{item.name}</DataTable.Cell>
                      <DataTable.Cell>{item.email}</DataTable.Cell>
                      <DataTable.Cell>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "-"}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Button
                          severity="danger"
                          size="small"
                          onClick={() => handleRemoveCustomer(item.id)}
                        >
                          Remove
                        </Button>
                      </DataTable.Cell>
                    </DataTable.Row>
                  )}
                </DataTable.TBody>
              </DataTable.Table>
            </DataTable.TableContainer>
          </DataTable.Root>
        )}
      </div>

      {/* Available customers */}
      <div className="surface-card border-round shadow-2 p-3 mt-4">
        <div className="flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="m-0">Add Customers to Company</h3>
            <p className="text-color-secondary text-sm mt-2 mb-0">
              Select customers you want to assign to this company.
            </p>
          </div>

          <span className="text-color-secondary">
            {selected.length} selected
          </span>
        </div>

        {availableCustomers.length === 0 ? (
          <p className="text-color-secondary">
            No customers available to assign.
          </p>
        ) : (
          <div
            className="flex flex-column gap-2 overflow-y-auto"
            style={{ maxHeight: "350px" }}
          >
            {availableCustomers.map((customer) => (
              <label
                key={customer.id}
                htmlFor={`customer-${customer.id}`}
                className="flex align-items-center gap-3 px-3 py-2 border-1 border-200 border-round cursor-pointer"
              >
                <input
                  id={`customer-${customer.id}`}
                  type="checkbox"
                  checked={selected.includes(customer.id)}
                  onChange={(event) =>
                    handleCheckboxChange(
                      customer.id,
                      event.target.checked,
                    )
                  }
                  className="cursor-pointer m-0 flex-shrink-0"
                />

                <span className="text-sm">{customer.name}</span>
                <span className="text-color-secondary text-sm">
                  {customer.email}
                </span>
              </label>
            ))}
          </div>
        )}

        {availableCustomers.length > 0 && (
          <div className="flex justify-content-end mt-3">
            <Button
              disabled={selected.length === 0 || assigning}
              onClick={handleAssignCustomers}
            >
              {assigning ? "Assigning..." : "Assign Customers"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
