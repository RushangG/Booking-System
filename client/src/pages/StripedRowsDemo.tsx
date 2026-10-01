"use client";

import { Database } from "@primeicons/react/database";
import { Avatar } from "@primereact/ui/avatar";
import { DataTable } from "@primereact/ui/datatable";
import { Tag } from "@primereact/ui/tag";
import * as React from "react";

const statusSeverity: Record<
  string,
  "success" | "warn" | "info" | "danger" | "secondary"
> = {
  qualified: "success",
  unqualified: "danger",
  negotiation: "warn",
  new: "info",
  renewal: "secondary",
  proposal: "info",
};

const CustomerService = [
  {
    id: 1000,
    name: "James Butt",
    country: {
      name: "Algeria",
      code: "dz",
    },
    representative: {
      name: "Ioni Bowcher",
      image: "ionibowcher.png",
    },
    status: "unqualified",
    balance: 70663,
  },
];

export default function StripedRowsDemo() {
  const [customers, setCustomers] = React.useState([]);

  React.useEffect(() => {
    setCustomers(CustomerService);
  }, []);

  return (
    <div className="w-full">
      <DataTable.Root data={customers} stripedRows>
        <DataTable.TableContainer>
          <DataTable.Table style={{ minWidth: "50rem" }}>
            <DataTable.THead>
              <DataTable.THeadRow>
                <DataTable.THeadCell>
                  <DataTable.THeadTitle>Name</DataTable.THeadTitle>
                </DataTable.THeadCell>
                <DataTable.THeadCell>
                  <DataTable.THeadTitle>Country</DataTable.THeadTitle>
                </DataTable.THeadCell>
                <DataTable.THeadCell>
                  <DataTable.THeadTitle>Representative</DataTable.THeadTitle>
                </DataTable.THeadCell>
                <DataTable.THeadCell>
                  <DataTable.THeadTitle>Status</DataTable.THeadTitle>
                </DataTable.THeadCell>
                <DataTable.THeadCell>
                  <DataTable.THeadTitle>Balance</DataTable.THeadTitle>
                </DataTable.THeadCell>
              </DataTable.THeadRow>
            </DataTable.THead>
            <DataTable.TBody>
              {({ item }: { item: Customer }) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>
                    <span className="font-medium">{item.name}</span>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg leading-none">
                        {item.country.code.toUpperCase()}
                      </span>
                      <span>{item.country.name}</span>
                    </div>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <div className="flex items-center gap-2">
                      <Avatar.Root shape="circle">
                        <Avatar.Image
                          src={`https://primefaces.org/cdn/primevue/images/avatar/${item.representative.image}`}
                        />
                        <Avatar.Fallback>
                          {item.representative.name[0]}
                        </Avatar.Fallback>
                      </Avatar.Root>
                      <span className="text-sm">
                        {item.representative.name}
                      </span>
                    </div>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Tag severity={statusSeverity[item.status] ?? "secondary"}>
                      {item.status}
                    </Tag>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <span className="font-semibold">
                      ${item.balance.toLocaleString()}
                    </span>
                  </DataTable.Cell>
                </DataTable.Row>
              )}
            </DataTable.TBody>
            <DataTable.EmptyTBody>
              <DataTable.Row>
                <DataTable.Cell colSpan={5}>
                  <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
                        <Database className="w-8 h-8 text-surface-400 dark:text-surface-500" />
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-surface-0 dark:border-surface-900 bg-primary animate-pulse" />
                    </div>
                    <div>
                      <p className="m-0 font-semibold text-surface-900 dark:text-surface-0">
                        Fetching customers
                      </p>
                      <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
                        Hang tight, your data will appear here in a moment.
                      </p>
                    </div>
                  </div>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable.EmptyTBody>
          </DataTable.Table>
        </DataTable.TableContainer>
      </DataTable.Root>
    </div>
  );
}
