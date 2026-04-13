import  { useEffect, useState } from "react"
import EmployeeTable from "./Table";
import { SupabaseClient } from "../../Helper/Supabase";
import toast from "react-hot-toast"
import "./Management.css";
interface Idata {
  
  Name: string,
    Email: string,
    role: string,
    department: string,
};
const Management = () => {
  const[formdata, setFormdata] =useState<Idata>({
    
    Name: "",
    Email: "",
    role: "",
    department: "",
  });

  //Getting data from supabase
  const [employees,setEmployee] = useState<any[]>([]);
  const[page,setPage] = useState(1);
  const[limit,setlimit] =useState(5);
  const [totalRecords,setTotalRecords]= useState(0);

// const [search, setSearch] = useState("");
const [sortField, setSortField] = useState<string | null>(null);
const [sortOrder, setSortOrder] = useState<1 | -1 | null>(null);
const [filters, setFilters] = useState<any>({});
 

  const fetchData = async (page: number, limit: number) => {    //Fetch Data
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = SupabaseClient  
  .from("HRMS")
  .select("*",{count:"exact"});
 
  
if (filters.Name?.value) {
  query = query.ilike("Name", `%${filters.Name.value}%`);
}

if (filters.Email?.value) {
  query = query.ilike("Email", `%${filters.Email.value}%`);
}

if (filters.department?.value) {
  query = query.ilike("department", `%${filters.department.value}%`);
}

if (filters.role?.value) {
  query = query.ilike("role", `%${filters.role.value}%`);
}

  // SORT

if (sortField && sortOrder !== null) {
  query = query.order(sortField, {
    ascending: sortOrder === 1,
  });
}
  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.log(error);
  } else {
    // employees(data);
    setEmployee(data);
   setTotalRecords(count || 0); 
  }
};
useEffect(() => {
  fetchData(page,limit); 
}, [page,limit,sortField ,sortOrder,filters]);

// form input
  const handleChange = (e:any)=> {
      const {name, value} = e.target;

    setFormdata({ ...formdata,
      [name] : value
    });
    }

    const handleSubmit = async(e:any) =>{
      e.preventDefault(); 
      //validation
      if(formdata.Name==="" || formdata.Email==="" || formdata.department==="" || formdata.role === ""){
        toast.error("please fill all credentials");
        return;
      }

       const formattedData = {
    ...formdata,
    Name: formdata.Name.toUpperCase(),
    Email: formdata.Email.toUpperCase(),
      };

      //Update data 
      if(editEmail){
        const {error} = await SupabaseClient 
        .from ("HRMS")
        .update(formattedData)
        .eq("Email", editEmail);

        if(error){
          console.log("error occur",error.message)}
        else{
          toast.success("Employee Updated");
          fetchData(1,5);
          setEditEmail(null);
        }
      }
      //insert data in supabase
   
    else{
      const {error} = await SupabaseClient
      .from("HRMS")
      .insert([formattedData]);
      if(error){
        console.log("Error occur",error.message);
      }
      else{
        toast.success("New Employee Added");
        fetchData(1,5)
      }
    }
      setFormdata({ 
        Name:"",
        Email:"",
        role:"",
        department:"",
      });
    };
     //delete function
   const deleteEmployee = async (email: string) => {

  const { error } = await SupabaseClient
    .from("HRMS")
    .delete()
    .eq("Email", email);

  if (error) {
    console.log("Delete error:", error);
  } else {
    toast.success(" Employee Deleted");
    fetchData(1,5);
  }
};
// Edit function
  const [editEmail,setEditEmail]= useState<string | null>(null);
   const editEmployee = (emp:Idata) =>{
   setFormdata(emp);
   setEditEmail(emp.Email);
   }

   //view function
   const[viewEmployee,setViewEmployee] = useState<Idata | null>(null);
   const viewEmployeeDetails = (emp:Idata) =>{
    setViewEmployee(emp);
   }
 
   //Form
  return (
    <div className="container">
      <h1>Employees Management</h1>

   <form onSubmit={handleSubmit}>
    
    <label> Enter Your Name </label>
    <input type="text" name = "Name" placeholder="enter name"
     onChange={handleChange} value={formdata.Name} required/>
  <br/>
    <label>Enter Your Mail id. </label>
    <input type="email" name = "Email" placeholder="enter email"
    onChange={handleChange} value={formdata.Email} required/>

    <label>Enter Your Department </label>
    <br/>
    <select  name = "department" 
    onChange={handleChange} value={formdata.department} required> 
    <option value=""> Select department </option>
    <option value="techOps">techOps</option>
    <option value="NetInfa">NetInfa</option>
    <option value="AppDev">AppDev</option>
    <option value="DevOps">DevOps</option>
    <option value = "CloudSVc">CloudSVc</option>
    <option value = "ITStrac">ITStrac</option>
    <option value = "DigSol">DigSol</option>
    <option value = "CSE">CSE</option>
    <option value = "DataLab">DataLab</option>
    </select>

    <label>Enter your Role </label>
    <br/>
    <select name="role" 
    onChange={handleChange} value={formdata.role} required> 
  <option value =""> Select role </option>
  <option value = "Software Developer">Software Developer</option>
  <option value = "Full Stack">Full Stack</option>
  <option value = "DevOps">DevOps</option>
  <option value="Project Manager">Project Manager</option>
  <option value="Technical supporter">Technical supporter</option>
  <option value="Business analyst">Business analyst</option>
  <option value="Frontend developer">Frontend developer</option>
  <option value="UI designer">UI designer</option>
  </select>
  <br/>
    <button type="submit" >Submit</button>

   </form>
   
 
   <EmployeeTable
   employees={employees}
   deleteEmployee={deleteEmployee} 
   editEmployee={editEmployee}
   viewEmployee={viewEmployeeDetails}
     totalRecords={totalRecords}
    onPageChange={(newPage, newLimit) => {
    setPage(newPage);
    setlimit(newLimit);   
  }}
  limit={limit} 
   
  onSortChange = {(field,order) => {
   
    setSortField(field);
    setSortOrder(order);
  }}
  onFilterChange={(f) => setFilters(f)}
  
  />
   
 {viewEmployee && (
  <div className="view">
    <div className="view-modal">
      <h2>Employee Details</h2>

      <p><b>Name:</b> {viewEmployee.Name}</p>
      <p><b>Email:</b> {viewEmployee.Email}</p>
      <p><b>Department:</b> {viewEmployee.department}</p>
      <p><b>Role:</b> {viewEmployee.role}</p>
     
      <button onClick={() => setViewEmployee(null)}>Close</button>
    </div>
  </div>
)}
</div>

 )
}
export default Management;