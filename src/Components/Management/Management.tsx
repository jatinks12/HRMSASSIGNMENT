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

  async function  fetchData() {
    const {data,error} =await SupabaseClient.from("Employee").select("*");
    if(data){
      setEmployee(data);
    }else{
       console.log("error occured", error);
    }
  }
  useEffect(()=>{fetchData()},[])

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
        .from ("Employee")
        .update(formattedData)
        .eq("Email", editEmail);

        if(error){
          console.log("error occur")}
        else{
          toast.success("Employee Updated");
          fetchData();
          setEditEmail(null);
        }
      }
      //insert data in supabase
   
    else{
      const {error} = await SupabaseClient
      .from("Employee")
      .insert([formattedData]);
      if(error){
        console.log("Error occur");
      }
      else{
        toast.success("New Employee Added");
        fetchData()
      }
    }
    //delete function
      setFormdata({ 
        Name:"",
        Email:"",
        role:"",
        department:"",
      });
    };
   const deleteEmployee = async (email: string) => {

  const { error } = await SupabaseClient
    .from("Employee")
    .delete()
    .eq("Email", email);

  if (error) {
    console.log("Delete error:", error);
  } else {
    console.log("Employee deleted");
    toast.success(" Employee Deleted");
    fetchData();
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
    <br/>
    <label>Enter Your Department </label>
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
<br/>
    <label>Enter your Role </label>
    <select name="role" 
    onChange={handleChange} value={formdata.role} required> <br/><br/>
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
   viewEmployee={viewEmployeeDetails}/>
   
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