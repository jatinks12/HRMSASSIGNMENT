import { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  ResponsiveContainer,
  Pie,
  Cell,
} from "recharts";
import { SupabaseClient } from "../../Helper/Supabase";

const Dashboard = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    getEmployees();
  }, []);

  async function getEmployees() {
    const { data, error } = await SupabaseClient.from("Employee").select("*");

    if (error) {
      console.log(error);
    } else {
      setEmployees(data);
    }
  }

  const chartData = [
    { name: "Employees", value: employees.length },
    {
      name: "Leaves",
      value: employees.filter((emp) => emp.Status === false).length,
    },
    {
      name: "Pending",
      value: employees.filter(
        (emp) => emp.Status === true && emp.Pending === true
      ).length,
    },
  ];

  return (
    <div className="dashboard">
      {/* Cards */}
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

      {/* Charts */}
      <div className="allcharts">
        <div id="Barchart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="red" />
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>

           
            <th>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">Department</option>
                <option value="techOps">techOps</option>
                <option value="NetInfa">NetInfa</option>
                <option value="AppDev">AppDev</option>
                <option value="DevOps">DevOps</option>
                <option value="DataLab">DataLab</option>
                <option value="CloudSVc">CloudSVc</option>
                <option value="ITStrac">ITStrac</option>
                <option value="DigSol">DigSol</option>
                <option value="HR">HR</option>
              </select>
            </th>

           
            <th>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">Role</option>
                <option value="Software Developer">Software Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack">Full Stack</option>
                <option value="DevOps">DevOps</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Technical supporter">Technical supporter</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="UI Designer">UI Designer</option>
              </select>
            </th>

            <th><select><option value="satus">Status</option>
            <option value="On leave">On leave</option>
            <option value="Active">Active</option>
            </select></th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => {
            const isMatch =
              (departmentFilter === "" ||
                emp.department === departmentFilter) &&
              (roleFilter === "" || emp.role === roleFilter);

            return (
              <tr
                key={emp.id}
                style={{
                  backgroundColor: isMatch ? "#FF7F7F" : "white",
                  color: isMatch ? "white" : "black",
                }}
              >
                <td>{emp.Name}</td>
                <td>{emp.Email}</td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td>{emp.leaves}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;