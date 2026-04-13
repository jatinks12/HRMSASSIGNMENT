// import React from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";

// import "primereact/resources/themes/lara-light-blue/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

// type Employees = {
//   Name: string;
//   Email: string;
//   role: string;
//   department: string;
// };

// type Props = {
//   employees: Employees[];
//   deleteEmployee: (Email: string) => void;
//   editEmployee: (emp: Employees) => void;
//   viewEmployee: (emp: Employees) => void;
// };

// const EmployeeTable: React.FC<Props> = ({
//   employees,
//   deleteEmployee,
//   editEmployee,
//   viewEmployee,
// }) => {

//   const actionBody = (rowData: Employees) => {
//     return (
//       <div style={{ display: "flex", gap: "10px" }}>
//         <Button
//           label="View"
//           icon="pi pi-eye"
//           className="p-button-info"
//           onClick={() => viewEmployee(rowData)}
//         />

//         <Button
//           label="Edit"
//           icon="pi pi-pencil"
//           className="p-button-warning"
//           onClick={() => editEmployee(rowData)}
//         />

//         <Button
//           label="Delete"
//           icon="pi pi-trash"
//           className="p-button-danger"
//           onClick={() => deleteEmployee(rowData.Email)}
//         />
//       </div>
//     );
//   };

//   return (
//     <div style={{ marginTop: "30px" }}>
//       <h2>Employee Table</h2>

//       <DataTable
//         value={employees}
//         paginator
//         rows={5}
//         rowsPerPageOptions={[3,5,8]}
//         responsiveLayout="scroll"
//       >
//         <Column field="Name" header="Name" sortable />
//         <Column field="Email" header="Email" sortable />
//         <Column field="department" header="Department" sortable />
//         <Column field="role" header="Role" sortable />
//         <Column header="Actions" body={actionBody} />
//       </DataTable>

//       <h3>Total Employees : {employees.length}</h3>
//     </div>
//   );
// };

// export default EmployeeTable;

import React,{ useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

type Employees = {
  Name: string;
  Email: string;
  role: string;
  department: string;
};

type Props = {
  employees: Employees[];
  deleteEmployee: (Email: string) => void;
  editEmployee: (emp: Employees) => void;
  viewEmployee: (emp: Employees) => void;
  totalRecords: number;
  onPageChange: (page: number, limit: number) => void;
  limit: number;
  onSortChange: (field: string, order: 1 | -1) => void;
  onFilterChange: (filters: any) => void;   // ✅ already present
};

const EmployeeTable: React.FC<Props> = ({
  employees,
  deleteEmployee,
  editEmployee,
  viewEmployee,
  totalRecords,
  onPageChange,
  limit,
  onSortChange,
  onFilterChange   
}) => {
  const [filtersState, setFiltersState] = useState<any>({
    Name: { value: null, matchMode: "contains" },
    Email: { value: null, matchMode: "contains" },
    department: { value: null, matchMode: "contains" },
    role: { value: null, matchMode: "contains" }
  });
  const [localSortOrder, setLocalSortOrder] = useState<1 | -1>(1);

  const handleManualSort = (field: string) => {

  const newOrder = localSortOrder === 1 ? -1 : 1;

  setLocalSortOrder(newOrder);

  onSortChange(field, newOrder);
};
  const handlePage = (event: any) => {
    const newPage = event.page + 1;
    const newLimit = event.rows;
    onPageChange(newPage, newLimit);
  };

  const handleSort = (event: any) => {
  if (event.sortField) {
    onSortChange(event.sortField, event.sortOrder);
  }
  
};

  const actionBody = (rowData: Employees) => {
    return (
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          label="View"
          icon="pi pi-eye"
          className="p-button-info"
          onClick={() => viewEmployee(rowData)}
        />

        <Button
          label="Edit"
          icon="pi pi-pencil"
          className="p-button-warning"
          onClick={() => editEmployee(rowData)}
        />

        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => deleteEmployee(rowData.Email)}
        />
      </div>
    );
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Employee Table</h2>

      <DataTable
        value={employees}
        paginator
        rows={limit}
        rowsPerPageOptions={[2, 4, 6]}
        filterDisplay="row"
        filters={filtersState}
        sortMode="single"
        onFilter={(e) => {
          setFiltersState(e.filters);
          onFilterChange(e.filters);} }
            
        totalRecords={totalRecords}
        lazy
        onPage={handlePage}
      >
        <Column
          field="Name"
          header={<span
      style={{ cursor: "pointer" }}
      onClick={() => handleManualSort("Name")}
    >
      Name
    </span>}
          filter
          filterPlaceholder="search name"
          sortable
          showFilterMenu={false}
          style={{ minWidth: "200px" }}
        />
        <Column
          field="Email"
              header={<span
      style={{ cursor: "pointer" }}
      onClick={() => handleManualSort("Name")}
    >
      Email
    </span>}
    sortable
          filter
          filterPlaceholder="search Email"
          showFilterMenu={false}
          style={{ minWidth: "200px" }}
        />
        <Column
          field="department"
                   header={<span
      style={{ cursor: "pointer" }}
      onClick={() => handleManualSort("Name")}
    >
      Department
    </span>}
          sortable
          filter
          filterPlaceholder="search department"
          showFilterMenu={false}
          style={{ minWidth: "250px" }}
        />
        <Column
          field="role"
                   header={<span
      style={{ cursor: "pointer" }}
      onClick={() => handleManualSort("Name")}
    >
      Email
    </span>}
    sortable
          filter
          filterPlaceholder="search role"
          showFilterMenu={false}
          style={{ minWidth: "200px" }}
        />
        <Column header="Actions" body={actionBody} />
      </DataTable>

      <h3>Total Employees : {totalRecords}</h3>
    </div>
  );
};

export default EmployeeTable;