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
import React from "react";
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
};

const EmployeeTable: React.FC<Props> = ({
  employees,
  deleteEmployee,
  editEmployee,
  viewEmployee,
}) => {

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
        rows={5}
        rowsPerPageOptions={[3,5,8]}
        responsiveLayout="scroll"
      >
        <Column field="Name" header="Name" sortable />
        <Column field="Email" header="Email" sortable />
        <Column field="department" header="Department" sortable />
        <Column field="role" header="Role" sortable />
        <Column header="Actions" body={actionBody} />
      </DataTable>

      <h3>Total Employees : {employees.length}</h3>
    </div>
  );
};

export default EmployeeTable;