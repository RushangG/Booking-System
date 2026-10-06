
import { Button } from "@primereact/ui/button";
import { DataTable } from "@primereact/ui/datatable";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export function Customer () {
  const customers: Customer[] = [
    {
      id: 1,
      name: "User 1",
      email: "user1@gmail.com",
      phone: "9876543210",
    },
    {
      id: 2,
      name: "user 2",
      email: "user2@gmail.com",
      phone: "9876543211",
    },
    {
      id: 3,
      name: "Rahul Patel",
      email: "rahul@gmail.com",
      phone: "9876543212",
    },
    {
      id: 4,
      name: "Amit Shah",
      email: "amit@example.com",
      phone: "9876543213",
    },
  ];

  return (
    <div className="p-4">

      
      <div className="flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold m-0">
            Customers
          </h2>

          <p className="text-color-secondary mt-2 mb-0">
            Manage customers
          </p>
        </div>

        <Button
          label="Add Customer"
          icon="pi pi-plus"
        />
      </div>

     
      <div className="surface-card border-round shadow-2 p-3">

        <DataTable.Root data={customers}>

          <DataTable.TableContainer>

            <DataTable.Table>

            
              <DataTable.THead>
                <DataTable.THeadRow>

                  <DataTable.THeadCell>
                    <DataTable.THeadTitle>
                      ID
                    </DataTable.THeadTitle>
                  </DataTable.THeadCell>

                  <DataTable.THeadCell>
                    <DataTable.THeadTitle>
                      Name
                    </DataTable.THeadTitle>
                  </DataTable.THeadCell>

                  <DataTable.THeadCell>
                    <DataTable.THeadTitle>
                      Email
                    </DataTable.THeadTitle>
                  </DataTable.THeadCell>

                  <DataTable.THeadCell>
                    <DataTable.THeadTitle>
                      Phone
                    </DataTable.THeadTitle>
                  </DataTable.THeadCell>

                  <DataTable.THeadCell>
                    <DataTable.THeadTitle>
                      Actions
                    </DataTable.THeadTitle>
                  </DataTable.THeadCell>

                </DataTable.THeadRow>
              </DataTable.THead>

              
              <DataTable.TBody>
                {({ item }: { item: Customer }) => (

                  <DataTable.Row key={item.id}>

                    <DataTable.Cell>
                      {item.id}
                    </DataTable.Cell>

                    <DataTable.Cell>
                      <span className="font-medium">
                        {item.name}
                      </span>
                    </DataTable.Cell>

                    <DataTable.Cell>
                      {item.email}
                    </DataTable.Cell>

                    <DataTable.Cell>
                      {item.phone}
                    </DataTable.Cell>

                    <DataTable.Cell>
                      <div className="flex gap-2">

                        <Button
                          icon="pi pi-pencil"
                          severity="info"
                          size="small"
                          rounded
                          text
                        />

                        <Button
                          icon="pi pi-trash"
                          severity="danger"
                          size="small"
                          rounded
                          text
                        />

                      </div>
                    </DataTable.Cell>

                  </DataTable.Row>

                )}
              </DataTable.TBody>

            </DataTable.Table>

          </DataTable.TableContainer>

        </DataTable.Root>

      </div>

    </div>
  );
}