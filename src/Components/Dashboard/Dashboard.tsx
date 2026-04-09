import { useEffect, useState } from "react";
import "./Dashboard.css";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { DataTable } from "primereact/datatable";
import type { DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, ResponsiveContainer, Pie, Cell,
} from "recharts";

import { SupabaseClient } from "../../Helper/Supabase";


// ✅ Employee Type
type Employee = {
  id: number;
  Name: string;
  Email: string;
  department: string;
  role: string;
  Status: boolean;
  Pending: boolean;
};

const Dashboard = () => {

  // ✅ Correct typing
  const [employees, setEmployees] = useState<Employee[]>([]);

  // ✅ Filters
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    Name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    department: { value: null, matchMode: FilterMatchMode.EQUALS },
    role: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.CUSTOM },
  });

  useEffect(() => {
    getEmployees();
  }, []);

  // ✅ Fetch data
  async function getEmployees() {
    const { data, error } = await SupabaseClient
      .from("Employee")
      .select("*");

    if (error) {
      console.log(error);
    } else if (data) {
      setEmployees(data as Employee[]);
    }
  }

  // ✅ Charts
  const chartData = [
    { name: "Employees", value: employees.length },
    {
      name: "Leaves",
      value: employees.filter((e) => e.Status === false).length,
    },
    {
      name: "Pending",
      value: employees.filter(
        (e) => e.Status === true && e.Pending === true
      ).length,
    },
  ];

  // ✅ Status display
  const statusBody = (rowData: Employee) =>
    rowData.Pending
      ? "Pending"
      : rowData.Status
      ? "Active"
      : "Leave";

  // ✅ Status filter logic
  const statusFilterFunction = (value: Employee, filter: string | null) => {
    const status = value.Pending
      ? "Pending"
      : value.Status
      ? "Active"
      : "leave";

    return filter ? status === filter : true;
  };

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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="red" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={chartData} dataKey="value" outerRadius={100} label>
              <Cell fill="#0088FE" />
              <Cell fill="#00C49F" />
              <Cell fill="#FF8042" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ DataTable */}
      <DataTable
        value={employees}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 20]}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        filterDisplay="row"
        tableStyle={{ minWidth: "60rem" }}
      >

        {/* Name */}
        <Column
          field="Name"
          header="Name"
          sortable
          filter
          filterPlaceholder="Search name"
        />

        {/* Email */}
        <Column
          field="Email"
          header="Email"
          sortable
          filter
          filterPlaceholder="Search email"
        />

        {/* Department */}
        <Column
          field="department"
          header="Department"
          sortable
          filter
          showFilterMenu={false}
          filterElement={(options) => (
            <select
              value={options.value || ""}
              onChange={(e) =>
                options.filterApplyCallback(e.target.value)
              }
            >
              <option value="">All</option>
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
          )}
        />

        {/* Role */}
        <Column
          field="role"
          header="Role"
          sortable
          filter
          showFilterMenu={false}
          filterElement={(options) => (
            <select
              value={options.value || ""}
              onChange={(e) =>
                options.filterApplyCallback(e.target.value)
              }
            >
              <option value="">All</option>
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
          )}
        />

        {/* Status */}
        <Column
          header="Status"
          body={statusBody}
          filter
          showFilterMenu={false}
          filterElement={(options) => (
            <select
              value={options.value || ""}
              onChange={(e) =>
                options.filterApplyCallback(e.target.value)
              }
            >
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="leave">On leave</option>
              <option value="Pending">Pending</option>
            </select>
          )}
          filterFunction={statusFilterFunction}
        />

      </DataTable>
    </div>
  );
};

export default Dashboard;