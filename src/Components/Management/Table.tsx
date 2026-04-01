import React from "react";

type Employees = {
    name:string,
    email:string,
    role: string,
    department: string
};

type Props= {
    employees: Employees[];
    deleteEmployee:(index:any) => void;
};

const EmployeeTable: React.FC<Props> = ({employees,deleteEmployee}) => {
    return(
        <div>
            <h1>Employee Table</h1>
           
            <table border={1}>
                <thead>
                <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Action</th>
            </tr>
        </thead>

        <tbody>
            {employees.map((emp,index) =>(
                <tr key = {index}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.role}</td>
                    <td>{emp.department}</td>
                    <td>
                        <button>Edit</button>
                        <button onClick={()=>deleteEmployee(index)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
            </table>
        </div>
    )
};
export default EmployeeTable;
