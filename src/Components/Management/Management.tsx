import  { useEffect, useState } from "react"
import EmployeeTable from "./Table";
import { SupabaseClient } from "../../Helper/Supabase";
import toast from "react-hot-toast";

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
      if(formdata.Name==="" || formdata.Email==="" || formdata.department==="" || formdata.role === ""){
        toast.error("please fill all credentials");
        return;
      }
      //Update data 
      if(editEmail){
        const {error} = await SupabaseClient 
        .from ("Employee")
        .update(formdata)
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
      if(editEmail){
      const {data,error} = await SupabaseClient.from("Employee").insert([
        formdata 
      ]);
      if (error){
        console.log("error in updation", error);
      }else{
        console.log("success", data);
        fetchData();
      }
    }
    else{
      const {data,error} = await SupabaseClient
      .from("Employee")
      .insert([formdata]);
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
 //Form
  return (
    <div>
   <form onSubmit={handleSubmit}>
    <h1>Employees</h1>
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
    <option value="HR">HR</option>
    <option value="IT">IT</option>
    <option value="Finance">Finance</option>
    <option value="Marketing">Marketing</option>
    <option value = "intern">Intern</option>
    </select>
<br/>
    <label>Enter your Role </label>
    <select name="role" 
    onChange={handleChange} value={formdata.role} required> <br/><br/>
  <option value =""> Select role </option>
  <option value = "manager">manager</option>
  <option value = "designer">Designer</option>
  <option value = "developer">Developer</option>
  <option value="intern">Intern</option>
  </select>
  <br/>
    <button type="submit" >Submit</button>
{/* <button type="submit">
  {editEmail ? "Update" : "Submit"}
</button> */}
   </form>
   <EmployeeTable
   employees={employees}
   deleteEmployee={deleteEmployee} 
   editEmployee={editEmployee}/>
</div>
  )
}

export default Management