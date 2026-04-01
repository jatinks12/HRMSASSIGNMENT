import { useEffect, useState } from "react";
import "./Dashboard.css"
import { BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid, PieChart, ResponsiveContainer, Pie,Cell } from "recharts";
import { SupabaseClient } from "../../Helper/Supabase";




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
  interface ChartData {
  name: string;
  value: number;
}

  const chartData = [
  { name: "Employees", value: employees.length },
  { name: "Leaves", value: employees.filter(emp => emp.Status === false).length },
  { name: "Pending", value: employees.filter(emp => emp.Status === true && emp.Pending===true).length },
];





  return (
    <div className="dashboard">

     
      <div className="cards-container">
        
        <div className="card">
          <h3>Total Employees</h3>
          <p>{employees.length}</p>
        </div>

        <div className="card">
          <h3>Leave</h3>
          <p>{chartData[1].value}</p>
        </div>

        <div className="card">
          <h3>Pending Requests</h3>
          <p>{chartData[2].value}</p>
        </div>

      </div>

      

{/*Chart  */}
<div className="allcharts">

  <div id="Barchart">
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Bar dataKey="value" fill="red"/>
      </BarChart>
    </ResponsiveContainer>
  </div>

  <div id="Piechart">
     <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          <Cell fill="#0088FE" />
          <Cell fill="#00C49F" />
          <Cell fill="#FF8042" />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

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