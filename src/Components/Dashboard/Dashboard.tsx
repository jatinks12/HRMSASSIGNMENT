import { useEffect, useState } from "react";
import "./Dashboard.css"
import { BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid } from "recharts";
import { SupabaseClient } from "../../Helper/Supabase";
import { values } from "mobx";


const Dashboard = () => {

  const [employees, setEmployees] =useState<any[]>([])

  useEffect(() => {
    getEmployees();
  }, []);

  async function getEmployees() {
    const { data, error } = await SupabaseClient
      .from("Employee") 
      .select("*");

    if (error) {
      console.log(error);
    } else {
      setEmployees(data);
      console.log(data);
    }
  }

  const chartData=[
    {name:"Employee",value:employees.length},
    {name:"leaves",value:56},
    {name:"pending",value:78}



]
  return (
    <div className="dashboard">

     
      <div className="cards-container">
        
        <div className="card">
          <h3>Total Employees</h3>
          <p>{employees.length}</p>
        </div>

        <div className="card">
          <h3>Leaves</h3>
        </div>

        <div className="card">
          <h3>Pending Requests</h3>
        </div>

      </div>

{/*Chart  */}

<div style={{width:"100%",height:300}}>
<BarChart width={500}height={300}data={chartData}>
<CartesianGrid  strokeDasharray="3 3"/>
<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="value" fill="blue"/>


</BarChart>

</div>



      {/* Table */}
      <table >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
      
  {employees && employees.length > 0 ? (
    employees.map((emp) => (
      <tr key={emp.id}>
        <td>{emp.Name}</td>
        <td>{emp.Email}</td>
        <td>{emp.department}</td>
        <td>{emp.role}</td>
      </tr>
    ))
  )
  
  
  
  : (
    <tr>
      <td  style={{ textAlign: "center" }}>
       
      </td>
    </tr>
  )}
</tbody>
      </table>

    </div>
  );
};



export default Dashboard;