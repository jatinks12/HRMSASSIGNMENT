import React from "react";

type Employees = {
    Name:string,
    Email:string,
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
                    <td>{emp.Name}</td>
                    <td>{emp.Email}</td>
                    <td>{emp.department}</td>
                    <td>{emp.role}</td>
                    <td>
                        <button>Edit</button>
                        <button onClick={()=>deleteEmployee(emp.Email)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
            </table>
        </div>
    )
};
export default EmployeeTable;
